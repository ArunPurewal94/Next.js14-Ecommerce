"use client";

import { useState, useTransition } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { colors } from "@/constants/colors";

interface ResponseObject {
  url: string;
}

interface ImageInputProps {}

export const ImageInput = ({}: ImageInputProps) => {
  const [isPending, startTransition] = useTransition();
  const [images, setImages] =
    useState<{ color: string; colorCode: string; image: string | null }[]>(
      colors
    );

  const handleUploadComplete = (
    color: string,
    colorCode: string,
    res: ResponseObject[]
  ) => {
    const updatedImages = images.map((item) =>
      item.color === color ? { ...item, image: res[0]?.url } : item
    );
    setImages(updatedImages);
  };

  return (
    <>
      {images.map(({ color, colorCode }, index) => (
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
        </div>
      ))}
    </>
  );
};
