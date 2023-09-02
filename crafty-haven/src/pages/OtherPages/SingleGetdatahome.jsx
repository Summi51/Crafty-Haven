import { Box, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SingleGetdatahome = () => {
  const [singleHome, setSingleHome] = useState({});
  const params = useParams();

  const getHomeFn = (id) => {
    axios
      .get(`https://user-details-pww9.onrender.com/crafty/${id}`)
      .then((data) => {
        //  console.log(data.data);
        return setSingleHome(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getHomeFn(params.getid);
  }, [params.getid]);

  return (
    <Box
      m={"auto"}
      p={"50px"}
      alignItems={"center"}
      w={"100%"}
      display="flex" /* Add this line */
      flexDirection="column" /* Add this line */
    >
      <Box mx={"auto"}>
        <Image w={"220px"} src={singleHome?.data?.img} alt="img" />
      </Box>
      <Box p="4">
        <Text
          fontWeight="bold"
          fontSize="lg"
          mb="2"
          color={"#7F508B"}
          textDecoration={"underline double 1px"}
        >
          {singleHome?.data?.desc}
        </Text>
      </Box>
      <Box width={"60%"} m={"auto"} textAlign={"left"}>
        <Text fontSize="sm">{singleHome?.data?.blog}</Text>
      </Box>
    </Box>
  );
};

export default SingleGetdatahome;
