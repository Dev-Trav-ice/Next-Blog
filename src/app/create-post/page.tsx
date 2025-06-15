import CreatePost from "@/components/shared/CreatePost";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create a new post",
};

export default async function createPostPage() {
  const user = await currentUser();

  if (!user) redirect("/");

  return (
    <div>
      <CreatePost />
    </div>
  );
}
