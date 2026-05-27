import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import "../../../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TechStore</Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li>
          <Link to="/productos">Productos</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <div className="navbar-icons">
        <Link to="/carrito">
          <FaShoppingCart />
        </Link>

        <Link to="/login">
          <FaUser />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;