import { getSelf } from "./auth-service";
import { db } from "./db";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) throw new Error("User not found");

    if (otherUser.id === self.id) return true;

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findFirst({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("User does not exist");

  if (otherUser.id === self.id)
    throw new Error("User cannot follow themselves");

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) throw new Error("Already Followed!");

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();
  const otherUser = await db.user.findFirst({ where: { id } });
  if (!otherUser) throw new Error("User does not exist");
  if (otherUser.id === self.id)
    throw new Error("User cannot unfollow themselves");
  const existingFollow = await db.follow.findFirst({
    where: { followerId: self.id, followingId: otherUser.id },
  });

  if (!existingFollow) throw new Error("Not following the user!");

  const unfollow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return unfollow;
};

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    const followedUsers = await db.follow.findMany({
      where: {
        AND: [
          {
            followerId: self.id,
          },
          {
            following: {
              blocking: {
                none: {
                  blockedId: self.id,
                },
              },
            },
          },
        ],
      },
      include: {
        following: true,
      },
    });

    return followedUsers;
  } catch {
    return [];
  }
};
