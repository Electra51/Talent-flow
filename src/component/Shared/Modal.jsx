import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

const Modal = ({
  actionType,
  selectedEmployee,
  value,
  handleChange,
  handleDelete,
  handleSave,
  handleImageUpload,
}) => {
  const [imagePreview, setImagePreview] = useState(value.profileImage || "");
  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };
  return (
    <dialog id="employee_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white dark:bg-gray-400 !px-5 !py-4">
        <h3 className="font-bold text-lg">
          {actionType === "create"
            ? "Add Employee"
            : actionType === "edit"
            ? "Edit Employee"
            : "Delete Employee"}
        </h3>

        {actionType === "delete" ? (
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedEmployee?.name}</strong>?
          </p>
        ) : (
          <form className="!p-1 !mt-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div>
                  <label>Name: </label>
                  <input
                    type="text"
                    name="name"
                    value={value.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border border-gray-300 !rounded-[2px] w-full !py-1 !px-1.5 text-gray-700"
                    required
                  />
                </div>
                <div className="!mt-2.5">
                  <label>Phone Number: </label>
                  <input
                    type="text"
                    name="phone"
                    value={value.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border border-gray-300 !rounded-[2px] w-full !py-1 !px-1.5 text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="h-[120px] border border-gray-300 !mt-5 rounded-[2px] flex flex-col justify-center items-center">
                <div className="my-5 ">
                  <p className="text-[14px] font-normal mb-[10px] mt-5">
                    Featured Image
                  </p>
                  <div
                    {...getRootProps()}
                    className="flex justify-normal items-center gap-[18px] mt-1">
                    <div className="w-[383px] h-[222px] border border-dashed rounded-md flex flex-col justify-center items-center">
                      <input {...getInputProps()} />
                      <div className="h-[40px] w-[40px] rounded-full bg-[#76c4eb] flex justify-center items-center">
                        <MdOutlineFileUpload className="text-white text-xl" />
                      </div>
                      <p className="mt-[16px] mb-[3px]">
                        Drag & Drop or{" "}
                        <span className="text-[#76c4eb]">Choose</span> image to
                        upload
                      </p>
                      <p className="text-[#5F5F5F] text-[14px] font-normal">
                        Supported formats: PNG, JPG, JPEG
                      </p>
                    </div>
                    {featuredImage ? (
                      <div className="w-[383px] h-[222px] bg-[#F4F8FA] flex justify-center items-center rounded-[4px]">
                        <img
                          src={URL.createObjectURL(featuredImage)}
                          alt="Featured"
                          width={97}
                        />
                      </div>
                    ) : (
                      <div className="w-[383px] h-[222px] bg-[#F4F8FA] flex justify-center items-center rounded-[4px]">
                        <BiImageAdd className="text-2xl text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="!mt-2">
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={value.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-300 !rounded-[2px] w-full !py-1 !px-1.5 text-gray-700"
                required
              />
            </div>

            <div className="!mt-2">
              <label>Address: </label>
              <input
                type="text"
                name="address"
                value={value.address}
                onChange={handleChange}
                placeholder="Address"
                className="border border-gray-300 !rounded-[2px] w-full !py-1 !px-1.5 text-gray-700"
                required
              />
            </div>
          </form>
        )}

        <div className="modal-action !mt-3">
          <form method="dialog">
            <button className="!px-2 !py-1 bg-gray-900 text-white rounded text-[14px] font-medium">
              Close
            </button>
          </form>
          {actionType === "delete" ? (
            <button
              className="!px-2 !py-1 bg-red-600 text-white rounded text-[14px] font-medium"
              onClick={handleDelete}>
              Confirm Delete
            </button>
          ) : (
            <button
              className="!px-2 !py-1 bg-blue-600 text-white rounded text-[14px] font-medium"
              onClick={handleSave}>
              {actionType === "edit" ? "Update" : "Create"}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
