import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";

interface UsernameProps {
  params: { username: string };
}

export default async function Username({ params }: UsernameProps) {
  const user = await getUserByUsername(params.username);
  const isFollowing = await isFollowingUser(user.id);
  return (
    <div>
      <p>{`${user.externalUserId}`}</p>
      <p>{`${isFollowing}`}</p>
    </div>
  );
}
