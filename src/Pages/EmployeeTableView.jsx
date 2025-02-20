import React, { useEffect, useState } from "react";
import PageHeader from "../component/Shared/PageHeader";
import axios from "axios";
import DataTable from "react-data-table-component";
import { MdDelete, MdEdit } from "react-icons/md";
import EmployeeAddModal from "../component/Modal/EmployeeAddModal";
import EmployeeEditModal from "../component/Modal/EmployeeEditModal";
import DeleteConfirmationModal from "../component/Modal/DeleteConfirmationModal";

const EmployeeTableView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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

  const columns = [
    {
      name: "Employee Name",
      selector: (row, index) => (
        <>
          {index + 1}. {row.employee_name}
        </>
      ),
    },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Email", selector: (row) => row.email },
    { name: "Status", selector: (row) => row.status },
    { name: "Department", selector: (row) => row.department },
    { name: "Address", selector: (row) => row.address },
    {
      name: "Profile Img",
      grow: 0,
      cell: (row) => (
        <img
          height="56px"
          width="56px"
          alt={row.employee_name}
          src={row.profile_picture}
        />
      ),
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="flex gap-2">
          <MdEdit
            className="text-blue-500 cursor-pointer text-xl"
            onClick={() => {
              setSelectedEmployee(row);
              setIsEditModalOpen(true);
            }}
          />
          <MdDelete
            className="text-red-500 cursor-pointer text-xl"
            onClick={() => {
              setSelectedEmployee(row);
              setIsDeleteConfirmModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-start">
        <PageHeader title={"Employee table View"} />
        <button
          className="bg-[#81B2F1] hover:bg-[#2A46AD] cursor-pointer text-white rounded-sm !px-2.5 !py-1.5 font-medium text-[14px]"
          onClick={() => setIsModalOpen(true)}
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}>
          + Create Employee
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="border border-gray-300 rounded-sm">
          <DataTable columns={columns} data={employeeData} />
        </div>
      )}
      {isModalOpen && (
        <EmployeeAddModal
          onClose={() => setIsModalOpen(false)}
          fetchEmployeeData={fetchEmployeeData}
        />
      )}
      {isEditModalOpen && (
        <EmployeeEditModal
          employee={selectedEmployee}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEmployee(null);
          }}
          fetchEmployeeData={fetchEmployeeData}
        />
      )}
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

export default EmployeeTableView;
