import React from "react";
import { MdSearch } from "react-icons/md";

const PageHeader = ({
  title,
  setIsModalOpen,
  type,
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
}) => {
  const departmentOptions = [
    { value: "Information Technology", label: "Information Technology" },
    { value: "Business Development", label: "Business Development" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Data Analysis", label: "Data Analysis" },
  ];
  return (
    <div className="block md:flex lg:flex justify-between items-center !mb-8">
      <h2 className="text-[18px] font-medium">{title}</h2>
      {type == "details" || type == "dashboard" ? (
        ""
      ) : (
        <div className="block md:flex lg:flex justify-normal items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 dark:border-[#3c3c3c] !rounded-[2px] !py-1 !pl-7 text-gray-700 text-[14px] bg-white dark:bg-[#111111] dark:text-gray-200 "
            />
            <MdSearch className="absolute top-4 md:top-2 lg:top-2 left-2 text-[16px] text-gray-600 dark:text-gray-200" />
          </div>

          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 dark:border-[#3c3c3c] !rounded-l-[2px] !py-1 !px-1.5 text-gray-700 text-[14px] bg-white dark:bg-[#111111] dark:text-gray-200">
            <option value="All">All</option>
            <option value="Active">Status: Active</option>
            <option value="InActive">Status: InActive</option>
            <option value="OnLeave">Status: OnLeave</option>
            {departmentOptions.map((dept) => (
              <option key={dept.value} value={dept.value}>
                Dept.: {dept.label}
              </option>
            ))}
          </select>

          {type == "table-view" && (
            <button
              className="bg-[#81B2F1] dark:bg-[#2A46AD] hover:bg-[#2A46AD] cursor-pointer text-white rounded-sm !px-2.5 !py-1.5 font-medium text-[14px]"
              onClick={() => setIsModalOpen(true)}
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}>
              + Create Employee
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
