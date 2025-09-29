"use client";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Define type for a single slide
type Slide = {
  image: string;
  title: string;
};

// Define props for the Slider component
interface SliderProps {
  slideData: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slideData }) => {
  return (
    <div className="container mx-auto">
      <Swiper
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slideData?.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center mt-2">
              <img
                alt={slide.title}
                className="w-full h-[50vh] object-cover"
                src={slide.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
