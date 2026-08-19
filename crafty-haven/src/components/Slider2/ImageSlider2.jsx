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
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const ImageSlider2 = () => {
  return (
    <Box w="100%" maxH={{ base: "220px", md: "420px" }} overflow="hidden">
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        pagination={true}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {[img1, img3, img6, img8, img9].map((src, index) => (
          <SwiperSlide key={src}>
            <Image
              src={src}
              w="100%"
              h={{ base: "220px", md: "420px" }}
              objectFit="cover"
              alt={`banner ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider2;
