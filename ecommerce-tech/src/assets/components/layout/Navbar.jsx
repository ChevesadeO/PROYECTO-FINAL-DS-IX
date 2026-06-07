import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import useCartStore from "../../../store/cartStore";
import useAuthStore from "../../../store/authStore";
import "../../../styles/navbar.css";

function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TechStore</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
        {isAuthenticated && (
        <li><Link to="/admin">Admin</Link></li>
        )}
      </ul>

      <div className="navbar-icons">
        <Link to="/carrito" className="cart-icon">
          <FaShoppingCart />
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>

        {isAuthenticated ? (
          <div className="navbar-user">
            <span className="navbar-username">Hola, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <Link to="/login">
            <FaUser />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;