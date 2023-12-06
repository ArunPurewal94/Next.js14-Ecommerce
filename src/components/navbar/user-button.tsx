"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";

export const UserButton = () => {
  function closeDropdown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  }
  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn m-1">
        <FaUser />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li onClick={closeDropdown}>
          <Link href={"/orders"}>Your Orders</Link>
        </li>
        <li onClick={closeDropdown}>
          <Link href={"/admin"}>Admin Dashboard</Link>
        </li>
        <li onClick={closeDropdown}>
          <Link href={"/admin/add-product"}>Add Product</Link>
        </li>
      </ul>
    </div>
  );
};
