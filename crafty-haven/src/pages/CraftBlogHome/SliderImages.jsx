import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Box, Image, Text } from "@chakra-ui/react";
import { EffectCube, Pagination } from "swiper/modules";

const SliderImages = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Box w={"20%"}>
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
          <SwiperSlide>
            <Image src="https://i.etsystatic.com/45294190/r/il/fcfbe7/5156274097/il_fullxfull.5156274097_d1a4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.ytimg.com/vi/CPiaNRth2ys/maxresdefault.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.pinimg.com/736x/92/6c/7e/926c7e8ccb508f7bee83edb297afb6ff.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.pinimg.com/736x/40/49/c0/4049c06344f9fe63cc1d676f266d405b.jpg" />
          </SwiperSlide>
        </Swiper>
      </Box>
      {/* 2nd */}
      <Box w={"20%"}>
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
          <SwiperSlide>
            <Image src="https://m.media-amazon.com/images/I/71OLE0xb6nL._AC_UF894,1000_QL80_.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://www.htconline.in/images/thumbs/0032648_htc-wooden-craft-butterfly-design-small-9pcs_600.jpeg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://m.media-amazon.com/images/I/71E3PgTCCeL.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.etsystatic.com/20108887/r/il/d61bcb/1960006362/il_300x300.1960006362_9c9m.jpg" />
          </SwiperSlide>
        </Swiper>
      </Box>
      {/* 3rd */}

      <Box w={"20%"}>
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
          <SwiperSlide>
            <Image src="https://www.imagicart.in/wp-content/uploads/Mini-Canvas-Painting-Tree-Fall-Colors-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.etsystatic.com/25412764/r/il/559cb9/3081224857/il_570xN.3081224857_hbvw.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.etsystatic.com/32168006/r/il/d103c2/4288593704/il_340x270.4288593704_o0dc.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.ytimg.com/vi/DzX9WrU6mMQ/maxresdefault.jpg" />
          </SwiperSlide>
        </Swiper>
      </Box>
      {/* 4rth */}
      <Box w={"20%"}>
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
          <SwiperSlide>
            <Image src="https://images.meesho.com/images/products/242289018/uknh9_512.webp" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.pinimg.com/736x/d5/88/7c/d5887cdc937814b61842e8182a42b00c.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://m.media-amazon.com/images/I/91NKHaKBN6L._SL1500_.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="https://i.pinimg.com/236x/b8/a4/1e/b8a41ec6b30bfa2d8e870be6a58665a1.jpg" />
          </SwiperSlide>
        </Swiper>

      </Box>
    </Box>
  );
};

export default SliderImages;
