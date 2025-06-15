import Image from "next/image";
import { PostType } from "../../../types";
import Link from "next/link";

export default async function Posts({ posts }: { posts: PostType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts?.map((post) => (
        <Link
          href={`/post/${post.id}`}
          className="p-4 shadow border"
          key={post.id}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2">
              <h1 className="text-xs font-semibold text-gray-700">
                Posted By: {post?.author?.name}
              </h1>
              {post?.category && (
                <div className="p-1.5 text-xs bg-gray-600 text-white rounded-md">
                  <span>{post?.category?.name}</span>
                </div>
              )}
            </div>
            <div className="relative w-full h-48">
              <Image
                src={
                  post.image ||
                  "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                }
                layout="fill"
                className="rounded-lg absolute border object-cover"
                alt={post?.title}
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold capitalize">
                {post?.title}
              </h1>
              <p className="text-xs my-2 text-gray-600">{post?.summary}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">
                {post?.createdAt.toLocaleString()}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
