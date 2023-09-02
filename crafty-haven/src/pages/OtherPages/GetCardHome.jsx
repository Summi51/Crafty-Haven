import { Box, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

const GetCardHome = ({ img, blog, desc, link }) => {
  return (
    <Box
      borderRadius="lg"
      m={"auto"}
      w={"100%"}
      overflow="hidden"
      alignItems={"flex-start"}
      pt={"50px"}
    >
      <Box pl={"35%"}>
        <Image w={"40%"} src={img} alt="img" />
      </Box>

      <Box p="4">
        <Text
          fontWeight="bold"
          fontSize="lg"
          mb="2"
          color={"#7F508B"}
          textDecoration={"underline double 1px"}
        >
          {desc}
        </Text>
        <Box width={"60%"} m={"auto"} textAlign={"left"}>
          <Text fontSize="sm">
            {blog}
            <Text as={"span"}>
              <Link textDecoration={"none"} href={link}>
                <Text
                  color={"#7F508B"}
                  textDecoration={"underline double 1px"}
                  fontWeight={"bold"}
                >
                  See More...
                </Text>
              </Link>
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default GetCardHome;
