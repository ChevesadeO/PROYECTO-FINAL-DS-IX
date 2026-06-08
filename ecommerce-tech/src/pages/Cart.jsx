import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import Navbar from "../assets/components/layout/Navbar";
import Footer from "../assets/components/layout/Footer";
import "../styles/cart.css";

function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para continuar</p>
          <Link to="/productos" className="btn-primary">
            Ver productos
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1 className="cart-title">Tu Carrito</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="cart-item-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Resumen</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span className="free">Gratis</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn-primary">
              Proceder al Checkout
            </Link>
            <Link to="/productos" className="btn-secondary">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;