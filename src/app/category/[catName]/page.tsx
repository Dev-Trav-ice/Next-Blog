import { fetchPostsByCatName } from "@/actions/post.actions";
import { ParamsProps, PostType } from "../../../../types";
import Posts from "@/components/shared/Posts";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: ParamsProps): Promise<Metadata> => {
  const categoryName = (await params).catName as string;
  const decodedUri = decodeURIComponent(categoryName);
  const title = `Posts | ${decodedUri}`;
  return {
    title: `${title}`,
  };
};

export default async function page({ params }: ParamsProps) {
  const postCategory = (await params).catName as string;
  const decodedUri = decodeURIComponent(postCategory);

  const posts: PostType[] = await fetchPostsByCatName(decodedUri);

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center w-full text-center">
        <h1 className="text-2xl font-bold text-center">
          Posts related to {decodedUri}
        </h1>
        <p>No posts found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="py-4">
        <h1 className="text-2xl font-bold text-center">
          Posts related to {decodedUri}
        </h1>
      </div>
      <Posts posts={posts} />
    </div>
  );
}
