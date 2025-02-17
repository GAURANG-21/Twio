import { notFound } from "next/navigation";
import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      stream: true,
      //* To get the count of followers of the host
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });

  if (!user) notFound();

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });

  return user;
};
