import { Link } from "react-router-dom";
import "../../../styles/home.css";

function Banner() {
  return (
    <section className="hero-banner">
      <div className="hero-banner-overlay"></div>
      <div className="hero-banner-content">
        <p className="hero-banner-eyebrow">Bienvenido a TechStore</p>
        <h1 className="hero-banner-title">Tecnología del Futuro</h1>
        <p className="hero-banner-subtitle">
          Descubre laptops, smartphones y accesorios premium.
        </p>
        <div className="hero-banner-ctas">
          <Link to="/productos" className="hero-banner-btn-primary">
            Comprar Ahora
          </Link>
          <Link to="/productos" className="hero-banner-btn-secondary">
            Ver catálogo →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;