import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./css/Recommend.css";
import "swiper/css/navigation";
import RecommendItem from "./RecommendItem";

const Recommend = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      centeredSlides={true}
      speed={1500}
      loop={true}
      loopAdditionalSlides={1}
      navigation
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      //   pagination={{
      //     clickable: true,
      //   }}
    >
      <SwiperSlide className="swiper_slide">
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
      </SwiperSlide>
      <SwiperSlide className="swiper_slide">
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
      </SwiperSlide>
    </Swiper>
  );
};

export default Recommend;
