import { colors } from "@/constants/colors";

export function formatPrice(price: number) {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "GBP",
  });
}

export function getColorName(colorCode: string): string | null {
  const colorObj = colors.find((color) => color.colorCode === colorCode);
  return colorObj ? colorObj.color : null;
}
