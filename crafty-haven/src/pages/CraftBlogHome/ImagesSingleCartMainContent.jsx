import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import SliderImages from "./SliderImages";

const ImagesSingleCartMainContent = () => {
  return (
    <Box>
      <Box mt={"50px"} textAlign={"center"} mb={"50px"}>
        <Box w={"100%"} m={"auto"} borderTop={"2px solid black"}>
          <hr />
        </Box>
        <Box>
          <Text fontSize={"30px"} fontWeight={"bold"} mt={"20px"}>
            Most Loved Crafts
          </Text>
          <Text fontSize={"19px"} m={"20px"}>
            The most loved Crafty Chica projects ranked high among readers!
          </Text>
        </Box>

        <SimpleGrid gap={"20px"} columns={[1, 2, 4, 5]}>
          <Box>
            <Image
              w={"100%"}
              src="https://craftychica.com/wp-content/uploads/2013/06/crafty-chica-handbuilt-mugs-5-300x195.jpg"
              alt="img1"
            />
          </Box>

          <Box>
            <Image
              src="https://craftychica.com/wp-content/uploads/2015/05/stamped-mugs890-300x225.jpg"
              alt="img5"
            />
          </Box>

          <Box>
            <Image
              src="https://craftychica.com/wp-content/uploads/2014/06/tie_dye_heart9.jpg-300x200.jpg"
              alt="img3"
            />
          </Box>

          <Box>
            <Image
              src="https://craftychica.com/wp-content/uploads/2023/04/low-fire-clay2-300x200.webp"
              alt="img4"
            />
          </Box>

          <Box>
            <Image
              src="https://craftychica.com/wp-content/uploads/2015/02/chips-3pp_w637_h425-300x200.jpg"
              alt="img4"
            />
          </Box>
        </SimpleGrid>
        <Box w={"100%"} m={"auto"} pt={"40px"} borderBottom={"2px solid black"}>
          <hr />
        </Box>

        {/* 2nd */}
        <SliderImages />

        <Box mt={"50px"} textAlign={"center"} mb={"50px"}>
          <Box w={"100%"} m={"auto"} borderTop={"2px solid black"}>
            <hr />
          </Box>
          <Box>
            <Text fontSize={"30px"} fontWeight={"bold"} mt={"20px"}>
            Celebrating Crafy Days
            </Text>
            <Text fontSize={"19px"} m={"20px"}>
            Projects and ideas to celebrate the life and style.
            </Text>
          </Box>

          <SimpleGrid gap={"20px"} columns={[1, 2, 4, 5]}>
            <Box>
              <Image
                w={"100%"}
                src="https://flamingotoes.com/wp-content/uploads/2021/03/Large-Zipper-Project-Bag-500x399_c.jpg"
                alt="img1"
              />
            </Box>

            <Box>
              <Image
                src="https://flamingotoes.com/wp-content/uploads/2018/03/Stardust-Fat-Quarter-Bundle-500x399_c.jpg"
                alt="img5"
              />
            </Box>

            <Box>
              <Image
                src="https://flamingotoes.com/wp-content/uploads/2018/03/Swinging-on-a-Star-Quilt-Pattern-Design-500x399_c.jpg"
                alt="img3"
              />
            </Box>

            <Box>
              <Image
                src="https://flamingotoes.com/wp-content/uploads/2021/03/B1560_01-500x399_c.jpg"
                alt="img4"
              />
            </Box>

            <Box>
              <Image
                src="https://flamingotoes.com/wp-content/uploads/2020/09/Hand-Embroidered-Flowers-500x399_c.jpg"
                alt="img4"
              />
            </Box>
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
