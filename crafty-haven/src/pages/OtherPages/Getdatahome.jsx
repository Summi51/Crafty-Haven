import { Box, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GetCardHome from "./GetCardHome";

const Getdatahome = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get(`https://user-details-pww9.onrender.com/crafty`).then((res) => {
      console.log(res.data);
      setData(res.data);
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
        fontSize={"50px"}
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
