"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismadb";

export async function addProduct(formData: FormData) {
  console.log(formData);
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const category = formData.get("categories")?.toString();
  const sizes = formData.getAll("sizes");
  const imagesInput = formData.get("images");
  const images = JSON.parse(imagesInput?.toString() || "[]");
  const filteredImages = images.filter(
    (imageObj: { image: string | null }) => imageObj.image !== null
  );
  const priceInput = Number(formData.get("price") || 0);
  const price = Number(priceInput.toFixed(2)) * 100;

  if (!name || !description || !images || !category || !sizes || !price) {
    throw Error("Missing fields");
  }

  await prisma?.product.create({
    data: {
      name,
      description,
      category,
      sizes: sizes.map(String),
      images: filteredImages.map((img: any) => ({
        color: img.color,
        colorCode: img.colorCode,
        image: img.image,
      })),
      price,
    },
  });

  redirect("/");
}
