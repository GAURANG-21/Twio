import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service"; //* Will use later to not show user its own name in recommended

export const getRecommended = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  let self, id;

  try {
    self = await getSelf();
    id = self.id;
    self = self.externalUserId;
  } catch {
    self = null;
  }

  let users = [];
  if (self) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              externalUserId: self,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: id,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
