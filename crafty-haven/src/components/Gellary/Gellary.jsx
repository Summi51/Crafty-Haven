import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Gellary = () => {
  return (
    <Box>
      <Text
        color={"#7F508B"}
        backgroundImage={"linear-gradient(pink, #9797ED)"}
        fontFamily={"Tangerine, cursive"}
        textDecoration={"underline double 1px"}
        fontStyle={"italic"}
        fontSize={"50px"}
        fontWeight={"bold"}
      >
        Handmade Greeting Cards
      </Text>

      <SimpleGrid
        columns={[1, 2, 3, 4]}
        gap={"20px"}
        mt={"50px"}
      >
      
        <Box>
          <Image
            w={"100%"}
            src="https://www.shutterstock.com/shutterstock/photos/1648769173/display_1500/stock-photo-craft-sign-with-various-art-and-craft-supplies-play-dough-letters-1648769173.jpg"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://t4.ftcdn.net/jpg/02/90/76/83/360_F_290768326_SN1iziM2epjEjSGLDuKHAe7k5Mb37rWP.jpg"
          />
        </Box>

        <Box>
          <Image src="https://st2.depositphotos.com/1737105/9514/i/600/depositphotos_95146634-stock-photo-arts-and-craft-supplies-for.jpg" />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://thumbs.dreamstime.com/b/art-6260031.jpg"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://img.freepik.com/premium-photo/portrait-painting-beautiful-woman-artistic-illustration-beautiful-girl_769803-183.jpg"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://img.freepik.com/premium-photo/colorful-painting-beautiful-woman-s-face-portrait-beautiful-woman_769803-485.jpg?w=2000"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://img.freepik.com/premium-photo/artistic-portrait-beautiful-woman_769803-214.jpg?w=2000"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://img.freepik.com/premium-photo/artistic-portrait-beautiful-woman-surrounded-by-flowers-portrait-beautiful-girl_769803-240.jpg?w=2000"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://img.freepik.com/premium-photo/generative-ai-abstract-human-face-cubic-3d-render-artificial-intelligence-deep-learning_108985-922.jpg?w=360"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://m.media-amazon.com/images/I/81aY0IpjmhL.jpg"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://img.freepik.com/premium-photo/woman-s-face-is-made-up-geometric-shapes-cyberpunk-colorful-fractalism-cubism_834088-1.jpg"
          />
        </Box>

        <Box>
          <Image
            w={"100%"}
            src="https://img.freepik.com/premium-photo/digital-art-selected_447899-7142.jpg"
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Gellary;
