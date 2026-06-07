import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navbar from "../assets/components/layout/Navbar";
import "../styles/auth.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "El nombre es requerido";
    if (!form.email) e.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido";
    if (!form.password) e.password = "La contraseña es requerida";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirm) e.confirm = "Las contraseñas no coinciden";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login({ name: form.name, email: form.email, role: "user" });
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
            <h1 className="auth-title">Crear cuenta</h1>
            <p className="auth-subtitle">Únete a TechStore hoy</p>
          </div>

          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className={`form-input ${errors.name ? "input-error" : ""}`}
                placeholder="Juan Pérez"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

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

            <div className="form-group">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                className={`form-input ${errors.confirm ? "input-error" : ""}`}
                placeholder="••••••••"
                value={form.confirm}
                onChange={(e) => handleChange("confirm", e.target.value)}
              />
              {errors.confirm && <span className="error-msg">{errors.confirm}</span>}
            </div>

            <button
              className="auth-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </div>

          <div className="auth-footer">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="auth-link">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;