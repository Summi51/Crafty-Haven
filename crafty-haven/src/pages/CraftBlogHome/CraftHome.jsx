import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import CraftSidebar from "./CraftSidebar";
const CraftHome = () => {
  return (
    <Box width={"80%"} m={"auto"}>
      <Box>
        <Text 
          fontSize={"30px"}
          fontWeight={"bold"}
          fontFamily={"heading"}
          color="#434343"
          fontStyle={"oblique"}
          mb={"50px"}
          pt={'50px'}
          textDecoration={'underline'}
        >
          The Top Craft Blogs, Websites & Best Crafting Bloggers To Follow
        </Text>
      </Box>

      <Flex justifyContent={'space-around'}>
        <Box>
          <Text fontSize={"20px"} textAlign={"left"} mb={"15px"}>
            I’m celebrating the fantastic and hard-working craft bloggers that
            give us so <br /> much inspiration and joy.
          </Text>
          <Box>
            <Image
              src="https://craftylikegranny.com/wp-content/uploads/2018/09/Top-100-Craft-Blogs-Crafty-Like-Granny.jpg"
              alt="blogpic"
            />
          </Box>
          <Text fontSize={"20px"} textAlign={"left"} mb={"15px"} mt={'50px'}>
            If you have a favorite Craft Blogger, good craft blog or Craft
            Website you’d like <br/> to support, vote for them. Don’t forget to let
            your favorite bloggers know you <br />voted for them. They’d be so pleased
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
