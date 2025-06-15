import SinglePost from "@/components/shared/SinglePost";
import { ParamsProps, PostType } from "../../../../types";
import { Metadata } from "next";
import { fetchPost } from "@/actions/post.actions";

export const generateMetadata = async ({
  params,
}: ParamsProps): Promise<Metadata> => {
  const post: PostType | null = await fetchPost((await params).id as string);
  const title = `${post?.title}`;
  return {
    title: `${title}` || "Next Blog | Post",
  };
};

export default async function page({ params }: ParamsProps) {
  const postId = (await params).id as string;

  return (
    <main className="pb-8">
      <SinglePost postId={postId} />
    </main>
  );
}
