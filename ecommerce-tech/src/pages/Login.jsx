import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navbar from "../assets/components/layout/Navbar";
import "../styles/auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido";
    if (!form.password) e.password = "La contraseña es requerida";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login({ name: form.email.split("@")[0], email: form.email, role: "user" });
    setLoading(false);
    navigate("/");
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Iniciar sesión</h1>
            <p className="auth-subtitle">Bienvenido de vuelta a TechStore</p>
          </div>

          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className={`form-input ${errors.email ? "input-error" : ""}`}
                placeholder="tu@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-input ${errors.password ? "input-error" : ""}`}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            <button
              className="auth-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </div>

          <div className="auth-footer">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="auth-link">Regístrate aquí</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;