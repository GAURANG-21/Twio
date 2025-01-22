"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
  value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [IsShow, SetIsShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              disabled
              type={IsShow ? "text" : "password"}
              placeholder="Stream Key"
              className="bg-slate-700"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button
            size={"sm"}
            variant={"link"}
            onClick={() => SetIsShow(!IsShow)}
          >
            {IsShow ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};
