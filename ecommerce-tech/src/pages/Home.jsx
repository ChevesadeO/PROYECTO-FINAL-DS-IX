import Navbar from "../assets/components/layout/Navbar";
import Banner from "../assets/components/home/Banner";
import ProductCard from "../assets/components/products/ProductCard";

import products from "../data/products";

function Home() {
  return (
    <>
      <Navbar />

      <Banner />

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}

export default Home;