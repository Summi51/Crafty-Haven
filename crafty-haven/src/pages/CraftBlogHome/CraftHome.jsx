import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import CraftSidebar from "./CraftSidebar";
const CraftHome = () => {
  return (
    <Box width={{ base: "92%", md: "80%" }} m={"auto"}>
      <Box>
        <Text
          fontSize={{ base: "22px", md: "30px" }}
          fontWeight={"bold"}
          fontFamily={"heading"}
          color="#434343"
          fontStyle={"oblique"}
          mb={{ base: 6, md: "50px" }}
          pt={{ base: 6, md: "50px" }}
          textDecoration={'underline'}
        >
          The Top Craft Blogs, Websites & Best Crafting Bloggers To Follow
        </Text>
      </Box>

      <Flex
        justifyContent={'space-around'}
        direction={{ base: "column", lg: "row" }}
        gap={6}
      >
        <Box flex="1" minW={0}>
          <Text fontSize={{ base: "16px", md: "20px" }} textAlign={"left"} mb={"15px"}>
            I’m celebrating the fantastic and hard-working craft bloggers that
            give us so much inspiration and joy.
          </Text>
          <Box>
            <Image
              src="https://craftylikegranny.com/wp-content/uploads/2018/09/Top-100-Craft-Blogs-Crafty-Like-Granny.jpg"
              alt="blogpic"
              w="100%"
              maxH="360px"
              objectFit="cover"
              loading="lazy"
              decoding="async"
            />
          </Box>
          <Text fontSize={{ base: "16px", md: "20px" }} textAlign={"left"} mb={"15px"} mt={{ base: 6, md: "50px" }}>
            If you have a favorite Craft Blogger, good craft blog or Craft
            Website you’d like to support, vote for them. Don’t forget to let
            your favorite bloggers know you voted for them. They’d be so pleased
            🙂
          </Text>
        </Box>
        <Box>
          <CraftSidebar />
        </Box>
      </Flex>
    </Box>
  );
};

export default CraftHome;
