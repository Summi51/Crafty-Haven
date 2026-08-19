import { Badge, Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../api/orderApi";

const statusColor = {
  placed: "purple",
  confirmed: "blue",
  packed: "cyan",
  shipped: "orange",
  out_for_delivery: "yellow",
  delivered: "green",
  cancelled: "red",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    getOrders()
      .then((res) => setOrders(res.data.orders || []))
      .catch((error) => {
        if (error.response?.status === 401) navigate("/login");
        else toast({ title: error.response?.data?.msg || "Could not load orders", status: "error" });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Text textAlign="center" mt={10}>Loading your orders...</Text>;

  return (
    <Box width="90%" maxW="900px" m="40px auto">
      <Heading size="lg" mb={6} color="#7F508B">My Orders</Heading>
      {orders.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text mb={4}>You have not placed any orders yet.</Text>
          <Button colorScheme="purple" onClick={() => navigate("/product")}>Shop products</Button>
        </Box>
      ) : (
        orders.map((order) => (
          <Box key={order.orderId} border="1px solid #eee" borderRadius="lg" p={5} mb={4}>
            <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
              <Box>
                <Text fontWeight="bold">{order.orderId}</Text>
                <Text fontSize="sm" color="gray.600">
                  {new Date(order.createdAt).toLocaleString()} • {order.items.length} item(s)
                </Text>
                <Text fontSize="sm" mt={1}>₹{order.total} • {order.shippingMethod === "express" ? "Express" : "Standard"}</Text>
              </Box>
              <Flex align="center" gap={3}>
                <Badge colorScheme={statusColor[order.status] || "gray"}>{order.status.replaceAll("_", " ")}</Badge>
                <Button size="sm" colorScheme="purple" variant="outline" onClick={() => navigate(`/orders/${order.orderId}`)}>
                  Track order
                </Button>
              </Flex>
            </Flex>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Orders;
