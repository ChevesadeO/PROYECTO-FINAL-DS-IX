import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import useCartStore from "../../../store/cartStore";
import useAuthStore from "../../../store/authStore";
import logoDark from "../../../assets/img/logo-light.png";
import "../../../styles/navbar.css";

function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/productos?search=${search}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="top-banner">
        <p>🚀 Envío gratis en compras mayores a $50 · Hasta 30% de descuento en accesorios gaming</p>
      </div>

      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logoDark} alt="TechStore" className="navbar-logo-img" />
          </Link>
        </div>

        {/* Links desktop */}
        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
          {isAuthenticated && user?.role === "admin" && (
            <li><Link to="/admin">Admin</Link></li>
          )}
        </ul>

        {/* Búsqueda desktop */}
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
          <Link to="/carrito" className="cart-icon" onClick={closeMenu}>
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
            <Link to="/login" onClick={closeMenu}>
              <FaUser />
            </Link>
          )}

          {/* Botón hamburguesa */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-overlay" onClick={closeMenu} />
          <div className="mobile-menu-panel">

            {/* Búsqueda móvil */}
            <form className="mobile-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-btn">
                <FaSearch />
              </button>
            </form>

            {/* Links móvil */}
            <ul className="mobile-links">
              <li><Link to="/" onClick={closeMenu}>🏠 Inicio</Link></li>
              <li><Link to="/productos" onClick={closeMenu}>💻 Productos</Link></li>
              <li><Link to="/carrito" onClick={closeMenu}>🛒 Carrito {totalItems > 0 && `(${totalItems})`}</Link></li>
              {!isAuthenticated && (
                <li><Link to="/login" onClick={closeMenu}>👤 Login</Link></li>
              )}
              {!isAuthenticated && (
                <li><Link to="/registro" onClick={closeMenu}>📝 Registro</Link></li>
              )}
              {isAuthenticated && user?.role === "admin" && (
                <li><Link to="/admin" onClick={closeMenu}>⚙️ Admin</Link></li>
              )}
            </ul>

            {/* Usuario móvil */}
            {isAuthenticated && (
              <div className="mobile-user">
                <div className="mobile-user-info">
                  <div className="mobile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="mobile-user-name">{user.name}</p>
                    <p className="mobile-user-email">{user.email}</p>
                  </div>
                </div>
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;