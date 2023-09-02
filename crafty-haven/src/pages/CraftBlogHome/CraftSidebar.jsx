import { Box, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
const CraftSidebar = () => {
  return (
    <Box m={'auto'} w={'80%'} display={["none", "none", "none", "block"]}>
      <Box>
        <Text fontSize={"20px"} mb={"15px"} fontWeight={"bold"} color="#434343">
          Recommended
        </Text>
      </Box>
      {/* column={[1, 1, 2, 2]} */}
      <SimpleGrid >
        <Box mb={'20px'}>
          <Box>
            <Image 
              w={200} 
              src="https://craftylikegranny.com/wp-content/uploads/2023/06/Img-Of-Autumnal-Yarn-Balls-In-A-Wooden-Bowl-1536x875.jpg"
              alt="img1"
            />
          </Box>
          <Box>
            <Link textDecoration={'underline 1px blue'} color={'blue'} fontSize={'20px'}  href="The Crafter’s Guide To Choosing The Ideal Sweater Yarn For Sweaters">
              The Crafter’s Guide To <br/> Choosing The Ideal <br/> Sweater Yarn 
              
            </Link>
          </Box>
        </Box>
        <Box mb={'20px'}>
          <Box>
            <Image
              w={200}
              src="https://craftylikegranny.com/wp-content/uploads/2023/06/Img-Of-Pastel-And-Warm-Color-Yarns-In-A-Metal-Bowl-1536x875.jpg"
              alt="img"
            />
          </Box>
          <Box>
            <Link textDecoration={'underline 1px blue'} color={'blue'} fontSize={'20px'} href="The Crafter’s Guide To Choosing The Ideal Sweater Yarn For Sweaters">
            Discovering Hat Yarn: <br /> Your  Ultimate Yarns <br /> Guide To Yarn For Hats
            </Link>
          </Box>
        </Box>
        <Box mb={'20px'}>
          <Box>
            <Image
              w={200}
              src="https://craftylikegranny.com/wp-content/uploads/2023/06/Img-Of-Chunky-Pink-Balls-Of-Yarn-On-A-Blanket-1536x875.jpg"
              alt=""
            />
          </Box>
          <Box>
            <Link textDecoration={'underline 1px blue'} color={'blue'} fontSize={'20px'} href="The Crafter’s Guide To Choosing The Ideal Sweater Yarn For Sweaters">
            Your Ultimate Guide To <br/> Choosing The Perfect Blanket <br/> Yarn For Blankets
            </Link>
          </Box>
        </Box>
        <Box mb={'20px'}>
          <Box>
            <Image
              w={200}
              src="https://craftylikegranny.com/wp-content/uploads/2023/06/Img-Of-Balls-Of-Yarn-In-A-Woven-Basket-In-Soft-Lighting-1536x875.jpg"
              alt=""
            />
          </Box>
          <Box>
            <Link textDecoration={'underline 1px blue'} color={'blue'} fontSize={'20px'} href="The Crafter’s Guide To Choosing The Ideal Sweater Yarn For Sweaters">
            Making A Yarn Scarf: <br/> A Scarf Yarn Guide For <br/> Crafting Gorgeous Scarves
            </Link>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default CraftSidebar;
