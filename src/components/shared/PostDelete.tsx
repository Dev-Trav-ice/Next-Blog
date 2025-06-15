"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function PostDelete() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-red-600 text-white text-sm px-4 py-1.5 cursor-pointer rounded-lg"
      type="submit"
    >
      {pending ? (
        <LoaderCircle className="animate-spin" size={16} />
      ) : (
        <span className="flex items-center gap-1">
          <Trash2 size={18} /> Delete Post
        </span>
      )}
    </button>
  );
}
