import { useEffect, useRef, useState } from "react";
import { MdMenu, MdOutlineAccountCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo.png";
import { MoonIcon, SunIcon } from "./Icons";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);

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
      document.querySelector("html").setAttribute("data-theme", "portTheme");
    }
  }, [dark]);

  const ref = useRef("");
  return (
    <>
      <div className="bg-blue-50 text-black">
        {/* Navbar */}
        <nav className="">
          <div className="flex justify-between items-center border">
            <div className="flex justify-center items-center gap-1">
              <img src={logo} alt="" width={50} />
              <p className="font-semibold text-xl">TalentFlow</p>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <RxCross2 /> : <MdMenu />}
            </button>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex space-x-10 md:justify-center md:gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <div className="rounded-full flex justify-center items-center gap-1 cursor-pointer">
                    <MdOutlineAccountCircle className="text-2xl" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
              <label className="swap swap-rotate mr-3">
                <input type="checkbox" onClick={handleDark} />
                <SunIcon className="swap-off" />
                <MoonIcon className="swap-on" />
              </label>
            </ul>
          </div>
        </nav>
      </div>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 w-64 bg-blue-700 text-white h-full p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}>
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsOpen(false)}>
          <RxCross2 />
        </button>

        <ul className="space-y-4 mt-8">
          <li>
            <a href="#" className="block hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default Navbar;
