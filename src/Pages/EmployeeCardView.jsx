import React, { useEffect, useState } from "react";
import PageHeader from "../component/Shared/PageHeader";
import { MdDelete, MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import Loader from "../component/Shared/Loader";
import axios from "axios";
import DeleteConfirmationModal from "../component/Modal/DeleteConfirmationModal";
import { Link } from "react-router";

const EmployeeCardView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employee/employee-all"
      );
      if (response.status === 200) {
        setEmployeeData(response.data);
      }
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div>
      <PageHeader title={"Employee Card View"} />
      <div>
        {loading ? (
          <div className="!py-32">
            <Loader />
          </div>
        ) : (
          <div className="rounded-sm grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {employeeData?.map((employee, i) => {
              console.log("em", employee);
              return (
                <div
                  className="bg-white dark:bg-base-200 shadow-xl border border-blue-100 rounded-sm "
                  key={i}>
                  <div className="avatar h-[180px] w-full !p-3">
                    <img
                      src={employee?.profile_picture}
                      alt={employee?.employee_name}
                      className="w-full h-full !object-cover"
                    />
                  </div>

                  <div className="!px-3 !pb-3">
                    <h2 className="font-bold text-[16px]">
                      {employee?.employee_name}
                    </h2>
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
            })}
          </div>
        )}
      </div>
      {isDeleteConfirmModalOpen && (
        <DeleteConfirmationModal
          employee={selectedEmployee}
          onClose={() => {
            setIsDeleteConfirmModalOpen(false);
            setSelectedEmployee(null);
          }}
          fetchEmployeeData={fetchEmployeeData}
        />
      )}
    </div>
  );
};

export default EmployeeCardView;
