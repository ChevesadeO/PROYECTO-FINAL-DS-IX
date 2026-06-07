import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jsPDF } from "jspdf";
import Navbar from "../assets/components/layout/Navbar";
import "../styles/invoice.css";

function Invoice() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const invoice = state?.invoice;

  useEffect(() => {
    if (!invoice) navigate("/");
  }, [invoice, navigate]);

  if (!invoice) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = 20;

    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("TechStore", margin, 18);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Tienda de Tecnología Premium", margin, 27);
    doc.text(`Factura N°: ${invoice.number}`, margin, 35);

    y = 55;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Datos del cliente", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 8;
    doc.text(`Nombre: ${invoice.customer.name}`, margin, y);
    y += 6;
    doc.text(`Email: ${invoice.customer.email}`, margin, y);
    y += 6;
    doc.text(`Teléfono: ${invoice.customer.phone}`, margin, y);
    y += 6;
    doc.text(`Dirección: ${invoice.address}`, margin, y);
    y += 6;
    doc.text(`Fecha: ${invoice.date}`, margin, y);

    y += 14;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, 170, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Producto", margin + 2, y + 5.5);
    doc.text("Cant.", 115, y + 5.5);
    doc.text("Precio", 135, y + 5.5);
    doc.text("Subtotal", 160, y + 5.5);

    y += 12;
    doc.setFont("helvetica", "normal");
    invoice.items.forEach((item) => {
      doc.text(item.name.slice(0, 35), margin + 2, y);
      doc.text(`${item.quantity}`, 115, y);
      doc.text(`$${item.price.toFixed(2)}`, 135, y);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, y);
      y += 8;
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y - 3, 190, y - 3);
    });

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal:`, 140, y);
    doc.text(`$${invoice.subtotal.toFixed(2)}`, 170, y);
    y += 7;
    doc.text(`ITBMS (7%):`, 140, y);
    doc.text(`$${invoice.tax.toFixed(2)}`, 170, y);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`TOTAL:`, 140, y);
    doc.text(`$${invoice.total.toFixed(2)}`, 170, y);

    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("Gracias por su compra en TechStore.", margin, y);
    doc.text("Este documento es una factura simulada con fines académicos.", margin, y + 6);

    doc.save(`factura-${invoice.number}.pdf`);
  };

  return (
    <>
      <Navbar />
      <div className="invoice-page">

        {/* Éxito */}
        <div className="invoice-success">
          <div className="success-icon">✓</div>
          <h1 className="success-title">¡Pago procesado con éxito!</h1>
          <p className="success-subtitle">
            Tu pedido ha sido confirmado. Revisa tu factura a continuación.
          </p>
        </div>

        {/* Factura */}
        <div className="invoice-card" id="invoice-content">

          {/* Header */}
          <div className="invoice-header">
            <div>
              <h2 className="invoice-brand">TechStore</h2>
              <p className="invoice-brand-sub">Tienda de Tecnología Premium</p>
            </div>
            <div className="invoice-meta">
              <p className="invoice-number">Factura N° {invoice.number}</p>
              <p className="invoice-date">Fecha: {invoice.date}</p>
            </div>
          </div>

          {/* Cliente */}
          <div className="invoice-section">
            <h3 className="invoice-section-title">Datos del cliente</h3>
            <div className="invoice-customer-grid">
              <div>
                <p className="invoice-label">Nombre</p>
                <p className="invoice-value">{invoice.customer.name}</p>
              </div>
              <div>
                <p className="invoice-label">Email</p>
                <p className="invoice-value">{invoice.customer.email}</p>
              </div>
              <div>
                <p className="invoice-label">Teléfono</p>
                <p className="invoice-value">{invoice.customer.phone}</p>
              </div>
              <div>
                <p className="invoice-label">Dirección</p>
                <p className="invoice-value">{invoice.address}</p>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="invoice-section">
            <h3 className="invoice-section-title">Detalle de productos</h3>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Precio unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totales */}
          <div className="invoice-totals">
            <div className="totals-row">
              <span>Subtotal</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="totals-row">
              <span>Envío</span>
              <span className="free">Gratis</span>
            </div>
            <div className="totals-row">
              <span>ITBMS (7%)</span>
              <span>${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="totals-row totals-final">
              <span>Total pagado</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer factura */}
          <div className="invoice-footer-note">
            Gracias por tu compra en TechStore. Este documento es una factura simulada con fines académicos.
          </div>
        </div>

        {/* Acciones */}
        <div className="invoice-actions">
          <button className="invoice-btn-download" onClick={downloadPDF}>
            ⬇ Descargar PDF
          </button>
          <Link to="/productos" className="invoice-btn-shop">
            Seguir comprando
          </Link>
          <Link to="/" className="invoice-btn-home">
            Ir al inicio
          </Link>
        </div>

      </div>
    </>
  );
}

export default Invoice;