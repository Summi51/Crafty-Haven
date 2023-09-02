import { Box, Text } from "@chakra-ui/react";
import React from "react";
const VideoPlayer = () => {
  return (
    <Box>
      <Box
        width={"80%"}
        m={"auto"}
        display={["none", "none", "block", "block"]}
      >
         <Box  width={'100%'} m={'auto'} textAlign={'center'}>
          <Text mt="30px" mb={'50px'}
            color={"#7F508B"}
            backgroundImage={"linear-gradient(pink, #9797ED)"}
            mx={'auto'}
            fontFamily={"Tangerine, cursive"}
            textDecoration={"underline double 1px"}
            fontStyle={"italic"}
            fontSize={"35px"}
            fontWeight={"bold"}
          >
            Art Telent
          </Text>
        </Box>
        <iframe
          mx="auto"
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/UO1qql_4WSA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      
        <Box  width={'100%'} m={'auto'} textAlign={'center'}>
          <Text mt="30px" mb={'50px'}
            color={"#7F508B"}
            backgroundImage={"linear-gradient(pink, #9797ED)"}
            mx={'auto'}
            fontFamily={"Tangerine, cursive"}
            textDecoration={"underline double 1px"}
            fontStyle={"italic"}
            fontSize={"35px"}
            fontWeight={"bold"}
          >
            Crafty Telent
          </Text>
        </Box>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/FI9bSab16A4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Box>

      {/* small screen */}
      <Box display={["block", "block", "none", "none"]}>
      <Box  width={'100%'} m={'auto'} textAlign={'center'}>
          <Text mt="30px" mb={'50px'}
            color={"#7F508B"}
            backgroundImage={"linear-gradient(pink, #9797ED)"}
            mx={'auto'}
            fontFamily={"Tangerine, cursive"}
            textDecoration={"underline double 1px"}
            fontStyle={"italic"}
            fontSize={"35px"}
            fontWeight={"bold"}
          >
            Art Telent
          </Text>
        </Box>
        <iframe
          mx="auto"
          width="250px"
          height="225px"
          src="https://www.youtube.com/embed/UO1qql_4WSA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <Box  width={'100%'} m={'auto'} textAlign={'center'}>
          <Text mt="50px" mb={'50px'}
            color={"#7F508B"}
            backgroundImage={"linear-gradient(pink, #9797ED)"}
            mx={'auto'}
            fontFamily={"Tangerine, cursive"}
            textDecoration={"underline double 1px"}
            fontStyle={"italic"}
            fontSize={"35px"}
            fontWeight={"bold"}
          >
            Crafty Telent
          </Text>
        </Box>
        <iframe
          width="250px"
          height="225px"
          src="https://www.youtube.com/embed/FI9bSab16A4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
