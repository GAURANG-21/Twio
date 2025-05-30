import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { resetIngresses } from "@/actions/ingress";

export async function POST(req: Request) {
  const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!CLERK_SIGNING_SECRET) {
    throw new Error(
      "Error: Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(CLERK_SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  let payload;
  try {
    let text = await req.text();
    text = text + "";
    payload = await JSON.parse(text);
  } catch (err) {
    console.error("Error: Unable to parse request body", err);
    return new Response("Error: Invalid JSON payload", { status: 400 });
  }

  if (!payload) {
    return new Response("Error: Missing payload", { status: 400 });
  }

  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;
  //   console.log(eventType);
  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        imageUrl: payload.data.image_url,
        username: payload.data.username,
        stream: {
          create: {
            name: `${payload.data.username}'s Stream`,
          },
        },
      },
    });
  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: { externalUserId: payload.data.id },
      data: {
        imageUrl: payload.data.image_url,
        username: payload.data.username,
      },
    });
  }

  if (eventType === "user.deleted") {
    await resetIngresses(payload.data.id);
    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }

  return new Response("", { status: 200 });
}
