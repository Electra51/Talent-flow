import React, { useState, useEffect } from "react";
import { MdDelete, MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import img1 from "../assets/man1.jpeg";
import img6 from "../assets/man6.jpeg";
import PageHeader from "../component/Shared/PageHeader";
import Modal from "../component/Shared/Modal";

const getInitialEmployees = () => {
  const storedEmployees = localStorage.getItem("employees");
  return storedEmployees
    ? JSON.parse(storedEmployees)
    : [
        {
          name: "John Doe",
          profileImage: img1,
          phone: "+1 555-1234",
          email: "john.doe@example.com",
          address: "123 Main St, New York, NY 10001",
        },
        {
          name: "Jane Smith",
          profileImage: img6,
          phone: "+1 555-5678",
          email: "jane.smith@example.com",
          address: "456 Elm St, Los Angeles, CA 90012",
        },
      ];
};

const EmployeeCardView = () => {
  const [employees, setEmployees] = useState(getInitialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  //  Open Modal
  const openModal = (employee = null, type) => {
    setSelectedEmployee(employee);
    setActionType(type);

    document.getElementById("employee_modal").showModal();
  };

  // Delete Employee
  const handleDelete = () => {
    setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
    document.getElementById("employee_modal").close();
  };

  return (
    <div>
      <PageHeader
        title={"Employee Card View"}
        openModal={openModal}
        menu={"Employee Card View"}
      />
      <div className="rounded-sm grid grid-cols-4 gap-10">
        {employees?.map((employee, i) => {
          console.log("em", employee);
          return (
            <div
              className="bg-white dark:bg-base-200 shadow-xl h-[430px] border border-gray-300  rounded-sm w-[365px]"
              key={i}>
              <div className="avatar !mx-auto !py-4 !px-2 h-[230px] w-[365px]">
                <img
                  src={employee?.profileImage}
                  alt={employee?.name}
                  className="w-full h-full !object-contain"
                />
              </div>

              <div className="!px-6">
                <h2 className="font-bold text-[18px]">{employee?.name}</h2>
                <p className="!p-0 flex justify-start items-center gap-1.5 !mt-2">
                  <MdEmail /> {employee?.email}
                </p>
                <p className="!p-0 flex justify-start items-center gap-1.5">
                  <MdPhone />
                  {employee?.phone}
                </p>
                <p className="!p-0 flex justify-start items-center gap-1.5">
                  <MdLocationPin />
                  {employee?.address}
                </p>
                <button
                  className="flex justify-center items-center gap-1.5 text-white border border-red-500 w-[100px] !mr-auto !mt-5 !py-1.5 rounded-[2px] bg-red-500 group hover:bg-red-600 hover:text-white cursor-pointer"
                  onClick={() => openModal(employee, "delete")}>
                  Delete
                  <MdDelete className="text-white group-hover:text-white cursor-pointer text-xl" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        actionType={"delete"}
        value={""}
        selectedEmployee={selectedEmployee}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeeCardView;
