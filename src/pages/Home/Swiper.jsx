// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Card from "../../components/Card";
import { getDataWithoutHeader } from "../../services/axios.service";

const HomeSwapper = () => {
  const [trendingData, settrendingData] = useState([]);

  const getAllHostels = async () => {
    const response = await getDataWithoutHeader("hostels");
    console.log(response, "save");
    if (response.success) {
      settrendingData(response.hostels);
    }
  };

  useEffect(() => {
    getAllHostels();
  }, []);

  return (
    <Swiper
      // install Swiper modules
      className="mt-10 pb-4"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      breakpoints={{
        1480: {
          slidesPerView: 4,
        },
        1100: {
          slidesPerView: 3,
        },
        750: {
          slidesPerView: 2,
        },
      }}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {trendingData &&
        trendingData?.map((data, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex items-center justify-around"
            >
              <Card
                name={data?.name}
                location={data?.location?.city}
                rating={data?.averageRating}
                noOfReviews={data?.noOfReviews}
                id={data._id}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default HomeSwapper;
