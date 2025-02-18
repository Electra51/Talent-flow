import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router";
import Sidebar from "../Shared/Sidebar";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="w-full flex">
        <Sidebar />{" "}
        <div className="pl-5 pt-5">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
