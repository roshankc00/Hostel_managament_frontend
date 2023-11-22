import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";

import { RiSettings4Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { PiBowlFoodFill } from "react-icons/pi";
import { FcRules } from "react-icons/fc";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BsFillBagDashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logedOut } from "../../pages/signin/auth.slice";
import { successToast } from "../../services/toastify.service";

const SuperAdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menus = [
    { name: "AllHostels", link: "/superadmin/hostels", icon: TbListDetails },
    { name: "AllOrders", link: "/superadmin/orders", icon: PiBowlFoodFill },
    { name: "AllUsers", link: "/superadmin/allusers", icon: FcRules },
    { name: "Faqs", link: "/superadmin/faqs", icon: FcRules },
    {
      name: "UserResponses",
      link: "/superadmin/all-user-responses",
      icon: FcRules,
    },
    { name: "Setting", link: "/superadmin/setting", icon: RiSettings4Line },
    { name: "Logout", link: "/", icon: BsFillBagDashFill },
  ];
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logedOut());
    navigate("/signin");
    successToast("User logout successfully");
  };
  return (
    <section className="flex gap-6 bg-white">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <BiMenu
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => {
            return (
              <>
                {menu.name != "Logout" ? (
                  <Link
                    to={menu?.link}
                    key={i}
                    className={` ${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 overflow-hidden"
                      }`}
                    >
                      {menu?.name}
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      {menu?.name}
                    </h2>
                  </Link>
                ) : (
                  <div
                    className={` ${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div className="">
                      {React.createElement(menu?.icon, { size: "20" })}
                    </div>
                    <button
                      className={`${open ? "block" : "hidden"}`}
                      onClick={() => handleLogout()}
                    >
                      {menu.name}
                    </button>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibol">
        <Outlet />
      </div>
    </section>
  );
};

export default SuperAdminSidebar;
