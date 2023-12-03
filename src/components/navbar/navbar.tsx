import Link from "next/link";
import { FaUser } from "react-icons/fa";

import { searchProduct } from "@/actions/search";
import { getCart } from "@/lib/cart";
import { CartButton } from "./cart-button";

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
          <div className="dropdown dropdown-end dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1">
              <FaUser />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/orders"}>Your Orders</Link>
              </li>
              <li>
                <Link href={"/admin"}>Admin Dashboard</Link>
              </li>
              <li>
                <Link href={"/admin/add-product"}>Add Product</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
