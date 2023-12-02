import { useState } from "react";
import styles from "./navbar.module.css";
import { Menu, Close } from "@mui/icons-material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonCircleSharp } from "react-icons/io5";
import { logedOut } from "../../pages/signin/auth.slice";
import { GiTireIronCross } from "react-icons/gi";
import { successToast } from "../../services/toastify.service";

const Navbar = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [showLogoutAndSetting, setshowLogoutAndSetting] = useState(false);
  const { isLogedInStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <main className="relative">
      <div className={styles.bg}>
        <div className={`${styles.nav_items} h-full mx-auto max-w-[1280px]`}>
          <NavLink to="/" className={styles.logo}>
            <h1>Our Hostel</h1>
          </NavLink>
          <ul className="md:flex hidden">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/hostels">Hostels</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>

          {!isLogedInStatus ? (
            <div className="md:flex hidden">
              <NavLink to="/signin">
                <button className="px-8 py-2 rounded-[5em] border-solid border-2 border-[#2e2f84]">
                  Sign In
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="md:flex hidden">
              <button
                onClick={() => setshowLogoutAndSetting(!showLogoutAndSetting)}
              >
                <IoPersonCircleSharp size={30} />
              </button>

              {showLogoutAndSetting && (
                <div className="bg-white py-3 px-2 ms-[-10px] rounded-md absolute flex flex-col font-semibold text-xl gap-[-20px] ">
                  <button
                    className="flex justify-center mb-2"
                    onClick={() => setshowLogoutAndSetting(false)}
                  >
                    <GiTireIronCross />
                  </button>
                  <button
                    className="hover:bg-slate-200 px-2 "
                    onClick={() => {
                      dispatch(logedOut());
                      navigate("/signin");
                      successToast("user Loged out successfully");
                    }}
                  >
                    Logout
                  </button>
                  <br />
                </div>
              )}
            </div>
          )}
          {/* Hamburger Menu */}
          <div className="md:hidden flex gap-10">
            {showHamburger ? (
              <Close
                className={`h-20 w-32 cursor-pointer`}
                onClick={() => {
                  setShowHamburger(false);
                }}
              />
            ) : (
              <Menu
                className={`h-20 w-32 cursor-pointer`}
                onClick={() => {
                  setShowHamburger(true);
                }}
              />
            )}
          </div>
          {/* Hamburger Menu Items */}
          {showHamburger && (
            <div
              className={`${styles.hamburger_items} md:hidden flex fixed top-[80px] right-2`}
            >
              <div>
                <NavLink to="/">Home</NavLink>
              </div>
              <div>
                <NavLink to="/hostels">Hostels</NavLink>
              </div>
              <div>
                <NavLink to="/about-us">About</NavLink>
              </div>
              <div>
                <NavLink to="/contact">Contact</NavLink>
              </div>
              <div>
                {!isLogedInStatus ? (
                  <NavLink to="/signin">
                    <button className="px-8 py-2 rounded-[5em] border-solid border-2 border-[#2e2f84]">
                      Sign In
                    </button>
                  </NavLink>
                ) : (
                  <div className="">
                    <button
                      onClick={() =>
                        setshowLogoutAndSetting(!showLogoutAndSetting)
                      }
                    >
                      <IoPersonCircleSharp size={30} />
                    </button>
                    {showLogoutAndSetting && (
                      <div className="bg-white py-3 px-2 ms-[-10px] rounded-md absolute flex flex-col font-semibold text-xl gap-[-20px]">
                        <button
                          className="flex justify-center mb-2"
                          onClick={() => setshowLogoutAndSetting(false)}
                        >
                          <GiTireIronCross />
                        </button>
                        <button
                          className="hover:bg-slate-200 px-2 "
                          onClick={() => {
                            dispatch(logedOut());
                            navigate("/signin");
                            successToast("user Loged out successfully");
                          }}
                        >
                          Logout
                        </button>
                        <br />
                        <button className="hover:bg-slate-200 px-3">
                          setting
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-10">
        <Outlet />
      </div>
    </main>
  );
};

export default Navbar;
