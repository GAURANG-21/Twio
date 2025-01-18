import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service"; //* Will use later to not show user its own name in recommended

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  let self;

  try {
    self = await getSelf();
    self = self.externalUserId;
  } catch {
    self = null;
  }

  let users = [];
  if (self) {
    users = await db.user.findMany({
      where: {
        NOT: {
          externalUserId: self,
        },
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
