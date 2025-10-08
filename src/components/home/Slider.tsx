/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// "use client";

// import {
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   Autoplay,
// } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import Image from "next/image";

// // Define type for a single slide
// type Slide = {
//   image: string;
//   title: string;
// };

// // Define props for the Slider component
// interface SliderProps {
//   slideData: Slide[];
// }

// const Slider: React.FC<SliderProps> = ({ slideData }) => {
//   return (
//     <div className="container mx-auto">
//       <Swiper
//         navigation
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//         pagination={{ clickable: true }}
//         slidesPerView={1}
//         onSlideChange={() => console.log("slide change")}
//         onSwiper={(swiper) => console.log(swiper)}
//       >
//         {slideData?.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="flex flex-col items-center justify-center mt-2">
//               <Image
//                 alt={slide.title}
//                 height={300}
//                 src={slide.image}
//                 width={1000}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Slider;

// "use client";

// import {
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   Autoplay,
// } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import Image from "next/image";

// type Slide = {
//   image: string;
//   title: string;
// };

// interface SliderProps {
//   slideData: Slide[];
// }

// const Slider: React.FC<SliderProps> = ({ slideData }) => {
//   return (
//     <div className="w-full h-[30vh] sm:h-[40vh] lg:h-[60vh]">
//       <Swiper
//         navigation
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         className="w-full h-full"
//         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//         pagination={{ clickable: true }}
//         slidesPerView={1}
//       >
//         {slideData?.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div className="w-full h-full relative">
//               <Image
//                 fill
//                 priority
//                 alt={slide.title}
//                 className="object-contain"
//                 src={slide.image}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Slider;
"use client";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type RedirectType = "NONE" | "PRODUCT" | "CATEGORY" | "EXTERNAL_LINK";

type Slide = {
  id: string;
  title?: string;
  subtitle?: string;
  desktopImage: string;
  mobileImage?: string;
  redirectType: RedirectType;
  redirectId?: string;
  redirectUrl?: string;
};

const dummySlides: Slide[] = [
  {
    id: "1",
    title: "Mega Sale",
    subtitle: "Up to 70% Off",
    desktopImage:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    mobileImage:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    redirectType: "CATEGORY",
    redirectId: "product/category/Lighting",
  },
  {
    id: "2",
    title: "New iPhone 16",
    subtitle: "Pre-order Now",
    desktopImage:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    mobileImage:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    redirectType: "PRODUCT",
    redirectId: "cmg6pfnej001ih21eiohia4pu",
  },
  {
    id: "3",
    title: "Bank Offer",
    subtitle: "10% Cashback",
    desktopImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    mobileImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
    redirectType: "EXTERNAL_LINK",
    redirectUrl: "https://bankpartner.com/offers",
  },
];

const Slider = () => {
  const router = useRouter();

  const handleRedirect = (slide: Slide) => {
    switch (slide.redirectType) {
      case "PRODUCT":
        router.push(`/product/${slide.redirectId}`);
        break;
      case "CATEGORY":
        router.push(`/${slide.redirectId}`);
        break;
      case "EXTERNAL_LINK":
        if (slide.redirectUrl) {
          window.open(slide.redirectUrl, "_blank");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full h-[30vh] sm:h-[40vh] lg:h-[60vh]">
      <Swiper
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {dummySlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => handleRedirect(slide)}
            >
              <Image
                fill
                priority
                alt={slide.title ?? "Slide"}
                className="object-content"
                src={slide.desktopImage}
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white text-center">
                {slide.title && (
                  <h2 className="text-xl sm:text-3xl font-bold drop-shadow-md">
                    {slide.title}
                  </h2>
                )}
                {slide.subtitle && (
                  <p className="text-sm sm:text-lg mt-1">{slide.subtitle}</p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
