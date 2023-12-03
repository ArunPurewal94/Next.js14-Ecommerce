import { cache } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prismadb";
import { PriceTag } from "@/components/price-tag";
import { AddToCartButton } from "../components/add-to-cart-button";
import { incrementProductQuantity, selectSize } from "@/actions/cart";
import { SizeSelect } from "../components/size-select";

interface ProductsPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma?.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) return notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductsPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - E-Commerce",
    description: product.description,
  };
}

export default async function ProductsPage({
  params: { id },
}: ProductsPageProps) {
  const product = await getProduct(id);

  const getFirstAvailableSize = (sizes: string[]): string => {
    const defaultSizes = sizes;
    for (let size of defaultSizes) {
      if (sizes.includes(size)) {
        return size;
      }
    }
    return sizes[0];
  };

  const firstAvailableSize = getFirstAvailableSize(product.sizes);

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg h-auto w-auto"
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag
          price={product.price}
          className="mt-4 bg-secondary text-white font-bold p-5 text-lg"
        />
        <p className="py-6 text-lg">{product.description}</p>
        <SizeSelect
          sizes={product.sizes}
          productId={product.id}
          onSelectSize={selectSize}
        />
        <div className="flex items-center gap-3 py-6">
          <span className="text-lg font-bold">Category: </span>
          <p>{product.category}</p>
        </div>
        <AddToCartButton
          productId={product.id}
          selectedSize={
            cookies().get(`selectedSize-${product.id}`)?.value ||
            firstAvailableSize
          }
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
