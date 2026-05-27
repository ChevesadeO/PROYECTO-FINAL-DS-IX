import { create } from "zustand";

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