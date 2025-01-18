import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { Actions } from "./_components/actions";

interface UsernameProps {
  params: { username: string };
}

export default async function Username({ params }: UsernameProps) {
  const { username } = await params; // In most cases, this doesn't require `await`, but it's safer to handle.
  const user = await getUserByUsername(username);
  const isFollowing = await isFollowingUser(user.id);
  return (
    <div>
      <p>{`${user.externalUserId}`}</p>
      <p>{`${isFollowing}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
}
