import SideIcons from "./SideIcons";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaQuoteLeft } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiLeftArrowCircle, BiLogOut } from "react-icons/bi";
import { BiRightArrowCircle } from "react-icons/bi";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const SideBarAdmin = () => {
  const [show, toggleShow] = useState(true);

  const sideIcons = [
    {
      name: "Foods",
      link: "admin/foods",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Location",
      link: "admin/location",
      icon: <FiSettings />,
    },
    {
      name: "Rules",
      link: "rules",
      icon: <FaQuoteLeft />,
    },
    {
      name: "Hostel-Images",
      link: "admin/hpstel-images",
      icon: <MdCategory />,
    },
    {
      name: "Settings",
      link: "admin/settings",
      icon: <FiSettings />,
    },

    {
      name: "Room-Category",
      link: "admin/room-category",
      icon: <FiSettings />,
    },
    {
      name: "Logout",
      link: "logout",
      icon: <BiLogOut />,
    },
  ];
  const handleBurger = () => {
    show ? toggleShow(false) : toggleShow(true);
  };

  return (
    <div>
      <div className="left">
        <div
          className={`md:w-[20rem] h-[50rem] top-0 rounded-tr-lg rounded-tb-lg left-0 fixed bg-[#3140b6] z-1000 text-white flex items-center flex-col w-[10rem] ease-in-out duration-300 ${
            !show && "left-[-10rem] "
          } `}
        >
          <div className="mt-10 md:text-3xl font-semibold text-[1.4rem]">
            DashBoard
          </div>

          <div className="mt-10 w-full flex flex-col items-center ">
            {sideIcons &&
              sideIcons.map((e) => {
                return (
                  <SideIcons
                    name={e.name}
                    link={`/${e.link}`}
                    icon={e.icon}
                    key={e.name}
                  />
                );
              })}
          </div>
        </div>
        <div
          className={`fixed top-[7rem] left-[9rem] bg-[#3140b6] text-white p-1 text-[2rem] rounded-full md:hidden ease-in-out duration-300 ${
            !show && "left-[-1.3rem] "
          }`}
          onClick={handleBurger}
        >
          {!show ? <BiRightArrowCircle /> : <BiLeftArrowCircle />}
        </div>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBarAdmin;
