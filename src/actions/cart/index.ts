"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prismadb";
import { createCart, getCart } from "@/lib/cart";

export async function incrementProductQuantity(
  productId: string,
  size: string
) {
  const cart = (await getCart()) ?? (await createCart());

  const productInCart = cart.items.find(
    (item) => item.productId === productId && item.selectedSize === size
  );

  if (productInCart) {
    await prisma?.cartItem.update({
      where: {
        id: productInCart.id,
      },
      data: {
        quantity: { increment: 1 },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
        selectedSize: size,
      },
    });
  }

  revalidatePath("/products/[id]", "page");
}

export async function selectSize(productId: string, size: string) {
  cookies().set(`selectedSize-${productId}`, size);
}
