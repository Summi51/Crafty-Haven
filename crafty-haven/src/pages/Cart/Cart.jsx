import { Box, Button, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../components/Context/CartContext";

const Cart = () => {
  const { items, loading, total, loadCart, changeQty, removeItem } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    loadCart();
  }, []);

  const handleQty = async (productId, quantity, size) => {
    try {
      await changeQty(productId, quantity, size);
    } catch (error) {
      toast({ title: error.response?.data?.msg || "Update failed", status: "error" });
    }
  };

  const handleRemove = async (productId, size) => {
    try {
      await removeItem(productId, size);
    } catch (error) {
      toast({ title: error.response?.data?.msg || "Remove failed", status: "error" });
    }
  };

  if (loading) {
    return <Text textAlign="center" mt={10}>Loading your cart...</Text>;
  }

  return (
    <Box width={{ base: "94%", md: "90%" }} maxW="900px" m={{ base: "20px auto", md: "40px auto" }}>
      <Heading size={{ base: "md", md: "lg" }} mb={6} color="#7F508B">My Cart</Heading>
      {items.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text mb={4}>Your cart is empty.</Text>
          <Button colorScheme="purple" onClick={() => navigate("/product")}>
            Shop products
          </Button>
        </Box>
      ) : (
        <>
          {items.map((item) => (
            <Flex
              key={`${item.productId}-${item.size || ""}`}
              direction={{ base: "column", sm: "row" }}
              border="1px solid #eee"
              borderRadius="md"
              p={{ base: 3, md: 4 }}
              mb={4}
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
                <Text fontWeight="bold" noOfLines={2}>{item.title}</Text>
                <Text>₹{item.price}{item.size ? ` • Size ${item.size}` : ""}</Text>
                <Flex align="center" gap={3} mt={2} wrap="wrap">
                  <Button size="sm" onClick={() => handleQty(item.productId, item.quantity - 1, item.size)} isDisabled={item.quantity <= 1}>-</Button>
                  <Text>{item.quantity}</Text>
                  <Button size="sm" onClick={() => handleQty(item.productId, item.quantity + 1, item.size)}>+</Button>
                  <Button size="sm" colorScheme="red" variant="outline" onClick={() => handleRemove(item.productId, item.size)}>Remove</Button>
                </Flex>
              </Box>
              <Text fontWeight="semibold" alignSelf={{ base: "flex-end", sm: "center" }}>₹{item.price * item.quantity}</Text>
            </Flex>
          ))}
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "stretch", sm: "center" }}
            gap={3}
            mt={6}
          >
            <Heading size="md">Total: ₹{total}</Heading>
            <Button colorScheme="purple" w={{ base: "100%", sm: "auto" }} onClick={() => navigate("/checkout")}>Buy Now</Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Cart;
