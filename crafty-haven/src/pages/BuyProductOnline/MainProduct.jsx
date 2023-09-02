import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const MainProduct = () => {
  const [pro, setpro] = useState([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  console.log(searchParams.get("category", "10"));

  useEffect(() => {
    const funProduct = () => {
      let obj = {
        params: {
          rating: searchParams.getAll("rating") || [],
          // category: searchParams.get("category") &&  searchParams.get("category")  || "",
          _sort: "price",
          _order: searchParams.get("order"),
        },
      };
      searchParams.get("category") &&
        (obj.params.category = searchParams.get("category"));
      axios
        .get(`https://user-details-pww9.onrender.com/products`, obj)
        .then((res) => {
          setpro(res.data);
        })
        .catch((err) => console.log(err));
    };
    funProduct();
  }, [location.search]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={4}
      mt={"50px"}
      mb={"50px"}
    >
      {pro.map((item) => (
        <Box
          key={item.id}
          border="1px solid #ccc"
          borderRadius="md"
          p={4}
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Image src={item.img} alt="img" mb={2} />
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {item.desc}
          </Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="semibold">
              ₹{item.price}
            </Text>
            <Flex alignItems="center">
              <Text mr={1}>{item.rating}⭐️</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Button colorScheme="teal" size="sm">
              Add to Cart
            </Button>
            <Button colorScheme="blue" size="sm">
              Buy Now
            </Button>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default MainProduct;
