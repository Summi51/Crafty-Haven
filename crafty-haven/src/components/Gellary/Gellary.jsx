import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const galleryImages = [
  "https://t4.ftcdn.net/jpg/02/90/76/83/360_F_290768326_SN1iziM2epjEjSGLDuKHAe7k5Mb37rWP.jpg",
  "https://st2.depositphotos.com/1737105/9514/i/600/depositphotos_95146634-stock-photo-arts-and-craft-supplies-for.jpg",
  "https://thumbs.dreamstime.com/b/art-6260031.jpg",
  "https://img.freepik.com/premium-photo/portrait-painting-beautiful-woman-artistic-illustration-beautiful-girl_769803-183.jpg",
  "https://img.freepik.com/premium-photo/generative-ai-abstract-human-face-cubic-3d-render-artificial-intelligence-deep-learning_108985-922.jpg?w=360",
  "https://m.media-amazon.com/images/I/81aY0IpjmhL.jpg",
];

const Gellary = () => {
  return (
    <Box px={{ base: 3, md: 4 }}>
      <Text
        color={"#7F508B"}
        backgroundImage={"linear-gradient(pink, #9797ED)"}
        fontFamily={"Tangerine, cursive"}
        textDecoration={"underline double 1px"}
        fontStyle={"italic"}
        fontSize={{ base: "28px", md: "50px" }}
        fontWeight={"bold"}
        textAlign="center"
      >
        Handmade Greeting Cards
      </Text>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        gap={"20px"}
        mt={{ base: 6, md: "50px" }}
      >
        {galleryImages.map((src) => (
          <Box key={src} overflow="hidden" borderRadius="md">
            <Image
              w="100%"
              h={{ base: "200px", md: "220px" }}
              objectFit="cover"
              src={src}
              alt="handmade craft"
              loading="lazy"
              decoding="async"
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Gellary;
