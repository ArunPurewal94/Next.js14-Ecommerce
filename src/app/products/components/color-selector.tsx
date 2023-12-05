"use client";
import { useState } from "react";
import Image from "next/image";

interface ColorSelectorProps {
  images: { color: string; colorCode: string; image: string | null }[];
}
export const ColorSelector = ({ images }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState(
    images && images.length > 0 ? images[0].color : null
  );

  const selectedImage = images.find((image) => image.color === selectedColor);

  return (
    <div>
      {images.map(
        (image, index) =>
          image.image && (
            <button key={index} onClick={() => setSelectedColor(image.color)}>
              {image.color}
            </button>
          )
      )}

      {selectedImage && selectedImage.image && (
        <Image
          src={selectedImage.image}
          alt={selectedColor || ""}
          width={500}
          height={500}
          className="rounded-lg h-auto w-auto"
          priority
        />
      )}
    </div>
  );
};
