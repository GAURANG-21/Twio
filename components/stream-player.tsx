"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { User, Stream } from "@prisma/client";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);

  // console.log("token", token)
  // console.log("name", name)
  // console.log("identity", identity)

  if (!token || !name || !identity) {
    return <div>Cannot watch the Stream</div>;
  }
  return <div>Allowed to watch the stream</div>;
};
