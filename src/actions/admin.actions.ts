"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addCategory = async (formData: FormData): Promise<void> => {
  const catName = formData.get("catName")?.toString();

  if (!catName) return;

  await prisma.category.create({
    data: {
      name: catName,
    },
  });
  revalidatePath("/admin");
};
