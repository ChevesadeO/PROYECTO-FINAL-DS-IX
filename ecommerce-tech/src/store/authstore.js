import { create } from "zustand";

const storedUser = localStorage.getItem("user");
console.log("Usuario en localStorage:", storedUser);

const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,

  login: (userData) => {
    console.log("Haciendo login con:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;