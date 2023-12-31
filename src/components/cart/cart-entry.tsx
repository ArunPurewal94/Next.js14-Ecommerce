"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

import { CartItemWithProducts } from "@/lib/cart";
import { formatPrice, getColorName } from "@/lib/utils";

interface CartEntryProps {
  cartItem: CartItemWithProducts;
  setProductQuantity: (
    productId: string,
    size: string,
    quantity: number,
    image: string,
    color: string
  ) => Promise<void>;
}


  export const CartEntry = ({
  cartItem: { product, quantity, selectedSize, selectedColor, selectedImage },
  setProductQuantity,
}: CartEntryProps) => {
  const [isPending, startTransition] = useTransition();

  // Find the selected image object based on the selected color
  const selectedImageObj = product.images.find(
    (image) => image.color === selectedColor
  );

  // Generate quantity options for the select dropdown
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  
  
  
  
  
  
  
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={selectedColor || ""}
            height={300}
            width={300}
            className="object-contain rounded-xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div>
          <Link className="font-bold" href={"/products/" + product.id}>
            {product.name}
          </Link>
          {selectedImageObj && (
            <p>{getColorName(selectedImageObj.colorCode)}</p>
          )}
          <p>{product.category}</p>
          <p>{selectedSize}</p>
          {selectedColor && <p>{getColorName(selectedColor)}</p>}
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(
                    product.id,
                    selectedSize,
                    newQuantity,
                    selectedImage,
                    selectedColor
                  );
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-2">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};
