import { getProducts } from "./action";
import ProductCard from "../components/ProductCard";

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="flex flex-wrap my-4 justify-center items-center gap-4">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
