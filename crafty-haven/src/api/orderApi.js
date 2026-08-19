import axios from "axios";

const API = "http://localhost:8080/api/orders";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createPayment = (payload) =>
  axios.post(`${API}/create-payment`, payload, authHeader());

export const placeOrder = (payload) => axios.post(API, payload, authHeader());

export const getOrders = () => axios.get(API, authHeader());

export const getOrder = (orderId) => axios.get(`${API}/${orderId}`, authHeader());

export const cancelOrder = (orderId, reason = "") =>
  axios.patch(`${API}/${orderId}/cancel`, { reason }, authHeader());

export const requestRefund = (orderId, reason = "") =>
  axios.patch(`${API}/${orderId}/refund`, { reason }, authHeader());
