import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "./price-tag";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  const image = product.images[0];
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 shadow hover:shadow-xl"
    >
      <figure className="relative w-full h-64">
        {image?.image && (
          <Image
            src={image.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p>{product.description}</p>
        <PriceTag className="badge-primary text-white" price={product.price} />
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{product.category}</div>
        </div>
      </div>
    </Link>
  );
};
