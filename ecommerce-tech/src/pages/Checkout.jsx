import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import Navbar from "../assets/components/layout/Navbar";
import "../styles/checkout.css";
import Footer from "../assets/components/layout/Footer";

function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Requerido";
    if (!form.email) e.email = "Requerido";
    if (!form.phone) e.phone = "Requerido";
    if (!form.address) e.address = "Requerido";
    if (!form.city) e.city = "Requerido";
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, "").length < 16)
      e.cardNumber = "Número inválido";
    if (!form.cardName) e.cardName = "Requerido";
    if (!form.cardExpiry) e.cardExpiry = "Requerido";
    if (!form.cardCvv || form.cardCvv.length < 3) e.cardCvv = "CVV inválido";
    return e;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const formatCard = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/");
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const invoice = {
      number: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString("es-PA"),
      customer: { name: form.name, email: form.email, phone: form.phone },
      address: `${form.address}, ${form.city} ${form.zip}`,
      items: items.map((i) => ({ ...i })),
      subtotal: getTotal(),
      tax: getTotal() * 0.07,
      total: getTotal() * 1.07,
    };

    clearCart();
    setLoading(false);
    navigate("/factura", { state: { invoice } });
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="checkout-empty">
          <h2>No hay productos en tu carrito</h2>
          <Link to="/productos" className="checkout-btn-primary">
            Ver productos
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  

  const tax = getTotal() * 0.07;
  const total = getTotal() + tax;

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <h1 className="checkout-title">Finalizar compra</h1>

        <div className="checkout-layout">
          {/* Formulario */}
          <div className="checkout-form">

            {/* Datos personales */}
            <div className="checkout-section">
              <h2 className="section-title">Datos personales</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nombre completo</label>
                  <input
                    className={`form-input ${errors.name ? "input-error" : ""}`}
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Juan Pérez"
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    className={`form-input ${errors.email ? "input-error" : ""}`}
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <input
                    className={`form-input ${errors.phone ? "input-error" : ""}`}
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="6000-0000"
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Dirección */}
            <div className="checkout-section">
              <h2 className="section-title">Dirección de envío</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Dirección</label>
                  <input
                    className={`form-input ${errors.address ? "input-error" : ""}`}
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Calle 50, Edificio Torre Global"
                  />
                  {errors.address && <span className="error-msg">{errors.address}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Ciudad</label>
                  <input
                    className={`form-input ${errors.city ? "input-error" : ""}`}
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Ciudad de Panamá"
                  />
                  {errors.city && <span className="error-msg">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Código postal</label>
                  <input
                    className={`form-input ${errors.zip ? "input-error" : ""}`}
                    value={form.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                    placeholder="0801"
                  />
                  {errors.zip && <span className="error-msg">{errors.zip}</span>}
                </div>
              </div>
            </div>

            {/* Pago */}
            <div className="checkout-section">
              <h2 className="section-title">Información de pago</h2>
              <div className="card-preview">
                <div className="card-chip"></div>
                <div className="card-number-preview">
                  {form.cardNumber || "•••• •••• •••• ••••"}
                </div>
                <div className="card-bottom">
                  <span>{form.cardName || "NOMBRE EN TARJETA"}</span>
                  <span>{form.cardExpiry || "MM/AA"}</span>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Número de tarjeta</label>
                  <input
                    className={`form-input ${errors.cardNumber ? "input-error" : ""}`}
                    value={form.cardNumber}
                    onChange={(e) => handleChange("cardNumber", formatCard(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Nombre en la tarjeta</label>
                  <input
                    className={`form-input ${errors.cardName ? "input-error" : ""}`}
                    value={form.cardName}
                    onChange={(e) => handleChange("cardName", e.target.value.toUpperCase())}
                    placeholder="JUAN PÉREZ"
                  />
                  {errors.cardName && <span className="error-msg">{errors.cardName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Vencimiento</label>
                  <input
                    className={`form-input ${errors.cardExpiry ? "input-error" : ""}`}
                    value={form.cardExpiry}
                    onChange={(e) => handleChange("cardExpiry", formatExpiry(e.target.value))}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  {errors.cardExpiry && <span className="error-msg">{errors.cardExpiry}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input
                    className={`form-input ${errors.cardCvv ? "input-error" : ""}`}
                    value={form.cardCvv}
                    onChange={(e) => handleChange("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cardCvv && <span className="error-msg">{errors.cardCvv}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Resumen */}
          <div className="checkout-summary">
            <h2 className="summary-heading">Resumen del pedido</h2>

            <div className="summary-items">
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-qty">x{item.quantity}</p>
                  </div>
                  <p className="summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span style={{ color: "#22c55e" }}>Gratis</span>
              </div>
              <div className="summary-row">
                <span>ITBMS (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-total-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="checkout-btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Procesando pago..." : `Pagar $${total.toFixed(2)}`}
            </button>

            <Link to="/carrito" className="checkout-btn-secondary">
              Volver al carrito
            </Link>

            <div className="secure-badge">
              🔒 Pago simulado — datos seguros
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;