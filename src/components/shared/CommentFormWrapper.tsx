"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import CommentForm from "./CommentForm";
import { writeComment } from "@/actions/post.actions";

export default function CommentFormWrapper({ postId }: { postId: string }) {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="text-center mt-4">
        <SignInButton mode="modal">
          <button className="bg-primary text-white text-sm cursor-pointer py-2 px-4 rounded-md">
            Sign in to comment
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <form action={writeComment}>
      <CommentForm postId={postId} />
    </form>
  );
}
