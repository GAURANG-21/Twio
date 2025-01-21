"use client";

import { updateStream } from "@/actions/stream";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type FieldProps = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  field: FieldProps;
  value: boolean;
  label: string;
}

export const ToggleCard = ({
  field,
  value = false,
  label,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success("Chat Settings Updated"))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="rounded-lg bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <Switch onCheckedChange={onChange} checked={value} disabled={isPending}>
          {value ? "On" : "OFF"}
        </Switch>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
