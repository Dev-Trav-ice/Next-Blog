// CreatePost.tsx
import { createPost } from "@/actions/post.actions";
import PostForm from "./PostForm";
import { getCategories } from "@/actions/post.actions";

export default async function CreatePost() {
  const categories = await getCategories();

  return (
    <form action={createPost} className="flex justify-center pb-8">
      <div className="w-1/2 flex flex-col gap-4">
        <h1 className="my-4 text-2xl font-bold text-primary text-center">
          Create a new post
        </h1>
        <PostForm categories={categories || []} />
      </div>
    </form>
  );
}
