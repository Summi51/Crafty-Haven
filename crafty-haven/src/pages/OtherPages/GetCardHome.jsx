import { Box, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

const GetCardHome = ({ img, blog, desc, link }) => {
  return (
    <Box
      borderRadius="lg"
      m={"auto"}
      w={{ base: "92%", md: "80%", lg: "70%" }}
      overflow="hidden"
      alignItems={"flex-start"}
      pt={{ base: "28px", md: "50px" }}
    >
      <Box>
        <Image
          w={{ base: "100%", sm: "70%", md: "40%" }}
          maxH="280px"
          objectFit="cover"
          m="auto"
          src={img}
          alt={desc || "craft"}
          loading="lazy"
          decoding="async"
        />
      </Box>

      <Box p={{ base: 3, md: 4 }}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "md", md: "lg" }}
          mb="2"
          color={"#7F508B"}
          textDecoration={"underline double 1px"}
        >
          {desc}
        </Text>
        <Box width={{ base: "100%", md: "80%" }} m={"auto"} textAlign={"left"}>
          <Text fontSize="sm" noOfLines={{ base: 5, md: 8 }}>
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
