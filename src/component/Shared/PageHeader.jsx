import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div className="flex justify-between items-center !mb-8">
      <h2 className="text-[18px] font-medium">{title}</h2>
    </div>
  );
};

export default PageHeader;
