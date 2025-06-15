import { deletePost, fetchPost } from "@/actions/post.actions";
import Image from "next/image";
import { PostType } from "../../../types";
import Comments from "./Comments";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SquarePen } from "lucide-react";
import PostDelete from "./PostDelete";

export default async function SinglePost({ postId }: { postId: string }) {
  const post: PostType | null = await fetchPost(postId);
  const user = await currentUser();

  return (
    <div className="md:flex md:items-start gap-8">
      <div className="flex-2 border-gray-300">
        <div>
          <div className="flex items-center justify-center my-2 flex-col gap-2">
            <h1 className="text-3xl font-bold">{post?.title}</h1>
            <p className="font-semibold">Author: {post?.author?.name}</p>
            <p className="text-sm text-gray-600">
              Date: {post?.createdAt.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-[500px] h-[300px]">
              <Image
                src={
                  post?.image ||
                  "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                }
                fill
                className="rounded-lg object-cover"
                alt={post?.image || "post image"}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="py-4">
            {user && user.id === post?.author.clerkId && (
              <div className="flex items-center justify-center gap-4 py-4">
                <Link
                  className="bg-gray-800 text-white flex items-center gap-1 text-sm px-4 py-1.5 rounded-lg"
                  href={`/edit-post/${post?.id}`}
                >
                  <SquarePen size={18} />
                  Edit
                </Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post?.id} />
                  <PostDelete />
                </form>
              </div>
            )}
            <p className="whitespace-pre-wrap text-gray-800 text-sm">
              {post?.body}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Comments postId={post?.id as string} />
      </div>
    </div>
  );
}
