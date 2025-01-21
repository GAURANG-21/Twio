"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { getStreamByUserId } from "@/lib/stream-service";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (value: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await getStreamByUserId(self.id);

    if (!selfStream) throw new Error("Stream not Found!");

    const validData = {
      name: value.name,
      isChatEnabled: value.isChatEnabled,
      isChatFollowersOnly: value.isChatFollowersOnly,
      isChatDelayed: value.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch (error) {
    console.error("updateStream", error);
    throw new Error("Internal server error");
  }
};
