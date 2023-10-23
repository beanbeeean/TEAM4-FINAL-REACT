import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/pagination";
import "./css/Recommend.css";


const Recommend = () => {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            centeredSlides={true}
            speed={1500}
            loop={true}
            loopAdditionalSlides={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
        >

            <SwiperSlide className="swiper_slide"><img src="../imgs/banner1.png" /></SwiperSlide>
            <SwiperSlide className="swiper_slide">Slide 2</SwiperSlide>
            <SwiperSlide className="swiper_slide">Slide 3</SwiperSlide>
            <SwiperSlide className="swiper_slide">Slide 4</SwiperSlide>
        </Swiper>
    );
}

export default Recommend;