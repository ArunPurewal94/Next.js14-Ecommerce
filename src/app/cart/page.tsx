import { getCart } from "@/lib/cart";
import { setProductQuantity } from "@/actions/set-quantity";

import { CartEntry } from "./components/cart-entry";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Cart | E-Commerce",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          key={cartItem.id}
          cartItem={cartItem}
          setProductQuantity={setProductQuantity}
        />
      ))}

      {!cart?.items.length && (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4 my-6">
          <h1 className="text-2xl">Your Cart Is Empty! 😟</h1>
          <Link className="text-xl font-bold" href={"/"}>
            Start Shopping! Cick here..😊
          </Link>
        </div>
      )}

      <div className="flex flex-col w-full items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary w-1/2">Checkout</button>
      </div>
    </>
  );
}
