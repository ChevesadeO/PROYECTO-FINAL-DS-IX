import { Link } from "react-router-dom";
import Navbar from "../assets/components/layout/Navbar";
import Footer from "../assets/components/layout/Footer";
import Banner from "../assets/components/home/Banner";
import useCartStore from "../store/cartStore";
import products, { comingSoon } from "../data/products";
import "../styles/home.css";

function Home() {
  const addItem = useCartStore((state) => state.addItem);

  const featured = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <>
      <Navbar />

      {/* Hero original */}
      <Banner />

      {/* Categorías */}
      <section className="categories-section">
        <div className="section-container">
          {[
            { label: "Laptops", icon: "💻", value: "laptops" },
            { label: "Smartphones", icon: "📱", value: "smartphones" },
            { label: "Monitores", icon: "🖥️", value: "monitores" },
            { label: "Accesorios", icon: "🎧", value: "accesorios" },
            { label: "Tablets", icon: "📲", value: "tablets" },
            { label: "Almacenamiento", icon: "💾", value: "almacenamiento" },
          ].map((cat) => (
            <Link
              key={cat.value}
              to={`/productos?category=${cat.value}`}
              className="category-pill"
            >
              <span className="category-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Más vendidos */}
      <section className="home-section">
        <div className="section-container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Lo más popular</p>
              <h2 className="section-title">Más vendidos</h2>
            </div>
            <Link to="/productos" className="section-link">Ver todos →</Link>
          </div>
          <div className="home-grid">
            {featured.map((product) => (
              <div key={product.id} className="home-card">
                <Link to={`/productos/${product.id}`} className="home-card-img-wrapper">
                  <img src={product.image} alt={product.name} className="home-card-img" />
                </Link>
                <div className="home-card-body">
                  <span className="home-card-category">{product.category}</span>
                  <Link to={`/productos/${product.id}`}>
                    <h3 className="home-card-name">{product.name}</h3>
                  </Link>
                  <p className="home-card-desc">{product.description}</p>
                  <div className="home-card-footer">
                    <span className="home-card-price">${product.price.toFixed(2)}</span>
                    <button className="home-card-btn" onClick={() => addItem(product)}>
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner intermedio */}
      <section className="mid-banner">
        <div className="mid-banner-content">
          <p className="mid-banner-eyebrow">Oferta especial</p>
          <h2 className="mid-banner-title">Hasta 30% de descuento<br />en accesorios gaming</h2>
          <p className="mid-banner-sub">Por tiempo limitado. No te lo pierdas.</p>
          <Link to="/productos?category=accesorios" className="mid-banner-btn">
            Ver accesorios
          </Link>
        </div>
      </section>

      {/* Recién llegados */}
      <section className="home-section">
        <div className="section-container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Lo último en tecnología</p>
              <h2 className="section-title">Recién llegados</h2>
            </div>
            <Link to="/productos" className="section-link">Ver todos →</Link>
          </div>
          <div className="home-grid">
            {newArrivals.map((product) => (
              <div key={product.id} className="home-card">
                <div className="home-card-badge">Nuevo</div>
                <Link to={`/productos/${product.id}`} className="home-card-img-wrapper">
                  <img src={product.image} alt={product.name} className="home-card-img" />
                </Link>
                <div className="home-card-body">
                  <span className="home-card-category">{product.category}</span>
                  <Link to={`/productos/${product.id}`}>
                    <h3 className="home-card-name">{product.name}</h3>
                  </Link>
                  <p className="home-card-desc">{product.description}</p>
                  <div className="home-card-footer">
                    <span className="home-card-price">${product.price.toFixed(2)}</span>
                    <button className="home-card-btn" onClick={() => addItem(product)}>
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Próximamente */}
      <section className="coming-soon-section">
        <div className="section-container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Muy pronto</p>
              <h2 className="section-title">Lo que viene</h2>
            </div>
          </div>
          <div className="coming-grid">
            {comingSoon.map((item) => (
              <div key={item.id} className="coming-card">
                <div className="coming-card-img-wrapper">
                  <img src={item.image} alt={item.name} className="coming-card-img" />
                  <div className="coming-overlay">
                    <span className="coming-badge">Próximamente</span>
                  </div>
                </div>
                <div className="coming-card-body">
                  <h3 className="coming-card-name">{item.name}</h3>
                  <p className="coming-card-desc">{item.description}</p>
                  <span className="coming-card-date">{item.releaseDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="section-container stats-grid">
          <div className="stat-item">
            <p className="stat-number">500+</p>
            <p className="stat-label">Productos disponibles</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">10K+</p>
            <p className="stat-label">Clientes satisfechos</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">24/7</p>
            <p className="stat-label">Soporte al cliente</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">100%</p>
            <p className="stat-label">Pago seguro</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;