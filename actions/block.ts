"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

export const onBlock = async (id: string) => {
  try {
    const self = await getSelf();

    let blockedUser;
    try {
      blockedUser = await blockUser(id);
    } catch {
      //* User is a guest.
    }

    try {
      await roomService.removeParticipant(self.id, id);
    } catch {
      //* This means user is not in the room.
    }

    revalidatePath(`/u/${self.username}/community`);

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`);
      return blockedUser;
    }
  } catch {
    throw new Error("Internal Server Error in Blocking");
  }
};

export const onUnblock = async (id: string) => {
  try {
    const self = await getSelf();
    const unblockedUser = await unblockUser(id);
    revalidatePath(`/u/${self.username}/community`);

    return unblockedUser;
  } catch {
    throw new Error("Internal Server Error");
  }
};
