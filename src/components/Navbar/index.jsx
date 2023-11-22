import { useState } from "react";
import styles from "./navbar.module.css";
import { Menu, Close } from "@mui/icons-material";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  const [showHamburger, setShowHamburger] = useState(false);

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

          <div className="md:flex hidden">
            <NavLink to="/signup">
              <button className="px-8 py-2 rounded-[5em] border-solid border-2 border-[#2e2f84]">
                Sign Up
              </button>
            </NavLink>
          </div>
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
                <NavLink to="/signup">
                  <button className="px-8 py-2 rounded-[5em] border-solid border-2 border-[#2e2f84]">
                    Sign Up
                  </button>
                </NavLink>
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
