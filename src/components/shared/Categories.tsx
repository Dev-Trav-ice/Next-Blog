import { getCategories } from "@/actions/post.actions";
import Link from "next/link";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="flex items-center overflow-auto gap-8 py-4 border-b">
      {categories?.map((category) => (
        <Link
          href={`/category/${category.name}`}
          className="px-2 py-1 text-sm bg-gray-600 hover:underline transition-all duration-300 cursor-pointer text-white rounded-md"
          key={category.id}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
