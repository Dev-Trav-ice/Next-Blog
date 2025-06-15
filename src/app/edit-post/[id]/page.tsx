import EditPost from "@/components/shared/EditPost";
import { ParamsProps } from "../../../../types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Post",
};

export default async function EditPostPage({ params }: ParamsProps) {
  const postId = (await params).id as string;

  return (
    <div>
      <EditPost postId={postId} />
    </div>
  );
}
