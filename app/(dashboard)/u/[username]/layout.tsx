import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}

export default async function CreatorLayout({
  children,
  params,
}: CreatorLayoutProps) {
  const param = await params;
  const self = await getSelfByUsername(param.username);
  if (!self) redirect("/");

  return (
    <>
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
