import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Radio, RadioGroup, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPayment, placeOrder } from "../../api/orderApi";
import { useCart } from "../../components/Context/CartContext";

const SHIPPING = {
  standard: { fee: 0, label: "Standard (5-7 days)" },
  express: { fee: 99, label: "Express (1-2 days)" },
};

/*
Razorpay test cards (test mode only)
| Field      | Value                 |
|------------|-----------------------|
| Mastercard | 5104 0155 5555 5558   |
| Visa       | 4386 2894 0766 0153   |
| Expiry     | 12/28                 |
| CVV        | 123                   |
| OTP        | 1234                  |
*/

const Checkout = () => {
  const { items, total, loading, loadCart, clearLocalCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "" });
  const [shipping, setShipping] = useState("standard");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.name) setForm((prev) => ({ ...prev, name: user.name }));
    } catch (_) {}
    loadCart();
  }, []);

  const shipFee = SHIPPING[shipping].fee;
  const grandTotal = total + shipFee;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const finishOrder = async (payment) => {
    const res = await placeOrder({
      ...form,
      shippingMethod: shipping,
      ...payment,
    });
    clearLocalCart();
    toast({ title: "Payment successful. Order placed", status: "success", duration: 2500 });
    navigate(`/orders/${res.data.order.orderId}`);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payRes = await createPayment({ ...form, shippingMethod: shipping });
      const { keyId, amount, currency, razorpayOrderId } = payRes.data;
      let user = {};
      try {
        user = JSON.parse(localStorage.getItem("user") || "{}");
      } catch (_) {}

      if (!window.Razorpay) {
        setSaving(false);
        toast({ title: "Razorpay failed to load. Refresh and try again.", status: "error" });
        return;
      }

      const checkout = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: "Crafty Haven",
        description: "Crafty Haven order payment",
        order_id: razorpayOrderId,
        prefill: {
          name: form.name || user.name || "",
          email: user.email || "",
          contact: form.phone || "",
        },
        method: {
          card: true,
          netbanking: true,
          upi: true,
          wallet: false,
          emi: false,
          paylater: false,
        },
        theme: { color: "#7F508B" },
        handler: async (response) => {
          try {
            await finishOrder(response);
          } catch (error) {
            toast({ title: error.response?.data?.msg || "Payment done, but order failed", status: "error" });
          } finally {
            setSaving(false);
          }
        },
        modal: {
          ondismiss: () => {
            setSaving(false);
            toast({ title: "Payment cancelled", status: "info" });
          },
        },
      });
      checkout.open();
    } catch (error) {
      setSaving(false);
      if (error.response?.status === 401) {
        navigate("/login");
        return;
      }
      toast({ title: error.response?.data?.msg || "Could not start payment", status: "error" });
    }
  };

  if (loading) return <Text textAlign="center" mt={10}>Loading checkout...</Text>;

  if (!items.length) {
    return (
      <Box width="90%" maxW="700px" m="40px auto" textAlign="center">
        <Heading size="lg" mb={4} color="#7F508B">Checkout</Heading>
        <Text mb={4}>Your cart is empty.</Text>
        <Button colorScheme="purple" onClick={() => navigate("/product")}>Shop products</Button>
      </Box>
    );
  }

  return (
    <Box width={{ base: "94%", md: "90%" }} maxW="1000px" m={{ base: "20px auto", md: "40px auto" }}>
      <Heading size="lg" mb={6} color="#7F508B">Checkout</Heading>
      <Flex direction={{ base: "column", md: "row" }} gap={8} align="flex-start">
        <Box flex="1.2" as="form" onSubmit={handlePlaceOrder} border="1px solid #eee" borderRadius="lg" p={6}>
          <Heading size="sm" mb={4}>Delivery address</Heading>
          <FormControl isRequired mb={3}><FormLabel>Name</FormLabel><Input name="name" value={form.name} onChange={handleChange} /></FormControl>
          <FormControl isRequired mb={3}><FormLabel>Phone</FormLabel><Input name="phone" value={form.phone} onChange={handleChange} maxLength={10} placeholder="10-digit mobile" /></FormControl>
          <FormControl isRequired mb={3}><FormLabel>Address</FormLabel><Textarea name="address" value={form.address} onChange={handleChange} rows={3} /></FormControl>
          <FormControl isRequired mb={5}><FormLabel>Pincode</FormLabel><Input name="pincode" value={form.pincode} onChange={handleChange} maxLength={6} /></FormControl>
          <Heading size="sm" mb={3}>Shipping</Heading>
          <RadioGroup value={shipping} onChange={setShipping} mb={6}>
            <Stack>
              <Radio value="standard">Standard (5-7 days) — Free</Radio>
              <Radio value="express">Express (1-2 days) — ₹99</Radio>
            </Stack>
          </RadioGroup>
          <Button type="submit" colorScheme="purple" w="100%" isLoading={saving}>Pay & Place Order</Button>
        </Box>
        <Box flex="1" border="1px solid #eee" borderRadius="lg" p={6} w="100%">
          <Heading size="sm" mb={4}>Order summary</Heading>
          {items.map((item) => (
            <Flex key={item.productId} gap={3} mb={3} align="center">
              <Image src={item.image} alt={item.title} boxSize="54px" objectFit="cover" borderRadius="md" />
              <Box flex="1">
                <Text fontSize="sm" fontWeight="semibold">{item.title}</Text>
                <Text fontSize="xs" color="gray.600">Qty {item.quantity} • {item.size || "Free Size"}</Text>
              </Box>
              <Text fontSize="sm">₹{item.price * item.quantity}</Text>
            </Flex>
          ))}
          <Flex justify="space-between" mt={4}><Text>Items</Text><Text>₹{total}</Text></Flex>
          <Flex justify="space-between"><Text>Shipping</Text><Text>{shipFee ? `₹${shipFee}` : "Free"}</Text></Flex>
          <Flex justify="space-between" mt={2} fontWeight="bold"><Text>Total</Text><Text>₹{grandTotal}</Text></Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Checkout;
