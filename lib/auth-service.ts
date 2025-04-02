import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("User not logged in!");

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) throw new Error("User not synchronized with the database.");

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser(); //* Not allowed if not authenticated

  if (!self || !self.username) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) throw new Error("User not found!");

  if (self.username !== user.username) throw new Error("Unauthorized"); //* Trying to accessing another user

  return user;
};
