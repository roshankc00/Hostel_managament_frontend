import Swiper from "./Swiper";
import Footer from "../../components/Footer";
import Accordion from "./FaqSection/Accordion";
import { getDataWithoutHeader } from "../../services/axios.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import WhyUs from "./Why Us";
import LandingPage from "../../components/LandingPage";
import SearchBar from "../../components/SearchBar";
import Nearby from "../../components/Nearby";
import Cookies from "js-cookie";
import { logedin } from "../signin/auth.slice.js";
const Home = () => {
  const dispatch = useDispatch();
  const [accordions, setAccordions] = useState([]);

  const getApiFaqData = async () => {
    const response = await getDataWithoutHeader("faqs");

    const datas = response.faqs.map((data) => {
      return { ...data, isOpen: false };
    });
    console.log(datas);
    setAccordions(datas);
    const role = Cookies.get("role");
    const token = Cookies.get("jwtToken");
    const userId = Cookies.get("UserId");
    const isLoginStatus = Cookies.get("isLoggedIn");
    if (role && token && userId && isLoginStatus) {
      dispatch(logedin({ role, token, userId, isLoginStatus }));
    }
  };
  useEffect(() => {
    getApiFaqData();
  }, []);

  const toggleAccordion = (accordionId) => {
    console.log(accordionId);
    if (accordions) {
      setAccordions((prevAccordions) =>
        prevAccordions.map((accordion) => ({
          ...accordion,
          isOpen: accordion._id === accordionId ? !accordion.isOpen : false,
        }))
      );
    }
  };
  return (
    <div className="bg-white text-black max-w-[1280px] mx-auto">
      <SearchBar />
      <LandingPage />
      <div className="text-[2rem] mt-[3rem] font-semibold">
        <h1 className="text-3xl ms-[1rem]">Featured Hostels</h1>
      </div>

      <Swiper />

      <div className="px-5 md:px-10 lg:px-20 mb-10">
        {accordions && (
          <section>
            <h1 className="text-3xl my-9 ms-[-30px] font-semibold">
              Frequently Asked Questions
            </h1>
            {accordions.map((accordion) => (
              <Accordion
                key={accordion._id}
                title={accordion.question}
                content={accordion.answer}
                isOpen={accordion.isOpen}
                onClick={() => toggleAccordion(accordion._id)}
              />
            ))}
          </section>
        )}
      </div>

      <div>
        <WhyUs />
        <Nearby />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
