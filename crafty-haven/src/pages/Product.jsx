import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import MainProduct from "./BuyProductOnline/MainProduct";
import Sidebar from "./BuyProductOnline/Sidebar";

const Product = () => {
  return (
    <Box width={"90%"} m={"auto"}>
      <Flex justify="space-between">
        <Box flex="0 0 25%">
          <Sidebar />
        </Box>
        <Box flex="1">
          <MainProduct />
        </Box>
      </Flex>
    </Box>
  );
};

export default Product;
