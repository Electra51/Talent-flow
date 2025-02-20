import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "./Data";

const Sidebar = () => {
  return (
    <div className="w-[270px] bg-blue-50 dark:bg-[#111111] h-[100vh] relative hidden md:block">
      <div className="!mt-0">
        {sidebarData
          .filter((item) => !item.role || item.role === 1)
          .map((item, index) => (
            <div key={index} className="pt-[3px] md:pt-[6px]">
              <NavLink
                to={item?.link}
                className={({ isActive }) =>
                  `flex items-center !pl-4 !py-2 hover:bg-[#2946AD] dark:hover:bg-[#1e1e1e] hover:border-0 hover:border-r-[6px] hover:border-[#81B2F1] dark:hover:border-[#3c3c3c] hover:text-white ${
                    isActive
                      ? "bg-[#2946AD] dark:bg-[#1e1e1e] border-0 border-r-[6px] border-[#81B2F1] dark:border-[#3c3c3c] text-white"
                      : "text-[#5F5F5F] dark:text-gray-400 border-0 border-r-[6px] border-blue-50 dark:border-[#111111]"
                  }`
                }>
                {item?.icon && (
                  <span className="!mr-2 text-[16px]">{item.icon}</span>
                )}
                <p className="text-[16px]">{item?.label}</p>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
