"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function DeleteComment({ postId }: { postId: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      <input type="hidden" name="postId" value={postId} />
      <button className="cursor-pointer" type="submit">
        {pending ? (
          <LoaderCircle
            className="animate-spin text-red-500 pointer-events-none"
            size={15}
          />
        ) : (
          <Trash2 className="text-red-500" size={15} />
        )}
      </button>
    </>
  );
}
