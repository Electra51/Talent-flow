// import React, { useEffect, useState } from "react";
// import { employeeData } from "../component/Data";
// import PageHeader from "../component/Shared/PageHeader";

// const getInitialEmployees = () => {
//   const storedEmployees = localStorage.getItem("employees");
//   return storedEmployees
//     ? JSON.parse(storedEmployees)
//     : [
//         {
//           name: "John Doe",
//           profileImage: img1,
//           phone: "+1 555-1234",
//           email: "john.doe@example.com",
//           address: "123 Main St, New York, NY 10001",
//         },
//         {
//           name: "Jane Smith",
//           profileImage: img6,
//           phone: "+1 555-5678",
//           email: "jane.smith@example.com",
//           address: "456 Elm St, Los Angeles, CA 90012",
//         },
//       ];
// };

// const EmployeeCardView = () => {
//   const [employees, setEmployees] = useState(getInitialEmployees);
//   useEffect(() => {
//     localStorage.setItem("employees", JSON.stringify(employees));
//   }, [employees]);

//   return (
//     <div>
//       <PageHeader title={"Employee Card View"} menu={"Employee Card View"} />
//       <div className="!mt-7 grid grid-cols-5 gap-10">
//         {employeeData?.map((e, i) => {
//           console.log("e", e);
//           return (
//             <div key={i}>
//               <div className="card bg-white dark:bg-base-200 shadow-xl h-[260px] border !py-4">
//                 <div className="avatar !mx-auto">
//                   <div className="w-24 rounded-full">
//                     <img src={e?.profileImage} alt="Shoes" />
//                   </div>
//                 </div>
//                 <div className="card-body text-center">
//                   <h2 className="card-title !mx-auto">{e?.name}</h2>
//                   <p>
//                     <span>Email: </span>
//                     {e?.email}
//                   </p>
//                   <p className="text-wrap !mt-0">
//                     <span>Address: </span>
//                     {e?.address}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default EmployeeCardView;

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdDelete, MdEdit } from "react-icons/md";
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
      <div className="border border-gray-300 rounded-sm grid grid-cols-4 gap-10">
        {employees?.map((employee, i) => {
          console.log("em", employee);
          return (
            <div key={i}>
              <div className="card bg-white dark:bg-base-200 shadow-xl h-[280px] border !py-6">
                <div className="avatar !mx-auto">
                  <div className="w-24 rounded-full">
                    <img src={employee?.profileImage} alt="Shoes" />
                  </div>
                </div>

                <div className="card-body text-center">
                  <h2 className="card-title !mx-auto">{employee?.name}</h2>

                  <p>
                    <span>Email: </span>
                    {employee?.email}
                  </p>
                  <p>
                    <span>Phone: </span>
                    {employee?.phone}
                  </p>
                  <p className="text-wrap !mt-0">
                    <span>Address: </span>
                    {employee?.address}
                  </p>
                  <button
                    className="flex justify-center items-center gap-1.5 text-red-500 border border-red-500 w-[100px] !mx-auto !mt-4 !py-1.5 rounded-[2px] group hover:bg-red-500 hover:text-white"
                    onClick={() => openModal(employee, "delete")}>
                    Delete
                    <MdDelete className="text-red-500 group-hover:text-white cursor-pointer text-xl" />
                  </button>
                </div>
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
