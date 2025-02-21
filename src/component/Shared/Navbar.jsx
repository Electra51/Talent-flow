import { useEffect, useState } from "react";
import { MdMenu, MdOutlineAccountCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MoonIcon, SunIcon } from "./Icons";
import { Link, NavLink } from "react-router";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import { sidebarDataForMobile } from "./Data";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleDark = () => {
    setDark(!dark);
    localStorage.setItem("dark-mode", !dark);
  };
  useEffect(() => {
    const localDark = JSON.parse(localStorage.getItem("dark-mode"));
    console.log(localDark);
    setDark(localDark);
  }, []);

  useEffect(() => {
    if (dark) {
      document.querySelector("html").setAttribute("data-theme", "dark");
    } else {
      document.querySelector("html").setAttribute("data-theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("logout successfully");
  };

  return (
    <>
      <div className="bg-blue-50 dark:bg-[#111111] text-black">
        <nav className="!px-8">
          <div className="flex justify-between items-center !py-4">
            <Logo />
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "" : <MdMenu className="text-xl text-[#2946AD]" />}
            </button>
            {/* desktop nav */}
            <ul className="hidden md:flex space-x-10 md:justify-center md:gap-2">
              <div className="rounded-full flex justify-center items-center gap-1 cursor-pointer relative !mr-2 text-[#5F5F5F] dark:text-gray-400">
                <MdOutlineAccountCircle
                  className="text-2xl"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />
              </div>
              {isProfileOpen && (
                <ul
                  tabIndex={0}
                  className="absolute top-16 right-2 menu menu-sm dropdown-content bg-white dark:bg-[#545454] rounded-[2px] w-52 !p-2 shadow !space-y-2">
                  <Link
                    to={"/profile"}
                    className="hover:bg-[#2946AD] dark:hover:bg-[#3c3c3c] text-black dark:text-[#bab8b8] hover:text-white !px-2 !py-1 rounded-[2px] flex justify-start items-center gap-1.5 font-medium">
                    <CgProfile className="text-[16px]" /> Profile
                  </Link>

                  <Link
                    to={"/login"}
                    className="hover:bg-[#2946AD] dark:hover:bg-[#3c3c3c] text-black dark:text-[#bab8b8] hover:text-white !px-2 !py-1 rounded-[2px] flex justify-start items-center gap-1.5 font-medium"
                    onClick={handleLogout}>
                    <FiLogOut className="text-[16px]" /> Logout
                  </Link>
                </ul>
              )}

              <label className="swap swap-rotate">
                <input type="checkbox" onClick={handleDark} />
                <SunIcon className="swap-off" />
                <MoonIcon className="swap-on" />
              </label>
            </ul>
          </div>
        </nav>
      </div>

      {/* mobile responsive navbar + sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-blue-50 text-[#2946AD] h-full p-6 transform z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}>
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsOpen(false)}>
          <RxCross2 />
        </button>

        <ul className="!space-y-2 !mt-5 !pt-7">
          <Logo />

          <div className="!mt-6">
            {sidebarDataForMobile?.map((sideMenu, i) => {
              return (
                <NavLink
                  onClick={() => setIsOpen(false)}
                  key={i}
                  to={sideMenu?.link}
                  className={({ isActive }) =>
                    `flex items-center !pl-6 !py-2 hover:bg-[#2946AD] hover:border-0 hover:border-r-[6px] hover:border-[#81B2F1] hover:text-white text-[16px] ${
                      isActive
                        ? "bg-[#2946AD] border-0 border-r-[6px] border-[#81B2F1] text-white"
                        : "border-0 border-r-[6px] border-blue-50 text-[#2946AD]"
                    }`
                  }>
                  {sideMenu?.icon && (
                    <span className="!mr-2 text-[16px]">{sideMenu.icon}</span>
                  )}
                  <p className="text-[17px]">{sideMenu?.label}</p>
                </NavLink>
              );
            })}
          </div>
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden -z-0"
          onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default Navbar;
