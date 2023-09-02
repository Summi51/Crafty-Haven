import { Box, Flex, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import CraftyHaven from "../Image/CraftyHaven.png";
const Footer = () => {
  return (
    <Box
      width={"100%"}
      backgroundColor={"#8C67E6"}
      // mt={"30px"}
      pt={"30px"}
      backgroundImage={"linear-gradient(pink, #FFEBFF, white)"}
    >
      <SimpleGrid color={"#7F508B"} columns={[1, 2, 3, 4]} fontWeight={"bold"}>
        <Text>COMPANY</Text>
        <Text>PRODUCTS</Text>
        <Text>RESOURCES</Text>
        <Text>SOCIAL</Text>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2, 3, 4]} pt={"30px"}>
        <Link href="About Us">About Us</Link>
        <Link href="Content Reader">Content Reader</Link>
        <Link href="Blog">Blog</Link>
        <Link href=" Twitter"> Twitter</Link>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2, 3, 4]} pt={"10px"}>
        <Link href="Our Data">Our Data</Link>
        <Link href="Brand Monitoring">Brand Monitoring</Link>
        <Link href="Video Tutorials">Video Tutorials</Link>
        <Link href="Facebook">Facebook</Link>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2, 3, 4]} pt={"10px"}>
        <Link href="Careers ">Careers</Link>
        <Link href="Media Contact Database">Media Contact Database</Link>
        <Link href="Product Development Blog">Product Development Blog</Link>
        <Link href="Instagram">Instagram</Link>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2, 3, 4]} pt={"10px"}>
        <Link href="Customers">Customers</Link>
        <Link href="Publisher">Publisher</Link>
        <Link href="Knowledge Base">Knowledge Base</Link>
        <Link href="Pinterest">Pinterest</Link>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2, 3, 4]} pt={"15px"}>
        <Flex justifyContent={"space-evenly"} mt={"20px"}>
          <Flex>
            <Box>
              <FaTwitter color="1DA1F2" fontSize={"30px"} />
            </Box>
            <Box>
              <FaYoutube color="red" fontSize={"30px"} />
            </Box>
            <Box>
              <FaFacebookF color="blue" fontSize={"30px"} />
            </Box>
            <Box>
              <FaInstagram color="red" fontSize={"30px"} />
            </Box>
          </Flex>
        </Flex>
        <Box display={["none", "none", "none", "block"]}>
          <Image w={200} h={50} src={CraftyHaven} alt="logo" />
        </Box>
      </SimpleGrid>

      <Box pb={"20px"} mt={"20px"} fontWeight={"bold"} color={"#7F508B"}>
        © 2023 CraftyHaven
      </Box>
    </Box>
  );
};

export default Footer;
