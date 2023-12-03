import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prismadb";

interface SearchPageProps {
  searchParams: { query: string };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma?.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: {
      id: "desc",
    },
  });

  if (products.length === 0) {
    return (
      <div className="text-center text-2xl font-bold my-6">
        <h1>No Products Found! 😟</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
