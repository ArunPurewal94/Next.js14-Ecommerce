"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-full w-full flex items-center justify-center space-y-5 flex-col">
      <h1 className="text-4xl">Page not found! 😟</h1>
      <Link className="text-lg text-secondary font-bold" href="/">
        Click here to go back to homepage
      </Link>
    </div>
  );
}
