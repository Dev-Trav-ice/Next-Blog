import { Category, Post, User } from "@prisma/client";

export type PostType = Post & {
  author: User;
  category: Category;
};

export type ParamsProps = {
  params: Promise<{ id?: string; catName?: string }>;
};
