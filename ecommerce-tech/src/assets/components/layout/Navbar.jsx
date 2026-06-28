import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSearch } from "react-icons/fa";
import useCartStore from "../../../store/cartStore";
import useAuthStore from "../../../store/authStore";
import logoDark from "../../../assets/img/logo-light.png";
import "../../../styles/navbar.css";

function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/productos?search=${search}`);
      setSearch("");
    }
  };

  return (
    <>
      <div className="top-banner">
        <p>🚀 Envío gratis en compras mayores a $50 · Hasta 30% de descuento en accesorios gaming</p>
      </div>

      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logoDark} alt="TechStore" className="navbar-logo-img" />
          </Link>
        </div>

        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
          {isAuthenticated && user?.role === "admin" && (
            <li><Link to="/admin">Admin</Link></li>
          )}
        </ul>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="navbar-search-input"
          />
          <button type="submit" className="navbar-search-btn">
            <FaSearch />
          </button>
        </form>

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
    </>
  );
}

export default Navbar;