import React from "react";
// Import Swiper React components
import { Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../../Image/img1.jpg";
import img3 from "../../Image/img3.jpg";
import img6 from "../../Image/img6.jpg";
import img8 from "../../Image/img8.jpg";
import img9 from "../../Image/img9.jpg";
import "../Slider2/styles.css";
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
const ImageSlider2 = () => {
  return (
    <Box w={"100%"} h={"100%"} >
      <Swiper
        slidesPreView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Autoplay, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={img1} w={"100%"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img3} w={"100%"} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img6} w={"100%"}/>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img8} w={"100%"}/>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img9} w={"100%"} />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default ImageSlider2;
