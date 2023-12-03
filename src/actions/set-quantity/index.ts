"use server";

import { revalidatePath } from "next/cache";

import { createCart, getCart } from "@/lib/cart";
import { prisma } from "@/lib/prismadb";

export async function setProductQuantity(
  productId: string,
  size: string,
  quantity: number
) {
  const cart = (await getCart()) ?? (await createCart());
  const productInCart = cart.items.find(
    (item) => item.productId === productId && item.selectedSize === size
  );

  if (quantity === 0) {
    if (productInCart) {
      await prisma?.cartItem.delete({
        where: { id: productInCart.id },
      });
    }
  } else {
    if (productInCart) {
      await prisma.cartItem.update({
        where: { id: productInCart.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          selectedSize: size,
        },
      });
    }
  }

  revalidatePath("/cart");
}
