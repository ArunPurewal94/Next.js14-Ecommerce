"use client";

import { useTransition } from "react";

interface SizeSelectProps {
  sizes: string[];
  productId: string;
  onSelectSize: (productId: string, size: string) => Promise<void>;
}

export const SizeSelect = ({
  sizes,
  productId,
  onSelectSize,
}: SizeSelectProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-3">
      <select
        defaultValue={sizes[0]}
        onChange={(e) => {
          const newSize = e.target.value;
          startTransition(async () => {
            await onSelectSize(productId, newSize);
          });
        }}
        className="select select-bordered w-full max-w-[180px]"
      >
        {sizes.map((size, index) => (
          <option value={size} key={index}>
            {size}
          </option>
        ))}
      </select>
      {isPending && <span className="loading loading-spinner loading-md" />}
    </div>
  );
};
