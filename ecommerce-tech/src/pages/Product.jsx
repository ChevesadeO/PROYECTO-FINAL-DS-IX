import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import useCartStore from "../store/cartStore";
import Navbar from "../assets/components/layout/Navbar";
import "../styles/products.css";

const categories = [
  { value: "todas", label: "Todas" },
  { value: "laptops", label: "Laptops" },
  { value: "smartphones", label: "Smartphones" },
  { value: "accesorios", label: "Accesorios" },
  { value: "monitores", label: "Monitores" },
  { value: "tablets", label: "Tablets" },
  { value: "almacenamiento", label: "Almacenamiento" },
];

function Product() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const addItem = useCartStore((state) => state.addItem);

  const filtered = products.filter((p) => {
    const matchCategory = category === "todas" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />
      <div className="products-page">
        <div className="products-header">
          <h1 className="products-title">Catálogo de Productos</h1>
          <p className="products-subtitle">{filtered.length} productos encontrados</p>
        </div>

        {/* Filtros */}
        <div className="products-filters">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`cat-btn ${category === cat.value ? "active" : ""}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron productos para "{search}"</p>
            <button onClick={() => { setSearch(""); setCategory("todas"); }}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {filtered.map((product) => (
              <div key={product.id} className="catalog-card">
                <Link to={`/productos/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="catalog-card-body">
                  <span className="catalog-category">{product.category}</span>
                  <Link to={`/productos/${product.id}`}>
                    <h3 className="catalog-name">{product.name}</h3>
                  </Link>
                  <p className="catalog-desc">{product.description}</p>
                  <div className="catalog-footer">
                    <span className="catalog-price">${product.price.toFixed(2)}</span>
                    <button
                      className="catalog-add-btn"
                      onClick={() => addItem(product)}
                    >
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
