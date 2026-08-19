import { createContext, useContext, useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart, updateCartQty } from "../../api/cartApi";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = () => localStorage.getItem("token");

  const loadCart = async () => {
    if (!token()) {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const res = await getCart();
      setItems(res.data.items || []);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addItem = async (product) => {
    if (!token()) {
      const err = new Error("LOGIN_REQUIRED");
      err.code = "LOGIN_REQUIRED";
      throw err;
    }
    const res = await addToCart(product);
    setItems(res.data.items || []);
    return res.data;
  };

  const changeQty = async (productId, quantity, size = "") => {
    const res = await updateCartQty(productId, quantity, size);
    setItems(res.data.items || []);
  };

  const removeItem = async (productId, size = "") => {
    const res = await removeFromCart(productId, size);
    setItems(res.data.items || []);
  };

  const clearLocalCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, loading, total, count, loadCart, addItem, changeQty, removeItem, clearLocalCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
