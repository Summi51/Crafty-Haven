import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import SliderImages from "./SliderImages";

const lovedCrafts = [
  "https://craftychica.com/wp-content/uploads/2013/06/crafty-chica-handbuilt-mugs-5-300x195.jpg",
  "https://craftychica.com/wp-content/uploads/2015/05/stamped-mugs890-300x225.jpg",
  "https://craftychica.com/wp-content/uploads/2014/06/tie_dye_heart9.jpg-300x200.jpg",
  "https://craftychica.com/wp-content/uploads/2023/04/low-fire-clay2-300x200.webp",
];

const celebrateCrafts = [
  "https://flamingotoes.com/wp-content/uploads/2021/03/Large-Zipper-Project-Bag-500x399_c.jpg",
  "https://flamingotoes.com/wp-content/uploads/2018/03/Stardust-Fat-Quarter-Bundle-500x399_c.jpg",
  "https://flamingotoes.com/wp-content/uploads/2018/03/Swinging-on-a-Star-Quilt-Pattern-Design-500x399_c.jpg",
  "https://flamingotoes.com/wp-content/uploads/2020/09/Hand-Embroidered-Flowers-500x399_c.jpg",
];

const ImagesSingleCartMainContent = () => {
  return (
    <Box px={{ base: 3, md: 0 }}>
      <Box mt={{ base: 8, md: "50px" }} textAlign={"center"} mb={"50px"}>
        <Box w={"100%"} m={"auto"} borderTop={"2px solid black"}>
          <hr />
        </Box>
        <Box>
          <Text fontSize={{ base: "22px", md: "30px" }} fontWeight={"bold"} mt={"20px"}>
            Most Loved Crafts
          </Text>
          <Text fontSize={{ base: "16px", md: "19px" }} m={"20px"}>
            The most loved Crafty Chica projects ranked high among readers!
          </Text>
        </Box>

        <SimpleGrid gap={"20px"} columns={{ base: 1, sm: 2, md: 4 }}>
          {lovedCrafts.map((src) => (
            <Image
              key={src}
              w="100%"
              h="160px"
              objectFit="cover"
              src={src}
              alt="loved craft"
              loading="lazy"
              decoding="async"
            />
          ))}
        </SimpleGrid>
        <Box w={"100%"} m={"auto"} pt={"40px"} borderBottom={"2px solid black"}>
          <hr />
        </Box>

        <SliderImages />

        <Box mt={"50px"} textAlign={"center"} mb={"50px"}>
          <Box w={"100%"} m={"auto"} borderTop={"2px solid black"}>
            <hr />
          </Box>
          <Box>
            <Text fontSize={{ base: "22px", md: "30px" }} fontWeight={"bold"} mt={"20px"}>
            Celebrating Crafy Days
            </Text>
            <Text fontSize={{ base: "16px", md: "19px" }} m={"20px"}>
            Projects and ideas to celebrate the life and style.
            </Text>
          </Box>

          <SimpleGrid gap={"20px"} columns={{ base: 1, sm: 2, md: 4 }}>
            {celebrateCrafts.map((src) => (
              <Image
                key={src}
                w="100%"
                h="160px"
                objectFit="cover"
                src={src}
                alt="craft day"
                loading="lazy"
                decoding="async"
              />
            ))}
          </SimpleGrid>
          <Box
            w={"100%"}
            m={"auto"}
            pt={"40px"}
            borderBottom={"2px solid black"}
          >
            <hr />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImagesSingleCartMainContent;
