import { deleteComment, getComments } from "@/actions/post.actions";
import { currentUser } from "@clerk/nextjs/server";
import DeleteComment from "./DeleteComment";
import CommentFormWrapper from "./CommentFormWrapper";

export default async function Comments({ postId }: { postId: string }) {
  const comments = await getComments(postId);
  const user = await currentUser();

  return (
    <div className="border px-4 pb-4 rounded-lg mt-4 md:max-h-[500px] overflow-auto hide-scrollbar">
      <h1 className="text-center my-4 text-xl font-semibold">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h1>

      <CommentFormWrapper postId={postId} />

      <div className="flex flex-col gap-4 mt-4 px-2">
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex items-center justify-between border-t py-2 gap-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-sm font-semibold">{comment.author.name}</h1>
                <h1 className="text-sm text-gray-600">{comment.text}</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {comment.createdAt.toLocaleTimeString()}
                </span>
                {user?.id === comment.author.clerkId && (
                  <form action={deleteComment}>
                    <input type="hidden" name="commentId" value={comment.id} />
                    <DeleteComment postId={postId} />
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
