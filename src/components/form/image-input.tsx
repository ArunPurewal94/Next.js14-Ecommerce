"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { colors } from "@/constants/colors";

interface ResponseObject {
  url: string;
}

export const ImageInput = () => {
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState(colors);

  const handleUploadComplete = (
    color: string,
    colorCode: string,
    res: ResponseObject[]
  ) => {
    const updatedImages = images.map((item) =>
      item.color === color ? { ...item, image: res[0]?.url } : item
    );
    // Filter out objects where image is null
    const filteredImages = updatedImages.filter(
      (imageObj: { image: string | null }) => imageObj.image !== null
    );
    setImages(filteredImages);
    // Update the hidden input field with the stringified images array
    const imagesInput = document.getElementById("images") as HTMLInputElement;
    imagesInput.value = JSON.stringify(filteredImages);
  };

  const handleRemoveImage = (color: string) => {
    const updatedImages = images.map((item) =>
      item.color === color ? { ...item, image: null } : item
    );
    setImages(updatedImages);
  };

  return (
    <>
      {images.map(({ color, colorCode, image }, index) => (
        <div key={index}>
          <h1>Add Image for {color}:</h1>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              startTransition(() => {
                handleUploadComplete(color, colorCode, res);
              });
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {image && (
            <>
              <Image
                src={image}
                alt={color}
                className="w-auto h-auto object-contain rounded"
                width={200}
                height={200}
              />
              <button onClick={() => handleRemoveImage(color)}>Remove</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};
