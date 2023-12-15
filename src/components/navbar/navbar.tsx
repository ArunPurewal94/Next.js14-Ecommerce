import Link from "next/link";

import { searchProduct } from "@/actions/search";
import { getCart } from "@/lib/cart";
import { CartButton } from "./cart-button";
import { UserButton } from "@clerk/nextjs";

export const Navbar = async () => {
  const cart = await getCart();

  return (
    <nav className="bg-base-100 shadow">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href={"/"}>
            Logo
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProduct}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search..."
                className="input input-bordered w-full min-w-[200px]"
                type="text"
              />
            </div>
          </form>

          <CartButton cart={cart} />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};
