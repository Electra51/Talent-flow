import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageHeader from "../component/Shared/PageHeader";
import Loader from "../component/Shared/Loader";

const EmployeeDetailById = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/employee/${id}`
        );
        if (response.status === 200) {
          setEmployee(response.data.employee);
        } else {
          setError(`Failed to fetch employee. Status code: ${response.status}`);
        }
      } catch (err) {
        setError(err.message || "Error fetching employee");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  return (
    <div>
      <PageHeader title={"Employee Details"} type={"details"} />
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="flex justify-normal items-start gap-5">
          <div>
            <img
              src={employee?.profile_picture}
              alt={employee?.employee_name}
            />
          </div>
          <div>
            <p className="text-[16px] !mt-1 font-semibold">
              Employee Name:
              <span className="font-normal">{employee?.employee_name}</span>
            </p>
            <p className="text-[16px] !mt-1 font-semibold">
              Department:{" "}
              <span className="font-normal">{employee?.department}</span>
            </p>{" "}
            <p className="text-[16px] !mt-1 font-semibold">
              Address: <span className="font-normal">{employee?.address}</span>
            </p>
            <p className="text-[16px] !mt-1 font-semibold">
              Email: <span className="font-normal">{employee?.email}</span>
            </p>
            <p className="text-[16px] !mt-1 font-semibold">
              Phone: <span className="font-normal"> {employee?.phone}</span>
            </p>
            <p className="text-[16px] !mt-1 font-semibold">
              Status: <span className="font-normal"> {employee?.status}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailById;
