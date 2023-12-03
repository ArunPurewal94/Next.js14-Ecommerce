import { formatPrice } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  className?: string;
}

export const PriceTag = ({ price, className }: PriceTagProps) => {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
};
