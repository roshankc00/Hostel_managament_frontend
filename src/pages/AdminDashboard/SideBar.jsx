import SideIcons from "./SideIcons";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaQuoteLeft } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiLeftArrowCircle, BiLogOut } from "react-icons/bi";
import { BiRightArrowCircle } from "react-icons/bi";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logedOut } from "../signin/auth.slice";
import { successToast } from "../../services/toastify.service";

const SideBarAdmin = () => {
  const [show, toggleShow] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sideIcons = [
    {
      name: "Foods",
      link: "admin/foods",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Add Certificate",
      link: "admin/addCertificate",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Orders",
      link: "admin/orders",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Location",
      link: "admin/location",
      icon: <FiSettings />,
    },
    {
      name: "Rules",
      link: "admin/rules",
      icon: <FaQuoteLeft />,
    },
    {
      name: "Hostel-Images",
      link: "admin/images",
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
      icon: <BiLogOut />,
    },
  ];
  const handleBurger = () => {
    show ? toggleShow(false) : toggleShow(true);
  };

  const handleLogout = () => {
    dispatch(logedOut());
    navigate("/signin");
    successToast("User logged out successfully!");
  };

  return (
    <div>
      <div className="left">
        <div
          className={`sidebar-z-index md:w-[20rem] h-[57rem] top-0 rounded-tr-[50px] rounded-br-[50px] left-0 fixed bg-[#3140b6] z-100 text-white flex items-center flex-col w-[10rem] ease-in-out duration-300 ${
            !show && "left-[-10rem] "
          } `}
        >
          <div className="mb-5 mt-2 md:text-3xl font-semibold text-[1.4rem]">
            DashBoard
          </div>

          <div className="mt-[-10px] w-full flex flex-col ">
            {sideIcons &&
              sideIcons.map((e) => {
                return e.name !== "Logout" ? (
                  <SideIcons
                    name={e.name}
                    link={`/${e.link}`}
                    icon={e.icon}
                    key={e.name}
                  />
                ) : (
                  <button
                    className="flex gap-2 items-center ms-[14%]"
                    onClick={() => handleLogout()}
                  >
                    <span className="text-xl">{e.icon}</span>
                    <span>Logout</span>
                  </button>
                );
              })}
          </div>
        </div>
        <div
          className={`sidebar-z-index fixed top-[3rem] bg-[#3140b6] text-white p-1 text-[2rem] rounded-full md:hidden ease-in-out duration-300 ${
            !show ? "left-2" : "left-[9rem]"
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
