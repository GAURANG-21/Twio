"use client";

import { useSideBar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSideBar((state) => state);

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-3 px-2">
        {data.map((data) => (
          <UserItem
            key={data.id}
            username={data.following.username}
            imageUrl={data.following.imageUrl}
            isLive={data.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, id) => {
        return <UserItemSkeleton key={id} />;
      })}
    </ul>
  );
};
