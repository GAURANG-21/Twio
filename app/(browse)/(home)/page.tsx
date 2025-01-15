import { UserButton } from "@clerk/nextjs";
import { Navbar } from "../_components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-y-4">
        <h1>Dashboard</h1>
        <UserButton />
      </div>
    </>
  );
}
