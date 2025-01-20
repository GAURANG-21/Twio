"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  userId: string;
  isFollowing: boolean;
  isBlocked: boolean;
}

export const Actions = ({ userId, isFollowing, isBlocked }: ActionsProps) => {

  const [pending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data?.following.username}`)
        )
        .catch(() => toast.error("Something went wrong while following"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data?.following.username}`)
        )
        .catch(() => toast.error("Something went wrong while unfollowing"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You have blocked ${data?.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong while blocking"));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`You have unblocked ${data?.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong while unblocking"));
    });
  };

  return (
    <div className="flex flex-col space-y-6 mt-4">
      <Button
        disabled={pending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        variant={"primary"}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        disabled={pending}
        onClick={isBlocked ? handleBlock : handleUnblock}
        variant={"primary"}
      >
        {isBlocked ? "Unblock User" : "Block User"}
      </Button>
    </div>
  );
};
