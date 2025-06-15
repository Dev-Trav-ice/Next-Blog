"use client";

import { LoaderCircle, SendHorizonal } from "lucide-react";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";

export default function CommentForm({ postId }: { postId: string }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center gap-2">
      <Input type="text" name="text" placeholder="Type your comment..." />
      <input type="hidden" name="postId" value={postId} />
      <button type="submit">
        {pending ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : (
          <SendHorizonal size={20} />
        )}
      </button>
    </div>
  );
}
