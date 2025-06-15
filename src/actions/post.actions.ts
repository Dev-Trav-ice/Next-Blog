"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
    });

    return categories;
  } catch (error) {
    console.log("error fetching categories", error);
  }
};

export const createPost = async (formData: FormData) => {
  const user = await auth();
  if (!user?.userId) return;

  const title = formData.get("title")?.toString();
  const summary = formData.get("summary")?.toString();
  const body = formData.get("body")?.toString();
  const categoryId = formData.get("category")?.toString();
  const image = formData.get("image") as File;

  if (!title || !summary || !body || !categoryId) return;

  const handleFileUpload = async (
    buffer: Buffer
  ): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "posts",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });
  };

  // Example usage
  let imageUrl: string | null = null;
  let publicId: string | null = null;

  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const img = await handleFileUpload(buffer);
    imageUrl = img.secure_url;
    publicId = img.public_id;
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.userId },
  });

  if (!dbUser) {
    throw new Error("User not found in DB");
  }

  try {
    await prisma.post.create({
      data: {
        title,
        summary,
        body,
        image: imageUrl,
        publicId,
        category: {
          connect: {
            id: categoryId,
          },
        },
        author: {
          connect: { id: dbUser.id },
        },
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating post", error);
  }
  redirect("/");
};

export const fetchPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        category: true,
      },
    });
    return posts;
  } catch (error) {
    console.log("Error fetching posts", error);
    return [];
  }
};

export const fetchPost = async (id: string) => {
  if (!id) {
    console.error("fetchPost: ID is missing or invalid");
    return null;
  }
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        category: true,
        comments: true,
      },
    });

    if (!post) {
      console.error("Post not found for ID:", id);
      return null;
    }

    return post;
  } catch (error) {
    console.log("Error fetching post", error);
    return null;
  }
};

export const editPost = async (
  id: string,
  formData: FormData
): Promise<void> => {
  if (!id) return;

  const user = await auth();
  if (!user?.userId) return;

  const title = formData.get("title")?.toString();
  const summary = formData.get("summary")?.toString();
  const body = formData.get("body")?.toString();
  const categoryId = formData.get("category")?.toString();
  const image = formData.get("image") as File;

  const handleFileUpload = async (
    buffer: Buffer
  ): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "posts",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });
  };

  let imageUrl: string | null = null;
  let publicId: string | null = null;

  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const img = await handleFileUpload(buffer);
    imageUrl = img.secure_url;
    publicId = img.public_id;
  }

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        summary,
        body,
        image: imageUrl,
        publicId,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    revalidatePath("/");
    revalidatePath(`/post/${id}`);
  } catch (error) {
    console.error("Error updating post:", error);
    return;
  }

  redirect(`/post/${id}`);
};

export const destroyImage = async (formData: FormData): Promise<void> => {
  const publicId = formData.get("publicId")?.toString();
  const postId = formData.get("postId")?.toString();

  if (!publicId || !postId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        image: null,
        publicId: null,
      },
    });
    revalidatePath(`/edit-post/${postId}`);
    console.log("image deleted");
  } catch (error) {
    console.log("error destroying image", error);
  }
};

export const deletePost = async (formData: FormData): Promise<void> => {
  const id = formData.get("id") as string;

  if (!id) return;

  const user = await auth();

  if (!user) return;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (post?.publicId) {
    await cloudinary.uploader.destroy(post.publicId);
  }

  try {
    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/");
  } catch (error) {
    console.log("Error deleting post", error);
  } finally {
    redirect("/");
  }
};

export const fetchPostsByCatName = async (catName: string) => {
  if (!catName) return [];

  try {
    const posts = await prisma.post.findMany({
      where: {
        category: {
          name: catName,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        category: true,
      },
    });

    return posts;
  } catch (error) {
    console.log("error fetching posts", error);
    return [];
  }
};

export const writeComment = async (formData: FormData): Promise<void> => {
  const user = await auth();
  if (!user?.userId) return;

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: user.userId,
    },
  });

  if (!existingUser) {
    console.log("User not found");
    return;
  }

  const text = formData.get("text")?.toString();
  const postId = formData.get("postId")?.toString();
  const authorId = existingUser.id;

  if (!text || !postId) {
    console.log("Missing comment text or postId");
    return;
  }

  try {
    await prisma.comment.create({
      data: {
        text,
        author: { connect: { id: authorId } },
        post: { connect: { id: postId } },
      },
    });

    revalidatePath(`/post/${postId}`);
  } catch (error) {
    console.log("Error writing comment:", error);
  }
};

export const getComments = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        post: true,
      },
    });
    return comments;
  } catch (error) {
    console.log("Error fetching comments", error);
    return [];
  }
};

export const deleteComment = async (formData: FormData) => {
  const commentId = formData.get("commentId")?.toString();
  const postId = formData.get("postId")?.toString();

  if (!commentId) return;
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    revalidatePath(`/post/${postId}`);
  } catch (error) {
    console.log("Error deleting comment", error);
  }
};
