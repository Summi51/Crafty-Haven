import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const MainProduct = () => {
  const [pro, setpro] = useState([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const funProduct = (page) => {
      let obj = {
        params: {
          rating: searchParams.getAll("rating") || [],
          //  category: searchParams.get("category") &&  searchParams.get("category")  || "",
          // _sort: "price",
          _order: searchParams.get("order"),
        },
      };
      searchParams.get("category") &&
        (obj.params.category = searchParams.get("category"));
      searchParams.get("sort") && (obj.params._sort = "price");
      axios
        .get(
          `http://localhost:8080/api/products?_limit=4&_page=${page}`,
          obj
        )
        .then((res) => {
          setpro(res.data);
         
        })
        .catch((err) => console.log(err));
    };
    funProduct(page);
  }, [location.search, page]);

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={{ base: 3, md: 4 }}
        mt={{ base: 4, lg: "50px" }}
        mb={"50px"}
      >
        {pro.map((item) => (
          <Box
            key={item.id}
            border="1px solid #ccc"
            borderRadius="md"
            p={{ base: 3, md: 4 }}
            boxShadow="md"
            overflow="hidden"
            minW={0}
            transition="transform 0.2s"
            _hover={{ transform: { md: "scale(1.03)" } }}
          >
            <Image
              src={item.img}
              alt={item.desc || "product"}
              mb={2}
              w="100%"
              h={{ base: "180px", md: "210px" }}
              objectFit="cover"
              borderRadius="md"
              loading="lazy"
              decoding="async"
            />
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={2} noOfLines={2}>
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
            <Button
              mt={3}
              w="full"
              bg="#E07A2F"
              color="white"
              size="sm"
              _hover={{ bg: "#c96a26" }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              View Details
            </Button>
          </Box>
        ))}
      </Box>
      <Box mt={4} display="flex" justifyContent="center" mb={"50px"}>
        <Button
          colorScheme="teal"
          size="sm"
          mr={2}
          _hover={{ bgColor: "teal.500", color: "white" }}
          isDisabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Pre
        </Button>
        <Box
          colorScheme="teal"
          size="sm"
          variant="outline"
          mr={2}
          _hover={{ bgColor: "teal.500", color: "white" }}
        >
          {page}
        </Box>
        <Button
          colorScheme="teal"
          size="sm"
          _hover={{ bgColor: "teal.500", color: "white" }}
          onClick={() => setPage(page + 1)}
          isDisabled={page===5}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default MainProduct;
