import { Box, Image, Link, SimpleGrid, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

const recommended = [
  {
    src: "https://craftylikegranny.com/wp-content/uploads/2023/06/Img-Of-Autumnal-Yarn-Balls-In-A-Wooden-Bowl-1536x875.jpg",
    title: "The Crafter’s Guide To Choosing The Ideal Sweater Yarn",
  },
  {
    src: "https://craftylikegranny.com/wp-content/uploads/2023/06/Img-Of-Pastel-And-Warm-Color-Yarns-In-A-Metal-Bowl-1536x875.jpg",
    title: "Discovering Hat Yarn: Your Ultimate Yarns Guide To Yarn For Hats",
  },
  {
    src: "https://craftylikegranny.com/wp-content/uploads/2023/06/Img-Of-Chunky-Pink-Balls-Of-Yarn-On-A-Blanket-1536x875.jpg",
    title: "Your Ultimate Guide To Choosing The Perfect Blanket Yarn For Blankets",
  },
  {
    src: "https://craftylikegranny.com/wp-content/uploads/2023/06/Img-Of-Balls-Of-Yarn-In-A-Woven-Basket-In-Soft-Lighting-1536x875.jpg",
    title: "Making A Yarn Scarf: A Scarf Yarn Guide For Crafting Gorgeous Scarves",
  },
];

const CraftSidebar = () => {
  const showSidebar = useBreakpointValue({ base: false, lg: true });
  if (!showSidebar) return null;

  return (
    <Box m={'auto'} w={'80%'}>
      <Box>
        <Text fontSize={"20px"} mb={"15px"} fontWeight={"bold"} color="#434343">
          Recommended
        </Text>
      </Box>
      <SimpleGrid>
        {recommended.map((item) => (
          <Box key={item.src} mb={'20px'}>
            <Image
              w={200}
              h="120px"
              objectFit="cover"
              src={item.src}
              alt={item.title}
              loading="lazy"
              decoding="async"
            />
            <Link
              textDecoration={'underline 1px blue'}
              color={'blue'}
              fontSize={'18px'}
              href="/craftblog"
            >
              {item.title}
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CraftSidebar;
