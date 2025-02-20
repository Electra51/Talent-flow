import React from "react";
import PageHeader from "../component/Shared/PageHeader";
import imgEmployee from "../assets/employee.png";
const Dashboard = () => {
  const employee = JSON.parse(localStorage.getItem("employees"));
  console.log(employee);
  return (
    <div>
      <PageHeader title={"Welcome to Dashboard 😊"} type={"dashboard"} />
      <div className="grid grid-cols-4 gap-5">
        <div className="rounded-[2px] border border-blue-100 dark:border-[#3c3c3c] !p-3">
          <div className="flex justify-between items-center ">
            <img src={imgEmployee} alt="" width={40} />
            <p className="text-4xl">{employee?.length}</p>
          </div>{" "}
          <p className="!mt-10">Total Employee</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
