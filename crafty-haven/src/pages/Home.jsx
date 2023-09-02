import { Box } from "@chakra-ui/react";
import React from "react";
import Gellary from "../components/Gellary/Gellary";
import ImageSlider1 from "../components/Slider1/ImageSlider1";
import ImageSlider2 from "../components/Slider2/ImageSlider2";
import Getdatahome from "./OtherPages/Getdatahome";

const Home = () => {
  return (
    <Box>
      <ImageSlider2 />
      <Getdatahome />
      <Gellary />
      <ImageSlider1 />
    </Box>
  );
};

export default Home;
