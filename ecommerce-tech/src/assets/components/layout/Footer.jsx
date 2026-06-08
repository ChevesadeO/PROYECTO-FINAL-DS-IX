import { Link } from "react-router-dom";
import "../../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h3 className="footer-logo">TechStore</h3>
          <p className="footer-desc">
            Tu tienda de tecnología premium. Los mejores productos al mejor precio.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Categorías</h4>
          <ul>
            <li><Link to="/productos">Laptops</Link></li>
            <li><Link to="/productos">Smartphones</Link></li>
            <li><Link to="/productos">Monitores</Link></li>
            <li><Link to="/productos">Accesorios</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contacto</h4>
          <p>📧 info@techstore.com</p>
          <p>📞 +507 6000-0000</p>
          <p>📍 Ciudad de Panamá, Panamá</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TechStore. Todos los derechos reservados.</p>
        <p>Proyecto académico — Desarrollo de Software IX</p>
      </div>
    </footer>
  );
}

export default Footer;