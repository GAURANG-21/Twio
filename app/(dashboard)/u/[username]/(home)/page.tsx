import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";

interface CreatorPageProps {
  params: { username: string };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const externalUser = await currentUser();
  const param = await params;
  const user = await getUserByUsername(param.username);

  // console.log("USser", user)

  if (!user || user.externalUserId !== externalUser?.id || !user.stream)
    throw new Error("Unauthorized");
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
}
