import { Box, Text } from "@chakra-ui/react";
import React from "react";
const VideoPlayer = () => {
  return (
    <Box width={{ base: "94%", md: "80%" }} m="auto">
      <Box width="100%" m="auto" textAlign="center">
        <Text
          mt="30px"
          mb={{ base: 6, md: "50px" }}
          color={"#7F508B"}
          backgroundImage={"linear-gradient(pink, #9797ED)"}
          mx="auto"
          fontFamily={"Tangerine, cursive"}
          textDecoration={"underline double 1px"}
          fontStyle={"italic"}
          fontSize={{ base: "26px", md: "35px" }}
          fontWeight={"bold"}
        >
          Art Telent
        </Text>
      </Box>
      <Box as="iframe"
        title="YouTube video player"
        src="https://www.youtube.com/embed/UO1qql_4WSA"
        w="100%"
        h={{ base: "220px", md: "315px" }}
        border="0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      <Box width="100%" m="auto" textAlign="center">
        <Text
          mt="30px"
          mb={{ base: 6, md: "50px" }}
          color={"#7F508B"}
          backgroundImage={"linear-gradient(pink, #9797ED)"}
          mx="auto"
          fontFamily={"Tangerine, cursive"}
          textDecoration={"underline double 1px"}
          fontStyle={"italic"}
          fontSize={{ base: "26px", md: "35px" }}
          fontWeight={"bold"}
        >
          Crafty Telent
        </Text>
      </Box>
      <Box as="iframe"
        title="YouTube video player"
        src="https://www.youtube.com/embed/FI9bSab16A4"
        w="100%"
        h={{ base: "220px", md: "315px" }}
        border="0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </Box>
  );
};

export default VideoPlayer;
