import { Box, Button, Flex, Heading, Image, Input, Select, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../components/Context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [showCustomQty, setShowCustomQty] = useState(false);
  const [customQty, setCustomQty] = useState("");
  const [saving, setSaving] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast({ title: "Product not found", status: "error" }));
  }, [id]);

  const applyCustomQty = () => {
    const value = Number(customQty);
    if (Number.isFinite(value) && value >= 1) {
      setQty(Math.floor(value));
      setShowCustomQty(false);
      setCustomQty("");
    }
  };

  const handleQtyChange = (value) => {
    if (value === "more") {
      setShowCustomQty(true);
      setCustomQty("");
      return;
    }
    setShowCustomQty(false);
    setQty(Number(value));
  };

  const saveToCart = async () => {
    await addItem({
      productId: String(product.id),
      title: product.desc,
      image: product.img,
      price: product.price,
      quantity: qty,
      size: "Free Size",
    });
  };

  const handleAddToCart = async () => {
    try {
      setSaving(true);
      await saveToCart();
      toast({ title: "Added to cart", status: "success", duration: 2000 });
    } catch (error) {
      if (error.code === "LOGIN_REQUIRED" || error.response?.status === 401) {
        navigate("/login");
        return;
      }
      toast({ title: error.response?.data?.msg || "Could not add to cart", status: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      setSaving(true);
      await saveToCart();
      navigate("/cart");
    } catch (error) {
      if (error.code === "LOGIN_REQUIRED" || error.response?.status === 401) {
        navigate("/login");
        return;
      }
      toast({ title: error.response?.data?.msg || "Could not add to cart", status: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (!product) return <Text textAlign="center" mt={10}>Loading product...</Text>;

  return (
    <Box width="90%" maxW="1100px" m="40px auto">
      <Flex direction={{ base: "column", md: "row" }} gap={10}>
        <Image src={product.img} alt={product.desc} flex="1" maxH="480px" objectFit="cover" borderRadius="lg" />
        <Box flex="1">
          <Button size="sm" bg="green.500" color="white" borderRadius="full" mb={3}>Rating: {product.rating}</Button>
          <Button size="sm" variant="outline" borderRadius="full" ml={2} mb={3}>Free Delivery</Button>
          <Heading size="lg" color="#7F508B" mb={2}>{product.desc}</Heading>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>₹{product.price}</Text>
          <Text fontWeight="semibold" mb={2}>Size</Text>
          <Button size="sm" colorScheme="purple" mb={5} cursor="default">
            Free Size
          </Button>
          <Text fontWeight="semibold" mb={2}>Quantity</Text>
          <Select
            maxW="160px"
            mb={showCustomQty ? 2 : 5}
            value={qty === 1 || qty === 2 || qty === 3 ? String(qty) : `Qty: ${qty}`}
            onChange={(e) => handleQtyChange(e.target.value)}
          >
            <option value="1">Qty: 1</option>
            <option value="2">Qty: 2</option>
            <option value="3">Qty: 3</option>
            {qty > 3 && <option value={`Qty: ${qty}`}>{`Qty: ${qty}`}</option>}
            <option value="more">more</option>
          </Select>
          {showCustomQty && (
            <Flex gap={2} mb={5} maxW="220px">
              <Input
                type="number"
                min={1}
                placeholder="Type qty, e.g. 11"
                value={customQty}
                onChange={(e) => setCustomQty(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyCustomQty()}
              />
              <Button size="sm" colorScheme="purple" onClick={applyCustomQty}>OK</Button>
            </Flex>
          )}
          <Text fontWeight="bold" mb={1}>Details</Text>
          <Text fontSize="sm" mb={3}>Handmade {product.category} piece from Crafty Haven. Packed after payment and shipped across India.</Text>
          <Text fontWeight="bold" mb={1}>Care</Text>
          <Text fontSize="sm" mb={6}>Keep dry. Wipe gently. Avoid direct sunlight for long hours.</Text>
          <Flex gap={3} direction={{ base: "column", sm: "row" }}>
            <Button variant="outline" colorScheme="purple" borderRadius="full" px={8} w={{ base: "100%", sm: "auto" }} isLoading={saving} onClick={handleAddToCart}>Add to Cart</Button>
            <Button bg="#1B1B3A" color="white" borderRadius="full" px={8} w={{ base: "100%", sm: "auto" }} _hover={{ bg: "black" }} isLoading={saving} onClick={handleBuyNow}>Buy Now</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleProduct;
