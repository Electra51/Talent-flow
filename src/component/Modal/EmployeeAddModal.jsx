import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";

const EmployeeAddModal = ({ onClose, fetchEmployeeData }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const statusOptions = ["Active", "InActive", "OnLeave"];
  const departmentOptions = [
    { value: "Information Technology", label: "Information Technology" },
    { value: "Business Development", label: "Business Development" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Data Analysis", label: "Data Analysis" },
  ];
  const [value, setValue] = useState({
    employee_name: "",
    email: "",
    profile_picture: "",
    address: "",
    department: "",
    phone: "",
    status: "Active",
  });
  const [errors, setErrors] = useState({
    employee_name: "",
    email: "",
    address: "",
    department: "",
    phone: "",
  });

  const validateField = (name, val) => {
    let error = "";
    switch (name) {
      case "employee_name":
        error = val ? "" : "Name is required";
        break;
      case "email":
        error = val
          ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
            ? "Invalid email format"
            : ""
          : "Email is required";
        break;
      case "phone":
        error = val
          ? !/^\d{11}$/.test(val)
            ? "Phone must be 11 digits"
            : ""
          : "Phone is required";
        break;
      case "address":
        error = val ? "" : "Address is required";
        break;
      case "department":
        error = val ? "" : "Department is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const modal = document.getElementById("employee_modal");
    if (modal) {
      modal.showModal();
    }
  }, []);

  const handleClose = () => {
    const modal = document.getElementById("employee_modal");
    if (modal) {
      modal.close();
    }
    onClose();
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfileImage(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const isValid = () => {
    const newErrors = {};
    for (const key in value) {
      if (key === "profile_picture" || key === "status") continue;
      newErrors[key] = validateField(key, value[key]);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleCreateEmployee = async () => {
    if (!isValid()) return;
    setLoading(true);
    try {
      let imageUrl = value.profile_picture;
      if (profileImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", profileImage);
        const imageUploadResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/employee/upload-image`,
          imageFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        imageUrl = imageUploadResponse.data.url;
      }
      const employeeData = { ...value, profile_picture: imageUrl };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/employee-add`,
        employeeData
      );
      setValue({
        employee_name: "",
        email: "",
        profile_picture: "",
        address: "",
        department: "",
        phone: "",
        status: ["Active"],
      });
      setProfileImage(null);
      setLoading(false);
      handleClose();
      fetchEmployeeData();
      toast.success("Employee created successfully!");
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Error creating employee. Please try again.");
      setLoading(false);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");

  return (
    <dialog id="employee_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white dark:bg-[#1e1e1e] border border-gray-50 dark:border-[#3c3c3c] !px-5 !py-4">
        <p className="font-medium text-[16px] !mb-3 border-0 border-b border-gray-200 dark:border-[#3c3c3c]">
          Create Employee Here
        </p>
        <form className="!p-1 !mt-3">
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="employee_name"
                value={value.employee_name}
                onChange={handleChange}
                placeholder="Name"
                className={`border ${
                  errors.employee_name ? "border-red-500" : "border-gray-300"
                } dark:border-[#3c3c3c] dark:bg-[#111111]  text-gray-700 dark:text-gray-200 !rounded-[2px] w-full !py-1 !px-1.5`}
                required
              />
              {errors.employee_name && (
                <p className="text-red-500 text-xs">{errors.employee_name}</p>
              )}
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={value.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={`border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } dark:border-[#3c3c3c] dark:bg-[#111111]  text-gray-700 dark:text-gray-200 !rounded-[2px] w-full !py-1 !px-1.5 `}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
            <div className="!mt-2">
              <label>Status:</label>
              <select
                name="status"
                value={value.status}
                onChange={handleChange}
                className="border border-gray-300 dark:border-[#3c3c3c] dark:bg-[#111111]  text-gray-700 dark:text-gray-200 !rounded-[2px] !py-1.5 !px-1.5  text-[14px] bg-white  w-full"
                required>
                <option value="">Select Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="!mt-2">
              <label>Department:</label>
              <select
                name="department"
                value={value.department}
                onChange={handleChange}
                className={`border ${
                  errors.department ? "border-red-500" : "border-gray-300"
                }  dark:border-[#3c3c3c] !rounded-[2px] !py-1.5 !px-1.5 text-gray-700 text-[14px] bg-white dark:bg-[#111111] dark:text-gray-200 w-full`}
                required>
                <option value="">Select Department</option>
                {departmentOptions.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-xs">{errors.department}</p>
              )}
            </div>
          </div>

          <div className="!mt-2">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={value.email}
              onChange={handleChange}
              placeholder="Email"
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } dark:border-[#3c3c3c] dark:bg-[#111111]  text-gray-700 dark:text-gray-200 !rounded-[2px] w-full !py-1 !px-1.5 `}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="!mt-2">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={value.address}
              onChange={handleChange}
              placeholder="Address"
              className={`border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } dark:border-[#3c3c3c] dark:bg-[#111111]  text-gray-700 dark:text-gray-200 !rounded-[2px] w-full !py-1 !px-1.5 `}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </div>
          <div className="!my-2">
            <label>Profile Picture:</label>
            <div
              {...getRootProps()}
              className="grid grid-cols-2 gap-[18px] !mt-1">
              <div className="h-[130px] border border-dashed border-gray-300 dark:border-[#3c3c3c] rounded-[2px] flex flex-col justify-center items-center !px-2">
                <input {...getInputProps()} />
                <div className="h-[30px] w-[30px] rounded-full bg-[#76c4eb] flex justify-center items-center !my-2">
                  <MdOutlineFileUpload className="text-white text-[16px]" />
                </div>
                <p className="mt-[16px] mb-[3px] text-[12px] text-center">
                  Drag & Drop or <span className="text-[#76c4eb]">Choose</span>
                  an image to upload
                </p>
                <p className="text-[#5F5F5F] font-normal text-[12px] text-center">
                  Supported formats: PNG, JPG, JPEG
                </p>
              </div>
              {profileImage ? (
                <div className="h-[130px] bg-[#F4F8FA] dark:bg-[#3c3c3c] flex justify-center items-center rounded-[2px]">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    width={97}
                  />
                </div>
              ) : (
                <div className="h-[130px] bg-[#F4F8FA] dark:bg-[#3c3c3c] flex justify-center items-center rounded-[2px]">
                  <BiImageAdd className="text-2xl text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-2">
            <button
              type="button"
              onClick={handleCreateEmployee}
              className="bg-blue-500 dark:bg-[#2A46AD] text-white !px-2.5 !py-1 rounded-[2px] !mt-2 text-[14px] cursor-pointer"
              disabled={loading || hasErrors}>
              {loading ? (
                <span>
                  Adding
                  <span className="loading loading-dots loading-xs !pl-1"></span>
                </span>
              ) : (
                "Add Employee"
              )}
            </button>
            <button
              className="bg-gray-400 dark:bg-[#535353] text-white !px-2.5 !py-1 rounded-[2px] !mt-2 text-[14px] cursor-pointer"
              onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EmployeeAddModal;
