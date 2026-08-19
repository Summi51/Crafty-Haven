import axios from "axios";

const API = "http://localhost:8080/api/cart";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCart = () => axios.get(API, authHeader());

export const addToCart = (item) => axios.post(API, item, authHeader());

export const updateCartQty = (productId, quantity, size = "") =>
  axios.patch(`${API}/${productId}`, { quantity, size }, authHeader());

export const removeFromCart = (productId, size = "") =>
  axios.delete(`${API}/${productId}`, { ...authHeader(), params: { size } });
