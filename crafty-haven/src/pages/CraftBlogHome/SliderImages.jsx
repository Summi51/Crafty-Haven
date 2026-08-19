import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Box, Image } from "@chakra-ui/react";
import { EffectCube, Pagination } from "swiper/modules";

const sliderGroups = [
  [
    "https://i.etsystatic.com/45294190/r/il/fcfbe7/5156274097/il_fullxfull.5156274097_d1a4.jpg",
    "https://i.ytimg.com/vi/CPiaNRth2ys/maxresdefault.jpg",
    "https://i.pinimg.com/736x/92/6c/7e/926c7e8ccb508f7bee83edb297afb6ff.jpg",
  ],
  [
    "https://m.media-amazon.com/images/I/71OLE0xb6nL._AC_UF894,1000_QL80_.jpg",
    "https://www.htconline.in/images/thumbs/0032648_htc-wooden-craft-butterfly-design-small-9pcs_600.jpeg",
    "https://m.media-amazon.com/images/I/71E3PgTCCeL.jpg",
  ],
];

const SliderImages = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
      gap={6}
      px={{ base: 3, md: 0 }}
    >
      {sliderGroups.map((group) => (
        <Box key={group[0]} w={{ base: "80%", sm: "45%", md: "28%" }} maxW="240px">
          <Swiper
            effect={"cube"}
            grabCursor={true}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            pagination={true}
            modules={[EffectCube, Pagination]}
            className="mySwiper"
          >
            {group.map((src, index) => (
              <SwiperSlide key={src}>
                <Image
                  src={src}
                  alt="loved craft"
                  w="100%"
                  h="180px"
                  objectFit="cover"
                  loading={index === 0 ? "lazy" : "lazy"}
                  decoding="async"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ))}
    </Box>
  );
};

export default SliderImages;
