import { notFound } from "next/navigation";
import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) notFound();

  return user;
};
