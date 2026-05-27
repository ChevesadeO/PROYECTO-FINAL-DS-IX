import useCartStore from "../../../store/cartStore";
import "../../../styles/products.css";

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;