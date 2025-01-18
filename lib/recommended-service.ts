import { db } from "@/lib/db";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getSelf } from "@/lib/auth-service"; //* Will use later to not show user its own name in recommended

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
