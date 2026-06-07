import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import useCartStore from "../store/cartStore";
import Navbar from "../assets/components/layout/Navbar";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="pd-not-found">
          <h2>Producto no encontrado</h2>
          <Link to="/productos" className="pd-btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <div className="pd-page">

        <div className="pd-breadcrumb">
          <Link to="/">Inicio</Link>
          <span> / </span>
          <Link to="/productos">Productos</Link>
          <span> / </span>
          <span>{product.name}</span>
        </div>

        <div className="pd-main">
          <div className="pd-image-wrapper">
            <img src={product.image} alt={product.name} className="pd-image" />
          </div>

          <div className="pd-info">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-description">{product.description}</p>
            <p className="pd-price">${product.price.toFixed(2)}</p>

            <div className="pd-quantity">
              <span className="pd-quantity-label">Cantidad:</span>
              <div className="pd-quantity-controls">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="pd-qty-btn">−</button>
                <span className="pd-qty-value">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="pd-qty-btn">+</button>
              </div>
            </div>

            <div className="pd-actions">
              <button
                className={`pd-btn-primary ${added ? "pd-btn-success" : ""}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ Agregado al carrito" : "Agregar al carrito"}
              </button>
              <Link to="/carrito" className="pd-btn-secondary">
                Ver carrito
              </Link>
            </div>

            <div className="pd-extras">
              <div className="pd-extra-item">🚚 Envío gratis en compras mayores a $50</div>
              <div className="pd-extra-item">🔄 30 días para devoluciones</div>
              <div className="pd-extra-item">🔒 Pago 100% seguro</div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pd-related">
            <h2 className="pd-related-title">Productos relacionados</h2>
            <div className="pd-related-grid">
              {related.map((p) => (
                <Link to={`/productos/${p.id}`} key={p.id} className="pd-related-card">
                  <img src={p.image} alt={p.name} />
                  <div className="pd-related-info">
                    <p className="pd-related-name">{p.name}</p>
                    <p className="pd-related-price">${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default ProductDetails;