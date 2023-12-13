"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { selectColor } from "@/actions/cart";

interface ColorSelectorProps {
  images: { color: string; colorCode: string; image: string | null }[];
  productId: string;
}

export const ColorSelector = ({ images, productId }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const firstUpdate = useRef(true);

  // Set the first image in the array as selected when the component mounts
  useEffect(() => {
    if (firstUpdate.current) {
      if (images && images.length > 0) {
        setSelectedColor(images[0].colorCode);
        setSelectedImage(images[0].image);
      }
      firstUpdate.current = false;
    }
  }, [images]);

  const handleColorSelection = (colorCode: string, image: string | null) => {
    if (colorCode !== selectedColor) {
      setSelectedColor(colorCode);
      if (image) {
        setSelectedImage(image);
        selectColor(productId, colorCode, image);
      }
    }
  };

  return (
    <div className="flex items-center gap-5">
      <span className="flex items-center flex-col gap-2">
        {images.map(({ color, colorCode, image }, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedColor(colorCode);
              setSelectedImage(image);
              handleColorSelection(colorCode, image);
            }}
            className={`rounded-full w-10 h-10 cursor-pointer ${
              selectedColor === colorCode ? "border-4 border-indigo-400" : ""
            }`}
            style={{ backgroundColor: colorCode }}
          />
        ))}
      </span>
      <span>
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={selectedColor || ""}
            width={500}
            height={500}
            className="rounded-lg h-auto w-auto"
            priority
          />
        )}
      </span>
    </div>
  );
};
