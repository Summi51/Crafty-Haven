import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImagesSingleCartMainContent from "./ImagesSingleCartMainContent";
import NewlyCollections from "./NewlyCollections";
import VideoPlayer from "./VideoPlayer";
import ContactForm from "./ContactForm";
const SingleCartMainContent = () => {
  const [singleblog, setsingleblog] = useState({});
  const params = useParams();
  // const [vali] = useState(val)

  const singleblogGet = (id) => {
    axios.get(`https://user-details-pww9.onrender.com/craftblogs/${id}`).then((data) => {
      console.log(data);
      return setsingleblog(data);
    });
  };
  useEffect(() => {
    singleblogGet(params.singleid);
  }, [params.singleid]);

  return (
    <Box pt={"50px"} w={"80%"} m={"auto"}>
      <Box mb={"20px"}>
        <Link href="/">
          <Image
            mx="auto"
            src="https://craftychica.com/wp-content/uploads/2023/03/chica-email-opt-in-button-jpeg.webp"
            alt="img"
          />
        </Link>
      </Box>
      <Box w={"80%"} m={"auto"} pb={"40px"} borderTop={"2px solid black"}>
        <hr />
      </Box>
      {/* <Text>{singleblog?.data?.title}</Text> */}
      <Flex justifyContent={"space-around"} w={"80%"} m={"auto"}>
        <Box w={"50%"} display={["none", "none", "block", "block"]}>
          <Image w={"95%"} src={singleblog?.data?.img} alt="img" />
        </Box>
        <Box
          borderLeft={"2px solid black"}
          display={["none", "none", "block", "block"]}
        >
          <hr />
        </Box>

        {/* // for small screen */}
        <Box>
          <Box
            w={"100%"}
            display={["block", "block", "none", "none"]}
            mb={"20px"}
          >
            <Image w={"95%"} src={singleblog?.data?.img} alt="img" />
          </Box>
          <Box display={["block", "block", "none", "none"]}>
            <Text
              fontSize={"20px"}
              fontWeight={"bold"}
              mb={"20px"}
              fontFamily={"cursive"}
              fontStyle={"oblique"}
            >
              {singleblog?.data?.title}
            </Text>
            <Text
              fontSize={"16px"}
              fontFamily={"heading"}
              color="#434343"
              fontStyle={"oblique"}
              textAlign={"left"}
            >
              <Text>{singleblog?.data?.desc}</Text>
            </Text>
          </Box>
        </Box>

        {/* 
Large screen */}
        <Box w={"40%"}>
          <Box>
            <Text
              fontSize={"27px"}
              fontWeight={"bold"}
              mb={"20px"}
              fontFamily={"cursive"}
              fontStyle={"oblique"}
              display={["none", "none", "block", "block"]}
            >
              {singleblog?.data?.title}
            </Text>
            <Text
              fontSize={"16px"}
              fontFamily={"heading"}
              color="#434343"
              fontStyle={"oblique"}
              textAlign={"left"}
              display={["none", "none", "block", "block"]}
            >
              <Text>{singleblog?.data?.desc}</Text>
            </Text>
          </Box>

          <Button
            color={"white"}
            backgroundColor={"teal"}
            mt={"20px"}
            display={["none", "none", "block", "block"]}
          >
            Read More
          </Button>
        </Box>
      </Flex>
      <Box w={"80%"} m={"auto"} pt={"40px"} borderBottom={"2px solid black"}>
        <hr />
      </Box>

      {/* large screen */}
      <Box display={["none", "none", "block", "block"]}>
        <Text
          textAlign={"center"}
          fontSize={"25px"}
          fontWeight={"bold"}
          mt={"20px"}
          fontFamily={"body"}
          fontStyle={"oblique"}
        >
          Welcome to Official site of artist, author, designer, & speaker etc.{" "}
          <Text as={"span"}>{singleblog?.data?.title}</Text> Mexican-inspired
          crafts, ceramics, creative motivation!
        </Text>
      </Box>

      {/* small screen */}
      <Box display={["block", "block", "none", "none"]}>
        <Text
          textAlign={"center"}
          fontSize={"15px"}
          fontWeight={"bold"}
          mt={"20px"}
          fontFamily={"body"}
          fontStyle={"oblique"}
        >
          Welcome to Official site of artist, author, designer, & speaker etc.{" "}
          <Text as={"span"}>{singleblog?.data?.title}</Text> Mexican-inspired
          crafts, ceramics, creative motivation!
        </Text>
      </Box>

      {/* small screen */}
      <Box
        w={"100%"}
        margin={"auto"}
        mt={"20px"}
        display={["block", "block", "none", "none"]}
        mb={"20px"}
      >
        <Image w={"100%"} src={singleblog?.data?.img1} />
      </Box>

      {/* large screen */}
      <Box mb={"20px"} display={["none", "none", "block", "block"]}>
        <Flex mx={"auto"} w={"80%"} justifyContent={"space-around"}>
          <Box w={"50%"} margin={"auto"} mt={"20px"}>
            <Image w={"100%"} src={singleblog?.data?.img1} />
          </Box>
          <Box w={"40%"} margin={"auto"}>
            <Box pb={"10px"}>
              <Image
                mt={"20px"}
                w={"50%"}
                src={
                  "https://craftychica.com/wp-content/uploads/2014/06/coffee-mug-planters1.jpg-300x191.jpg"
                }
              />
            </Box>
            <Box>
              <Image
                w={"50%"}
                src={
                  "https://craftychica.com/wp-content/uploads/2013/08/cactus-garden7-300x213.jpg"
                }
              />
            </Box>
          </Box>
        </Flex>
      </Box>

      <Box textAlign={"left"}>
        <Text
          fontSize={"16px"}
          fontFamily={"heading"}
          color="#434343"
          fontStyle={"oblique"}
          textAlign={"left"}
        >
          {singleblog?.data?.blog}
        </Text>
      </Box>

      <Box pt={"50px"}>
        <VideoPlayer />
      </Box>

      <Box>
        <ImagesSingleCartMainContent />
      </Box>
      <Box>
        <Text
          color={"#7F508B"}
          backgroundImage={"linear-gradient(pink, white, #9797ED, lightblue)"}
          mx={"auto"}
          fontFamily={"Tangerine, cursive"}
          textDecoration={"underline double 1px"}
          fontStyle={"italic"}
          fontSize={"35px"}
          fontWeight={"bold"}
        >
          Newly Collections
        </Text>

        <NewlyCollections />
        <ContactForm/>
      </Box>
    </Box>
  );
};

export default SingleCartMainContent;

// {

// }
