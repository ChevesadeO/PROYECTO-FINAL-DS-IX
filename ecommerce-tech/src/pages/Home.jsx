import Navbar from "../components/layout/Navbar"; // llamamos al componente Navbar para mostrarlo en la página de inicio
import Banner from "../components/home/Banner"; // llamamos al componente Banner para mostrarlo en la página de inicio
import ProductCard from "../components/products/ProductCard"; // llamamos al componente ProductCard para mostrar los productos en la página de inicio

import products from "../data/products"; // importamos los productos desde el archivo products.js para mostrarlos en la página de inicio

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