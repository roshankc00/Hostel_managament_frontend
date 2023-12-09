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
          Khojdau.com streamlines hostel exploration and booking. Forget the
          tedious hunt on Google Maps or wandering unknown streets. Our platform
          provides a smooth experience, letting you explore hostels, view
          authentic room photos, and book directly through us. The images you
          see reflect the real deal, ensuring confidence in your choice. Plus,
          no upfront payments are required on our site. Bookings are sealed
          based on mutual understanding between you and the hostel owner, giving
          you flexibility and trust in securing your accommodation hassle-free.
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
          Currently, our services are tailored to specific locations within
          Kathmandu Valley due to constraints related to resources and manpower.
          We understand your anticipation and eagerness for our services to
          reach your area. Please bear with us as we work diligently to expand
          our reach. Rest assured, we're committed to extending our services to
          more areas in the future. Your patience and understanding during this
          phase are immensely appreciated as we strive to enhance our
          capabilities and serve a broader audience.
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
