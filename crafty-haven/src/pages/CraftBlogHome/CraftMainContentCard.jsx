import { Box, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

const CraftMainContentCard = ({ title, img, desc, img1, blog, link }) => {
  return (
    <Box
      borderRadius="lg"
      m={"auto"}
      w={{ base: "100%", md: "80%" }}
      overflow="hidden"
      alignItems={"flex-start"}
      pt={"20px"}
    >
      <Box
        fontSize={{ base: "22px", md: "32px" }}
        textAlign={"left"}
        mb={"15px"}
        mt={{ base: 6, md: "50px" }}
        color={"blue"}
        textDecoration={"underline 1px blue"}
        fontFamily={"heading"}
        fontStyle={"italic"}
      >
        <Link href={link}>
          <Text>{title}</Text>
        </Link>
      </Box>
      <Box>
        <Image
          src={img}
          alt={title || "craft"}
          w={{ base: "100%", md: "60%" }}
          maxH="320px"
          objectFit="cover"
          m="auto"
          loading="lazy"
          decoding="async"
        />
      </Box>
      <Box fontSize={{ base: "16px", md: "20px" }} textAlign={"left"} mb={{ base: 6, md: "50px" }} mt={{ base: 6, md: "50px" }}>
        <Text>{desc}</Text>
      </Box>
      <Box>
        <Image
          src={img1}
          alt={title || "craft extra"}
          w="100%"
          maxH="360px"
          objectFit="cover"
          loading="lazy"
          decoding="async"
        />
      </Box>
      <Box fontSize={{ base: "16px", md: "20px" }} textAlign={"left"} mb={"15px"} mt={{ base: 6, md: "50px" }}>
        <Text>{blog}</Text>
      </Box>
    </Box>
  );
};

export default CraftMainContentCard;
