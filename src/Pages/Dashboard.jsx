import React, { useEffect, useState } from "react";
import PageHeader from "../component/Shared/PageHeader";
import imgEmployee from "../assets/employee.png";
import axios from "axios";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState();
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
      <PageHeader title={"Welcome to Dashboard 😊"} type={"dashboard"} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="rounded-[2px] border border-gray-300 dark:border-[#3c3c3c] !p-3">
          <div className="flex justify-between items-center ">
            <img src={imgEmployee} alt="" width={40} />
            <p className="text-4xl">{employeeData?.length}</p>
          </div>{" "}
          <p className="!mt-10">Total Employee</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
