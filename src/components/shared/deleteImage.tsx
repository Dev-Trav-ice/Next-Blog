"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

interface deleteImageProps {
  publicId: string;
  postId: string;
}
export default function DeleteImage({ publicId, postId }: deleteImageProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <input type="hidden" name="publicId" value={publicId} />
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        className="w-fit p-2 rounded-lg text-sm bg-red-500 text-white"
      >
        {pending ? (
          <LoaderCircle size={16} className="animate-spin" />
        ) : (
          "Remove Image"
        )}
      </button>
    </>
  );
}
