import { Box, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GetCardHome from "./GetCardHome";

const Getdatahome = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get(`http://localhost:8080/api/crafty`).then((res) => {
      setData((res.data || []).slice(0, 6));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Text
        color={"#7F508B"}
        backgroundImage={"linear-gradient(pink, #9797ED)"}
        fontFamily={"Tangerine, cursive"}
        textDecoration={"underline double 1px"}
        fontStyle={"italic"}
        fontSize={{ base: "28px", md: "50px" }}
        px={3}
        textAlign="center"
        fontWeight={"bold"}
      >
       Unleashing Creativity through Craftsmanship
      </Text>
      <Box>
        {data.map((item) => {
          return (
            <GetCardHome
              key={item.id}
              img={item.img}
              desc={item.desc}
              link={`/gethome/${item.id}`}
              blog={item.blog}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Getdatahome;
