import { create } from "zustand";
import Swal from "sweetalert2";

const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) => {
    const exists = get().items.find((i) => i.id === product.id);
    if (exists) {
      set({
        items: get().items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...product, quantity: 1 }] });
    }

    // Toast notification
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: `${product.name}`,
      text: exists ? "Cantidad actualizada en el carrito" : "Agregado al carrito",
      iconColor: "#a78bfa",
      background: "#1e1b4b",
      color: "#e2e8f0",
    });
  },

  removeItem: (id) =>
    set({ items: get().items.filter((i) => i.id !== id) }),

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((i) => i.id !== id) });
    } else {
      set({
        items: get().items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
      });
    }
  },

  clearCart: () => set({ items: [] }),

  getTotal: () =>
    get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),

  getTotalItems: () =>
    get().items.reduce((acc, i) => acc + i.quantity, 0),
}));

export default useCartStore;