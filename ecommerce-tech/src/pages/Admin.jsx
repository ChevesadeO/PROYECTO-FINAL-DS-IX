import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navbar from "../assets/components/layout/Navbar";
import "../styles/admin.css";

const initialProducts = [
  { id: 1, name: "Laptop Gamer Pro", price: 1200, category: "laptops", stock: 10, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800", description: "Laptop gaming con RTX 4060, 16GB RAM, 512GB SSD." },
  { id: 2, name: "MacBook Air M2", price: 1399, category: "laptops", stock: 8, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800", description: "Ultradelgada, chip M2, batería de 18 horas." },
  { id: 3, name: "iPhone 15", price: 999, category: "smartphones", stock: 15, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800", description: "Cámara 48MP, chip A16, Dynamic Island." },
  { id: 4, name: "Samsung Galaxy S24", price: 899, category: "smartphones", stock: 12, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800", description: "Pantalla AMOLED 120Hz, 256GB, cámara 200MP." },
  { id: 5, name: "Headset RGB Pro", price: 150, category: "accesorios", stock: 20, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800", description: "Sonido 7.1 virtual, micrófono con cancelación de ruido." },
  { id: 6, name: "Teclado Mecánico", price: 120, category: "accesorios", stock: 18, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800", description: "Switches Cherry MX Red, retroiluminación RGB." },
  { id: 7, name: "Mouse Gamer", price: 65, category: "accesorios", stock: 25, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800", description: "16000 DPI, 7 botones programables, RGB." },
  { id: 8, name: "Monitor 4K 27\"", price: 450, category: "monitores", stock: 6, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800", description: "Resolución 4K UHD, 144Hz, panel IPS, HDR400." },
  { id: 9, name: "Monitor Curvo 32\"", price: 380, category: "monitores", stock: 5, image: "https://images.unsplash.com/photo-1593640408182-31c228b28b53?q=80&w=800", description: "Curvatura 1500R, 165Hz, FreeSync Premium." },
  { id: 10, name: "iPad Pro M2", price: 1099, category: "tablets", stock: 9, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800", description: "Pantalla Liquid Retina 11\", chip M2." },
  { id: 11, name: "Samsung Galaxy Tab S9", price: 799, category: "tablets", stock: 7, image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=800", description: "Pantalla AMOLED 11\", S Pen incluido, 128GB." },
  { id: 12, name: "Disco SSD 1TB", price: 95, category: "almacenamiento", stock: 30, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800", description: "NVMe PCIe 4.0, lectura 7000MB/s." },
];

const emptyForm = { name: "", price: "", category: "laptops", stock: "", image: "", description: "" };
const categories = ["laptops", "smartphones", "accesorios", "monitores", "tablets", "almacenamiento"];

function Admin() {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
 

if (!isAuthenticated || user?.role !== "admin") {
    return (
      <>
        <Navbar />
        <div className="admin-blocked-card">
        <span className="blocked-icon">🔒</span>
        <h2>Acceso restringido</h2>
        <p>Esta sección es solo para administradores.</p>
        <button className="admin-btn-primary" onClick={() => navigate("/login")}>
          Ir al Login
        </button>
        </div>
      </>
    );
  }

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Requerido";
    if (!form.price || isNaN(form.price) || form.price <= 0) e.price = "Precio inválido";
    if (!form.stock || isNaN(form.stock) || form.stock < 0) e.stock = "Stock inválido";
    if (!form.image) e.image = "Requerido";
    if (!form.description) e.description = "Requerido";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    if (editingId) {
      setProducts(products.map((p) =>
        p.id === editingId ? { ...p, ...form, price: parseFloat(form.price), stock: parseInt(form.stock) } : p
      ));
      showToast("Producto actualizado correctamente");
    } else {
      const newProduct = {
        ...form,
        id: Date.now(),
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      };
      setProducts([...products, newProduct]);
      showToast("Producto agregado correctamente");
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setErrors({});
  };

  const handleEdit = (product) => {
    setForm({ ...product, price: String(product.price), stock: String(product.stock) });
    setEditingId(product.id);
    setShowForm(true);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setDeleteId(null);
    showToast("Producto eliminado", "error");
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
          {toast.type === "error" ? "🗑" : "✓"} {toast.msg}
        </div>
      )}

      {/* Modal confirmar eliminación */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>¿Eliminar producto?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button className="admin-btn-danger" onClick={() => handleDelete(deleteId)}>
                Eliminar
              </button>
              <button className="admin-btn-secondary" onClick={() => setDeleteId(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-page">

        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Panel de Administración</h1>
            <p className="admin-subtitle">{products.length} productos en total</p>
          </div>
          <button
            className="admin-btn-primary"
            onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
          >
            {showForm ? "✕ Cancelar" : "+ Nuevo producto"}
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="admin-form-card">
            <h2 className="form-card-title">
              {editingId ? "Editar producto" : "Agregar nuevo producto"}
            </h2>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Nombre</label>
                <input
                  className={`admin-input ${errors.name ? "input-error" : ""}`}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Nombre del producto"
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Precio ($)</label>
                <input
                  className={`admin-input ${errors.price ? "input-error" : ""}`}
                  type="number"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="0.00"
                />
                {errors.price && <span className="error-msg">{errors.price}</span>}
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Categoría</label>
                <select
                  className="admin-input"
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Stock</label>
                <input
                  className={`admin-input ${errors.stock ? "input-error" : ""}`}
                  type="number"
                  value={form.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  placeholder="0"
                />
                {errors.stock && <span className="error-msg">{errors.stock}</span>}
              </div>

              <div className="admin-form-group full-col">
                <label className="admin-label">URL de imagen</label>
                <input
                  className={`admin-input ${errors.image ? "input-error" : ""}`}
                  value={form.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="https://..."
                />
                {errors.image && <span className="error-msg">{errors.image}</span>}
              </div>

              <div className="admin-form-group full-col">
                <label className="admin-label">Descripción</label>
                <textarea
                  className={`admin-input admin-textarea ${errors.description ? "input-error" : ""}`}
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Descripción del producto..."
                  rows={3}
                />
                {errors.description && <span className="error-msg">{errors.description}</span>}
              </div>
            </div>

            {form.image && (
              <div className="image-preview">
                <img src={form.image} alt="preview" />
                <span>Vista previa</span>
              </div>
            )}

            <div className="form-card-actions">
              <button className="admin-btn-primary" onClick={handleSubmit}>
                {editingId ? "Guardar cambios" : "Agregar producto"}
              </button>
              <button className="admin-btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="admin-stats">
          {categories.map((cat) => (
            <div key={cat} className="stat-card">
              <p className="stat-value">{products.filter((p) => p.category === cat).length}</p>
              <p className="stat-label">{cat}</p>
            </div>
          ))}
        </div>

        {/* Búsqueda */}
        <div className="admin-search-bar">
          <input
            className="admin-search"
            placeholder="Buscar producto o categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="admin-search-count">{filtered.length} resultados</span>
        </div>

        {/* Tabla */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} className="table-img" />
                  </td>
                  <td>
                    <p className="table-product-name">{product.name}</p>
                    <p className="table-product-desc">{product.description.slice(0, 50)}...</p>
                  </td>
                  <td>
                    <span className="table-category">{product.category}</span>
                  </td>
                  <td className="table-price">${product.price.toFixed(2)}</td>
                  <td>
                    <span className={`table-stock ${product.stock <= 5 ? "stock-low" : "stock-ok"}`}>
                      {product.stock} uds.
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-edit" onClick={() => handleEdit(product)}>
                        ✏ Editar
                      </button>
                      <button className="btn-delete" onClick={() => setDeleteId(product.id)}>
                        🗑 Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default Admin;