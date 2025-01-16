//* Responsible whether the sidebar is collapsable or not!!
"use client";
import { useSideBar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSideBar((state) => state);
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full w-60 bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
