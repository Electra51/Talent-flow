import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../Shared/Sidebar";

const MainLayout = () => {
  return (
    <div class="bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
      <Navbar />
      <div className="w-full flex">
        <Sidebar />{" "}
        <div className="w-full !p-7 min-h-[100vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
