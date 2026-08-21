import { Box, Button, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../api/orderApi";
import { listRows, statusLine } from "./orderStatus";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  const load = () =>
    getOrders()
      .then((res) => setOrders(res.data.orders || []))
      .catch((error) => {
        if (error.response?.status === 401) navigate("/login");
        else toast({ title: error.response?.data?.msg || "Could not load orders", status: "error" });
      });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    load().finally(() => setLoading(false));
    const timer = setInterval(() => load().catch(() => {}), 20000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <Text textAlign="center" mt={10}>Loading your orders...</Text>;

  const rows = orders.flatMap(listRows);

  return (
    <Box width="90%" maxW="900px" m="40px auto">
      <Heading size="lg" mb={6} color="#7F508B">My Orders</Heading>
      {rows.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text mb={4}>You have not placed any orders yet.</Text>
          <Button colorScheme="purple" onClick={() => navigate("/product")}>Shop products</Button>
        </Box>
      ) : (
        rows.map((row) => {
          const { order, kind } = row;
          const first = order.items[0] || {};
          const line = statusLine(kind, order);
          const extra = order.items.length > 1 ? ` +${order.items.length - 1} more` : "";
          return (
            <Box
              key={row.key}
              bg="white"
              border="1px solid #edf2f7"
              borderRadius="md"
              p={4}
              mb={3}
              cursor="pointer"
              onClick={() => navigate(`/orders/${order.orderId}`)}
              _hover={{ boxShadow: "sm" }}
            >
              <Text fontSize="sm" fontWeight="semibold" color={line.color} mb={3}>{line.text}</Text>
              <Flex gap={4} align="center">
                <Image
                  src={first.image}
                  alt={first.title || "Order item"}
                  boxSize="72px"
                  objectFit="cover"
                  borderRadius="md"
                  flexShrink={0}
                  loading="lazy"
                  decoding="async"
                />
                <Box flex="1" minW={0}>
                  <Text fontWeight="medium" noOfLines={1}>{first.title || order.orderId}{extra}</Text>
                  <Text fontSize="sm" color="gray.600">₹{order.total}</Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>{order.orderId}</Text>
                </Box>
              </Flex>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Orders;
