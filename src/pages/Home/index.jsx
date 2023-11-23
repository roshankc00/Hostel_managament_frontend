import Swiper from "./Swiper";
import Footer from "../../components/Footer";
import Accordion from "./FaqSection/Accordion";
import { getDataWithoutHeader } from "../../services/axios.service";
import { useEffect, useState } from "react";
import WhyUs from "./Why Us";
import LandingPage from "../../components/LandingPage";
import SearchBar from "../../components/SearchBar";
import Nearby from "../../components/Nearby";

const Home = () => {
  const [accordions, setAccordions] = useState([]);

  const getApiFaqData = async () => {
    const response = await getDataWithoutHeader("faqs");

    const datas = response.faqs.map((data) => {
      return { ...data, isOpen: false };
    });
    console.log(datas);
    setAccordions(datas);
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
      <LandingPage />
      <SearchBar />
      <div className="text-[2rem] mt-[3rem] font-semibold">
        <h1 className="text-3xl ms-[1rem]">Featured Hostels</h1>
      </div>

      <Swiper />

      <div className="px-5 md:px-10 lg:px-20">
        {accordions && (
          <section>
            <h1 className="text-3xl my-10 font-semibold">
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
