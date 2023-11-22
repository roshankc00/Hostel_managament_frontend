import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// eslint-disable-next-line react/prop-types
const ImageSlider = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={5}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        1280: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
        360: {
          slidesPerView: 1,
        },
      }}
    >
      {/*eslint-disable-next-line react/prop-types*/}
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image.url}
            alt={`Slide ${index}`}
            className="w-full h-96 object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
