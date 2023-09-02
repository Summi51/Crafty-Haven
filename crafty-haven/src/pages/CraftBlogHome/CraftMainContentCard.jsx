import { Box, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

const CraftMainContentCard = ({ title, img, desc, img1, blog, link }) => {
  return (
    <Box borderRadius="lg"
    m={"auto"}
    w={"80%"}
    overflow="hidden"
    alignItems={"flex-start"}
    pt={"20px"}>
      <Box
        fontSize={"32px"}
        textAlign={"left"}
        mb={"15px"}
        mt={"50px"}
        color={"blue"}
        textDecoration={"underline 1px blue"}
        fontFamily={"heading"}
        fontStyle={"italic"}
      >
        <Link href={link}>
          <Text>{title}</Text>
        </Link>
      </Box>
      <Box pl={"35%"}>
        <Image src={img} alt="img" />
      </Box>
      <Box fontSize={"20px"} textAlign={"left"} mb={"50px"} mt={'50px'}>
        <Text>{desc}</Text>
      </Box>
      <Box>
        <Image src={img1} alt="img1" />
      </Box>
      <Box fontSize={"20px"} textAlign={"left"} mb={"15px"} mt={'50px'}>
        <Text>{blog}</Text>
      </Box>
    </Box>
  );
};

export default CraftMainContentCard;
