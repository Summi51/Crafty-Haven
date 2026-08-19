import { Badge, Box, Button, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cancelOrder, getOrder, requestRefund } from "../../api/orderApi";

const statusColor = {
  placed: "purple",
  confirmed: "blue",
  packed: "cyan",
  shipped: "orange",
  out_for_delivery: "yellow",
  delivered: "green",
  cancelled: "red",
  refund_requested: "orange",
};

const label = (value = "") => value.replace(/_/g, " ");

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [working, setWorking] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const load = async () => {
    const res = await getOrder(orderId);
    setOrder(res.data.order);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    load().catch((error) => {
      if (error.response?.status === 401) navigate("/login");
      else toast({ title: error.response?.data?.msg || "Order not found", status: "error" });
    });
  }, [orderId]);

  const runAction = async (fn, success) => {
    try {
      setWorking(true);
      const res = await fn();
      setOrder(res.data.order);
      toast({ title: success, status: "success" });
    } catch (error) {
      toast({ title: error.response?.data?.msg || "Action failed", status: "error" });
    } finally {
      setWorking(false);
    }
  };

  if (!order) return <Text textAlign="center" mt={10}>Loading order...</Text>;

  const canCancel = !["cancelled", "delivered", "shipped", "out_for_delivery"].includes(order.status);
  const canRefund =
    ["cancelled", "delivered"].includes(order.status) &&
    order.paymentStatus === "paid";

  return (
    <Box width="90%" maxW="900px" m="40px auto">
      <Button size="sm" variant="ghost" mb={4} onClick={() => navigate("/orders")}>Back to orders</Button>
      <Flex justify="space-between" align="center" wrap="wrap" gap={3} mb={4}>
        <Box>
          <Heading size="lg" color="#7F508B">{order.orderId}</Heading>
          <Text fontSize="sm" color="gray.600">{new Date(order.createdAt).toLocaleString()}</Text>
        </Box>
        <Badge colorScheme={statusColor[order.status] || "gray"} fontSize="md" px={3} py={1}>{label(order.status)}</Badge>
      </Flex>

      {order.items.map((item) => (
        <Flex
          key={item.productId}
          direction={{ base: "column", sm: "row" }}
          border="1px solid #eee"
          borderRadius="md"
          p={4}
          mb={3}
          gap={4}
          align={{ base: "stretch", sm: "center" }}
        >
          <Image src={item.image} alt={item.title} boxSize={{ base: "100%", sm: "70px" }} maxH={{ base: "160px", sm: "70px" }} objectFit="cover" borderRadius="md" loading="lazy" decoding="async" />
          <Box flex="1" minW={0}>
            <Text fontWeight="bold">{item.title}</Text>
            <Text fontSize="sm">₹{item.price} • Qty {item.quantity} • {item.size}</Text>
          </Box>
          <Text fontWeight="semibold" alignSelf={{ base: "flex-end", sm: "center" }}>₹{item.price * item.quantity}</Text>
        </Flex>
      ))}

      <Box border="1px solid #eee" borderRadius="md" p={4} mb={4}>
        <Text fontWeight="bold" mb={2}>Delivery</Text>
        <Text>{order.shippingAddress.name} • {order.shippingAddress.phone}</Text>
        <Text>{order.shippingAddress.address}, {order.shippingAddress.pincode}</Text>
        <Text mt={2} fontSize="sm">
          {order.shippingMethod === "express" ? "Express" : "Standard"} • ETA{" "}
          {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : "-"}
        </Text>
        <Text mt={2}>Items ₹{order.itemsTotal} + Shipping {order.shippingFee ? `₹${order.shippingFee}` : "Free"}</Text>
        <Text fontWeight="bold">Total ₹{order.total}</Text>
        <Text fontSize="sm" color="gray.600">
          Payment: {label(order.paymentStatus)}
          {order.razorpayPaymentId ? ` • ${order.razorpayPaymentId}` : ""}
        </Text>
      </Box>

      <Box border="1px solid #eee" borderRadius="md" p={4} mb={5}>
        <Text fontWeight="bold" mb={3}>Where is my order</Text>
        {(order.timeline || []).map((step, index) => (
          <Box key={`${step.status}-${index}`} mb={2} borderLeft="3px solid #7F508B" pl={3}>
            <Text fontWeight="semibold">{label(step.status)}</Text>
            <Text fontSize="sm" color="gray.600">{step.note}</Text>
            <Text fontSize="xs">{new Date(step.at).toLocaleString()}</Text>
          </Box>
        ))}
      </Box>

      <Flex gap={3} wrap="wrap">
        {canCancel && (
          <Button colorScheme="red" variant="outline" isLoading={working} onClick={() => runAction(() => cancelOrder(order.orderId, "Cancelled by customer"), "Order cancelled")}>
            Cancel order
          </Button>
        )}
        {canRefund && (
          <Button colorScheme="orange" variant="outline" isLoading={working} onClick={() => runAction(() => requestRefund(order.orderId, "Refund requested"), "Refund requested")}>
            Request refund
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default OrderDetail;
