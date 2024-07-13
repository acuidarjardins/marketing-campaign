"use client";

import { Children, ReactNode } from "react";
import { register } from "swiper/element";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

register();

type CustomCarouselProps = {
  items: ReactNode[];
  slideClassName?: string;
  containerClassName?: string;
};

const CustomCarousel = ({
  items,
  slideClassName,
  containerClassName,
}: CustomCarouselProps) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={3}
      navigation
      autoplay={{ delay: 4000 }}
      loop
      className={containerClassName}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        960: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        },
      }}
    >
      {Children.toArray(
        items.map((item) => (
          <SwiperSlide className={slideClassName}>{item}</SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default CustomCarousel;
