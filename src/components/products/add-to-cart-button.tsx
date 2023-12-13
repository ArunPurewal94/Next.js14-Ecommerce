"use client";

import { colors } from "@/constants/colors";
import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;
  selectedSize: string;
  selectedColor: string;
  selectedImage: string | null;
  incrementProductQuantity: (
    productId: string,
    size: string,
    color: string,
    image: string
  ) => Promise<void>;
}

export const AddToCartButton = ({
  productId,
  selectedSize,
  selectedColor,
  selectedImage,
  incrementProductQuantity,
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 mb-3">
      <button
        className="btn btn-primary w-full md:w-auto"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(
              productId,
              selectedSize,
              selectedColor,
              selectedImage || ""
            );
            setSuccess(true);
          });
        }}
      >
        Add To Cart
      </button>

      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart!</span>
      )}
    </div>
  );
};
