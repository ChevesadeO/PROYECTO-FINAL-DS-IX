import { Link } from "react-router-dom";
import Navbar from "../assets/components/layout/Navbar";

function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
        padding: "40px",
      }}>
        <h1 style={{ fontSize: "96px", fontWeight: "800", color: "#3b82f6", lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", margin: "16px 0 8px" }}>
          Página no encontrada
        </h2>
        <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px" }}>
          La página que buscas no existe o fue movida.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/" style={{
            padding: "12px 28px",
            background: "#3b82f6",
            color: "#fff",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "15px",
          }}>
            Ir al inicio
          </Link>
          <Link to="/productos" style={{
            padding: "12px 28px",
            background: "#f1f5f9",
            color: "#0f172a",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "15px",
          }}>
            Ver productos
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;