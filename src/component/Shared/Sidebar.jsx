import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "../Data";
const Sidebar = () => {
  return (
    <div className="w-[270px] bg-blue-50 h-[100vh] relative">
      <div className="mt-10">
        {sidebarData
          .filter((item) => !item.role || item.role === 1)
          .map((item, index) => (
            <div key={index}>
              <NavLink
                to={item?.link}
                className={({ isActive }) =>
                  `flex items-center pl-7 py-2 text-[14px] hover:bg-blue-400 hover:border-0 hover:border-r-[6px] hover:border-blue-50 hover:text-white ${
                    isActive
                      ? "bg-blue-400 border-0 border-r-[6px] border-blue-50 text-white"
                      : "text-[#5F5F5F] border-0 border-r-[6px] border-blue-50"
                  }`
                }>
                {item?.icon && <span className="mr-2">{item.icon}</span>}
                <p>{item?.label}</p>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
