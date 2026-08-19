import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import MainProduct from "./BuyProductOnline/MainProduct";
import Sidebar from "./BuyProductOnline/Sidebar";

const Product = () => {
  return (
    <Box width={{ base: "94%", md: "90%" }} maxW="1200px" m="auto" px={{ base: 1, md: 0 }}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align="flex-start"
        gap={{ base: 4, lg: 8 }}
      >
        <Box w={{ base: "100%", lg: "260px" }} flexShrink={0}>
          <Sidebar />
        </Box>
        <Box flex="1" w="100%" minW={0}>
          <MainProduct />
        </Box>
      </Flex>
    </Box>
  );
};

export default Product;
