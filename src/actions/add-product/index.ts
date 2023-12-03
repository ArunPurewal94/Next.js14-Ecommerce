"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismadb";

export async function addProduct(formData: FormData) {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const category = formData.get("categories")?.toString();
  const sizes = formData.getAll("sizes");
  const imageUrl = formData.get("imageUrl")?.toString();
  const priceInput = Number(formData.get("price") || 0);
  const price = Number(priceInput.toFixed(2)) * 100;

  if (!name || !description || !imageUrl || !category || !sizes || !price) {
    throw Error("Missing fields");
  }

  await prisma?.product.create({
    data: {
      name,
      description,
      category,
      sizes: sizes.map(String),
      imageUrl,
      price,
    },
  });

  redirect("/");
}
