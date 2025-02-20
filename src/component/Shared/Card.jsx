import React from "react";
import { MdDelete, MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router";
const Card = ({ employee }) => {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] shadow-xl border border-blue-100 dark:border-[#3c3c3c] rounded-sm transition-transform duration-500 hover:scale-102 hover:bg-gray-50 dark:hover:bg-[#111111]">
      <div className="avatar h-[180px] w-full !p-3">
        <img
          src={employee?.profile_picture}
          alt={employee?.employee_name}
          className="w-full h-full !object-cover"
        />
      </div>

      <div className="!px-3 !pb-3">
        <h2 className="font-bold text-[16px]">{employee?.employee_name}</h2>
        <p className="!p-0 flex justify-start items-center gap-1.5 !mt-2 text-[14px]">
          <MdEmail /> {employee?.email}
        </p>
        <p className="!p-0 flex justify-start items-center gap-1.5 text-[14px]">
          <MdPhone />
          {employee?.phone}
        </p>
        <p className="!p-0 flex justify-start items-center gap-1.5 text-[14px]">
          <MdLocationPin />
          {employee?.address}
        </p>
        <div className="flex justify-between items-center gap-2">
          <Link
            to={`/employee/${employee?._id}`}
            className="flex justify-center items-center gap-1.5 text-[#2946AD] border border-[#2946AD] w-1/2 !mr-auto !mt-5 !py-1 rounded-[2px]  group hover:bg-[#2946AD] hover:text-white cursor-pointer text-[14px]">
            View Details
            <IoMdEye className="text-[#2946AD] group-hover:text-white cursor-pointer text-xl" />
          </Link>
          <button
            className="flex justify-center items-center gap-1.5 text-white border border-red-500 w-1/2 !mr-auto !mt-5 !py-1 rounded-[2px] bg-red-500 group hover:bg-red-600 hover:text-white cursor-pointer text-[14px]"
            onClick={() => {
              setSelectedEmployee(employee);
              setIsDeleteConfirmModalOpen(true);
            }}>
            Delete
            <MdDelete className="text-white group-hover:text-white cursor-pointer text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
