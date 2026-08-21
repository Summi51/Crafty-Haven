import { Badge, Box, Button, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cancelOrder, getOrder, requestRefund } from "../../api/orderApi";
import { displayBadge, FALLBACK_STEPS, label } from "./orderStatus";

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
    const fail = (error) => {
      if (error.response?.status === 401) navigate("/login");
      else toast({ title: error.response?.data?.msg || "Order not found", status: "error" });
    };
    load().catch(fail);
    const timer = setInterval(() => load().catch(() => {}), 20000);
    return () => clearInterval(timer);
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

  const badge = displayBadge(order);
  const steps = (order.tracking && order.tracking.steps) || FALLBACK_STEPS;
  const extraSteps = (order.timeline || []).filter((step) =>
    ["cancelled", "refund_requested", "refunded"].includes(step.status)
  );
  const canCancel = !["cancelled", "delivered", "shipped", "out_for_delivery"].includes(order.status);
  const canRefund =
    ["cancelled", "delivered"].includes(order.status) &&
    order.paymentMethod !== "cod" &&
    order.paymentStatus === "paid";

  return (
    <Box width="90%" maxW="900px" m="40px auto">
      <Button size="sm" variant="ghost" mb={4} onClick={() => navigate("/orders")}>Back to orders</Button>
      <Flex justify="space-between" align="center" wrap="wrap" gap={3} mb={4}>
        <Box>
          <Heading size="lg" color="#7F508B">{order.orderId}</Heading>
          <Text fontSize="sm" color="gray.600">{new Date(order.createdAt).toLocaleString()}</Text>
        </Box>
        <Badge colorScheme={badge.color} fontSize="md" px={3} py={1}>{badge.text}</Badge>
      </Flex>

      {["refund_requested", "refunded"].includes(order.paymentStatus) && (
        <Box bg={order.paymentStatus === "refunded" ? "green.50" : "orange.50"} borderRadius="md" p={4} mb={4}>
          <Text fontWeight="bold" color={order.paymentStatus === "refunded" ? "green.700" : "orange.700"}>
            {order.paymentStatus === "refunded" ? "Refund completed" : "Refund in progress"}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {order.status === "delivered"
              ? "This order was delivered, then a refund was requested."
              : "Refund was requested after this order was cancelled."}
            {order.paymentStatus === "refund_requested" && order.tracking?.nextAt
              ? ` Expected by ${new Date(order.tracking.nextAt).toLocaleString()}.`
              : ""}
          </Text>
        </Box>
      )}

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
          <Image
            src={item.image}
            alt={item.title}
            boxSize={{ base: "100%", sm: "90px" }}
            maxH={{ base: "180px", sm: "90px" }}
            objectFit="cover"
            borderRadius="md"
            loading="lazy"
            decoding="async"
          />
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
          Payment: {label(order.paymentStatus)} • Method: {order.paymentMethod === "cod" ? "COD" : "Razorpay"}
        </Text>
      </Box>

      <Box border="1px solid #eee" borderRadius="md" p={4} mb={5}>
        <Text fontWeight="bold" mb={4}>Order timeline</Text>
        {steps.map((step, index) => {
          const done = (order.timeline || []).find((entry) => entry.status === step.status);
          const isNext = order.tracking && order.tracking.nextStatus === step.status;
          const last = index === steps.length - 1 && extraSteps.length === 0;
          return (
            <Flex key={step.status} align="stretch" opacity={done || isNext ? 1 : 0.45}>
              <Flex direction="column" align="center" mr={3} w="18px">
                <Box
                  w="14px"
                  h="14px"
                  borderRadius="full"
                  bg={done ? "#7F508B" : isNext ? "white" : "#E2E8F0"}
                  border="2px solid"
                  borderColor={done || isNext ? "#7F508B" : "#E2E8F0"}
                />
                {!last && <Box flex="1" w="2px" bg={done ? "#7F508B" : "#E2E8F0"} my={1} minH="28px" />}
              </Flex>
              <Box pb={last ? 0 : 4} flex="1">
                <Text fontWeight={isNext ? "bold" : "semibold"} color={isNext ? "#7F508B" : "inherit"}>
                  {label(step.status)}
                </Text>
                <Text fontSize="sm" color="gray.600">{done ? done.note : step.note}</Text>
                <Text fontSize="xs" color="gray.500">
                  {done
                    ? new Date(done.at).toLocaleString()
                    : isNext && order.tracking.nextAt
                      ? `Expected ${new Date(order.tracking.nextAt).toLocaleString()}`
                      : "Upcoming"}
                </Text>
              </Box>
            </Flex>
          );
        })}
        {extraSteps.map((step, index) => {
          const last = index === extraSteps.length - 1;
          const color = step.status === "refunded" ? "green.500" : "orange.400";
          return (
            <Flex key={`${step.status}-${index}`} align="stretch">
              <Flex direction="column" align="center" mr={3} w="18px">
                <Box w="14px" h="14px" borderRadius="full" bg={color} />
                {!last && <Box flex="1" w="2px" bg={color} my={1} minH="28px" />}
              </Flex>
              <Box pb={last ? 0 : 4} flex="1">
                <Text fontWeight="bold">{label(step.status)}</Text>
                <Text fontSize="sm" color="gray.600">{step.note}</Text>
                <Text fontSize="xs" color="gray.500">{new Date(step.at).toLocaleString()}</Text>
              </Box>
            </Flex>
          );
        })}
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
