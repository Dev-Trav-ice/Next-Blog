import { fetchPosts } from "@/actions/post.actions";
import Categories from "@/components/shared/Categories";
import Posts from "@/components/shared/Posts";
import { PostType } from "../../types";

export default async function page() {
  const posts: PostType[] = await fetchPosts();

  return (
    <main className="pb-8">
      <Categories />
      <Posts posts={posts} />
    </main>
  );
}
