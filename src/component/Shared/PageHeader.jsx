import React from "react";

const PageHeader = ({ title, openModal, buttonName, menu }) => {
  return (
    <div className="flex justify-between items-center !mb-8">
      <h2 className="text-[18px] font-medium">{title}</h2>
      {menu == "Employee Table View" && (
        <button
          className="bg-[#81B2F1] hover:bg-[#2A46AD] cursor-pointer text-white rounded-sm !px-2.5 !py-1 font-medium text-[14px]"
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
