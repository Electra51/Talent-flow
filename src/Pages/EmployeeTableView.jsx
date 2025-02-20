import React, { useEffect, useState } from "react";
import PageHeader from "../component/Shared/PageHeader";
import DataTable from "react-data-table-component";
import { MdDelete, MdEdit } from "react-icons/md";
import EmployeeAddModal from "../component/Modal/EmployeeAddModal";
import EmployeeEditModal from "../component/Modal/EmployeeEditModal";
import DeleteConfirmationModal from "../component/Modal/DeleteConfirmationModal";
import axios from "axios";
import Loader from "../component/Shared/Loader";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router";

const EmployeeTableView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
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

  console.log("employeeData", employeeData);
  const filteredEmployeeData = employeeData?.filter((employee) => {
    const matchesSearch =
      employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Active" && employee.status === "Active") ||
      (selectedFilter === "InActive" && employee.status === "InActive") ||
      (selectedFilter === "OnLeave" && employee.status === "OnLeave") ||
      (selectedFilter !== "status" && employee.department === selectedFilter);

    return matchesSearch && matchesFilter;
  });
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
          <Link to={`/employee/${row?._id}`}>
            <IoMdEye className="text-black cursor-pointer text-xl" />
          </Link>
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
      <PageHeader
        title={"Employee table View"}
        setIsModalOpen={setIsModalOpen}
        type={"table-view"}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      {loading ? (
        <div className="!py-10">
          <Loader />
        </div>
      ) : (
        <div className="border border-gray-300 rounded-sm">
          {searchTerm || selectedFilter ? (
            <DataTable columns={columns} data={filteredEmployeeData} />
          ) : (
            <DataTable columns={columns} data={employeeData} />
          )}
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
