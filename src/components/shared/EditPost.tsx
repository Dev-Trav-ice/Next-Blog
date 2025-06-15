import { PostType } from "../../../types";
import DeleteImage from "./deleteImage";
import PostForm from "./PostForm";
import {
  destroyImage,
  editPost,
  fetchPost,
  getCategories,
} from "@/actions/post.actions";

export default async function EditPost({ postId }: { postId: string }) {
  const categories = await getCategories();
  const post: PostType | null | undefined = await fetchPost(postId);

  return (
    <div>
      <div className="relative">
        <form
          action={editPost.bind(null, postId)}
          className="flex justify-center pb-8"
        >
          <div className="w-1/2 flex flex-col gap-4">
            <h1 className="my-4 text-2xl font-bold text-primary text-center">
              Edit Post
            </h1>
            <PostForm
              defaultTitle={post?.title}
              defaultBody={post?.body}
              defaultSummary={post?.summary}
              defaultCategory={post?.category.id}
              categories={categories || []}
              imageUrl={post?.image as string}
              publicId={post?.publicId as string}
              postId={post?.id as string}
            />
          </div>
        </form>
        {post?.publicId && post.image && (
          <form className="absolute bottom-20 right-20" action={destroyImage}>
            <DeleteImage postId={post?.id} publicId={post.publicId} />
          </form>
        )}
      </div>
    </div>
  );
}
