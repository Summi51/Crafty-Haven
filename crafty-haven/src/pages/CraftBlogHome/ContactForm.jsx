import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { VscSearch } from "react-icons/vsc";
import "./BtnSubscribe.css";
const ContactForm = () => {
  return (
    <Box
      backgroundColor={"#E8E8E8"}
      pt={"50px"}
      pb={"70px"}
      mb={"50px"}
      w={"100%"}
    >
      <Flex justifyContent={"space-around"}>
        <Box w={"30%"} display={["none", "none", "block", "block"]}>
          <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"left"}>
            Sign up for my weekly digest <br /> of crafty goodness. Insider{" "}
            <br /> VIP stuff you'll love!
          </Text>
        </Box>

        {/* small screen */}
        <Box w={"50%"} display={["block", "block", "none", "none"]}>
          <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"left"}>
            Search any things for my weekly digest of crafty goodness. Insider{" "}
            VIP stuff you'll love!
          </Text>
        </Box>

        <Box w={"58%"} display={["none", "none", "block", "block"]}>
          <Flex justifyContent={"space-evenly"}>
            <Box>
              <Input
                border={"2px solid blue"}
                placeholder="Enter Your Name"
                type="text"
              />
            </Box>
            <Box>
              <Input
                border={"2px solid blue"}
                placeholder="Enter Your Email"
                type="text"
              />
            </Box>
            <Box>
              <Button className="Btn"></Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex pt={"80px"} justifyContent={'center'} >
    
          <Input
            w={"50%"}
            border={"2px solid blue"}
            placeholder="Search..."
            type="text"
          />
   
        <Box border={'2px solid blue'} ml={'20px'} backgroundColor={'#1BBFAC'} color={'black'} fontWeight={'bold'} boxSize={'38px'} pt={'11px'} pl={'9px'} >
          <VscSearch />
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactForm;
