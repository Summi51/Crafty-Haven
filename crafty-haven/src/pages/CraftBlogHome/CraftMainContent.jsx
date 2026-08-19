import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CraftMainContentCard from "./CraftMainContentCard";
const CraftMainContent = () => {
  const [craft, setCraft] = useState([]);

  const getCraft = () => {
    axios.get(`http://localhost:8080/api/craftblogs`).then((res) => {
      setCraft((res.data || []).slice(0, 8));
    });
  };
  useEffect(() => {
    getCraft();
  }, []);

  return (
    <Box w={{ base: "92%", md: "80%" }} mt={"50px"} m={"auto"}>
      <Box>
        <Text fontSize={"20px"} textAlign={"left"} mb={"15px"}>
          Here are the best craft blogs!
        </Text>
      </Box>
      <Box>
        {craft.map((item) => {
          return (
            <CraftMainContentCard
              title={item.title}
              img={item.img}
              desc={item.desc}
              link={`/craftblog/${item.id}`}
              img1={item.img1}
              blog={item.blog}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CraftMainContent;
