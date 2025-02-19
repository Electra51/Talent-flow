import React from "react";

const PageHeader = ({ title, openModal, buttonName, menu }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-[18px] font-medium">{title}</h2>
      {menu == "Employee Table View" && (
        <button
          className="bg-green-500 text-white rounded-sm !px-2.5 !py-1 font-medium text-[14px]"
          onClick={() => openModal(null, "create")}
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}>
          {buttonName}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
