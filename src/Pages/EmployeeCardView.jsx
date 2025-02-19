import React from "react";
import { employeeData } from "../component/Data";
import PageHeader from "../component/Shared/PageHeader";

const EmployeeCardView = () => {
  return (
    <div>
      <PageHeader title={"Employee Card View"} menu={"Employee Card View"} />
      <div className="!mt-7 grid grid-cols-5 gap-10">
        {employeeData?.map((e, i) => {
          console.log("e", e);
          return (
            <div key={i}>
              <div className="card bg-white dark:bg-base-200 shadow-xl h-[260px] border !py-4">
                <div className="avatar !mx-auto">
                  <div className="w-24 rounded-full">
                    <img src={e?.profileImage} alt="Shoes" />
                  </div>
                </div>
                <div className="card-body text-center">
                  <h2 className="card-title !mx-auto">{e?.name}</h2>
                  <p>
                    <span>Email: </span>
                    {e?.email}
                  </p>
                  <p className="text-wrap !mt-0">
                    <span>Address: </span>
                    {e?.address}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeCardView;
