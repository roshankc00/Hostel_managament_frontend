import React from "react";
import { LuClock8 } from "react-icons/lu";
import { BsGlobe2 } from "react-icons/bs";

const WhyUs = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-8 p-6 bg-gray-200 rounded-md mb-6">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <LuClock8 size={"4rem"} />
          <h1 className="font-semibold text-2xl">
            Save Your Time And Money With Us
          </h1>
        </div>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
          possimus nisi doloremque culpa unde cum rerum optio molestiae eum
          praesentium dolorum, non atque quae eveniet nostrum labore odio
          provident ullam?
        </p>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-4">
          <BsGlobe2 size={"4rem"} />
          <h1 className="font-semibold text-2xl">
            Where we offer our services
          </h1>
        </div>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
          possimus nisi doloremque culpa unde cum rerum optio molestiae eum
          praesentium dolorum, non atque quae eveniet nostrum labore odio
          provident ullam?
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
