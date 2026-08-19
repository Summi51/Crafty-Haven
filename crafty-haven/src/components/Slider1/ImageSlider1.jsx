import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Image, Text } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "./styles.css";
const ImageSlider1 = () => {
  return (
    <>
      <Text
        mt={{ base: 8, md: "50px" }}
        color={"#7F508B"}
        backgroundImage={"linear-gradient(pink, #9797ED)"}
        fontFamily={"Tangerine, cursive"}
        textDecoration={"underline double 1px"}
        fontStyle={"italic"}
        fontSize={{ base: "28px", md: "50px" }}
        fontWeight={"bold"}
        textAlign="center"
        px={3}
      >
       Where Reality Meets Magic
      </Text>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {[
          "https://swiperjs.com/demos/images/nature-1.jpg",
          "https://swiperjs.com/demos/images/nature-2.jpg",
          "https://swiperjs.com/demos/images/nature-3.jpg",
          "https://swiperjs.com/demos/images/nature-4.jpg",
        ].map((src, index) => (
          <SwiperSlide key={src}>
            <Image
              src={src}
              alt={`craft slide ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider1;
