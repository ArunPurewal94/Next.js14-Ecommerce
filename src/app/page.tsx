import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prismadb";

export default async function Home() {
  const products = await prisma?.product.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return (
    <div>
      <div
        className="hero min-h-[60svh] rounded-xl hover:shadow-xl"
        // style={{
        //   backgroundImage: "url(/assets/logo.png)",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
