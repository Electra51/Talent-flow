import React, { useEffect, useState } from "react";
import PageHeader from "../component/Shared/PageHeader";

import Loader from "../component/Shared/Loader";
import axios from "axios";
import DeleteConfirmationModal from "../component/Modal/DeleteConfirmationModal";
import Card from "../component/Shared/Card";

const EmployeeCardView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
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

  return (
    <div>
      <PageHeader
        title={"Employee Card View"}
        type="card-view"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div>
        {loading ? (
          <div className="!py-32">
            <Loader />
          </div>
        ) : (
          <div className="rounded-sm grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {searchTerm || selectedFilter
              ? filteredEmployeeData?.map((employee, i) => {
                  console.log("em", employee);
                  return <Card employee={employee} key={i} />;
                })
              : employeeData?.map((employee, i) => {
                  console.log("em", employee);
                  return <Card employee={employee} key={i} />;
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
