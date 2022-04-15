import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../styles.css";

// import required modules
import { Pagination } from "swiper";

export default function App() {
    return (
        <>
            <Swiper
                className="mySwiper swiper-h"
                direction={"vertical"}
                spaceBetween={50}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
            >
                <SwiperSlide>Horizontal Slide 1</SwiperSlide>
                <SwiperSlide>
                    <Swiper
                        className="mySwiper2 swiper-v"
                        spaceBetween={50}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                    >
                        <SwiperSlide>asdasdasdsad Slide 1</SwiperSlide>
                        <SwiperSlide>Vertical Slide 2</SwiperSlide>
                        <SwiperSlide>Vertical Slide 3</SwiperSlide>
                        <SwiperSlide>Vertical Slide 4</SwiperSlide>
                        <SwiperSlide>Vertical Slide 5</SwiperSlide>
                    </Swiper>
                </SwiperSlide>
                <SwiperSlide>Horizontal Slide 3</SwiperSlide>
                <SwiperSlide>Horizontal Slide 4</SwiperSlide>
            </Swiper>
        </>
    );
}
