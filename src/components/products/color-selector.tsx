"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ColorSelectorProps {
  images: { color: string; colorCode: string; image: string | null }[];
}

export const ColorSelector = ({ images }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Set the first image in the array as selected when the component mounts
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedColor(images[0].colorCode);
      setSelectedImage(images[0].image);
    }
  }, [images]);

  const handleColorSelection = (colorCode: string) => {
    setSelectedColor(colorCode === selectedColor ? null : colorCode);
    const selectedImg =
      images.find((image) => image.colorCode === colorCode)?.image || null;
    setSelectedImage(selectedImg);
  };

  return (
    <div className="flex items-center gap-5">
      <span className="flex items-center flex-col gap-2">
        {images.map(({ color, colorCode, image }, index) => (
          <div
            key={index}
            onClick={() => handleColorSelection(colorCode)}
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
