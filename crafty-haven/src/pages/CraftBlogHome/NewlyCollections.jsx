import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import React from "react";

const collections = [
  "https://i.ytimg.com/vi/-ZKzfLTTdU8/maxresdefault.jpg",
  "https://diyjoy.com/wp-content/uploads/2020/01/paper-rose-mobile-1.jpg",
  "https://popitout.in/cdn/shop/products/1_6_9a1ff9a0-5684-4293-831c-9ff85ce6e059.jpg?v=1639656601",
  "https://gingercup.com/blog/wp-content/uploads/2018/04/coffee-cup-art.jpg",
  "https://diyjoy.com/wp-content/uploads/2021/04/paint-wine-bottle-1.jpg",
  "https://i.pinimg.com/736x/75/e8/23/75e823578e82d1e6496fe8c67c8ac9d2.jpg",
];

const NewlyCollections = () => {
  return (
    <>
      <SimpleGrid
        pt={"50px"}
        pb={"50px"}
        w={"100%"}
        gap={"10px"}
        m={"auto"}
        columns={{ base: 1, sm: 2, md: 3 }}
      >
        {collections.map((src) => (
          <Box key={src} overflow="hidden">
            <Image
              boxSize="200px"
              objectFit="cover"
              mx="auto"
              w="100%"
              src={src}
              alt="new collection"
              loading="lazy"
              decoding="async"
            />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default NewlyCollections;
