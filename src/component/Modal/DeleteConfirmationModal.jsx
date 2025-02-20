import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DeleteConfirmationModal = ({ employee, onClose, fetchEmployeeData }) => {
  console.log("employee", employee);
  const [loading, setLoading] = useState(false);
  // for modal open hide
  useEffect(() => {
    const modal = document.getElementById("employee_modal_delete");
    if (modal) {
      modal.showModal();
    }
  }, []);

  const handleClose = () => {
    const modal = document.getElementById("employee_modal_delete");
    if (modal) {
      modal.close();
    }
    onClose();
  };

  // delete employee
  const handleDeleteEmployee = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/employee/employee-delete/${employee._id}`
      );
      setLoading(false);
      handleClose();
      fetchEmployeeData();
      toast.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee. Please try again.");
      setLoading(false);
    }
  };

  return (
    <dialog
      id="employee_modal_delete"
      className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white dark:bg-[#1e1e1e] border border-gray-50 dark:border-[#3c3c3c] !px-5 !py-4">
        <p className="font-medium text-[16px] !mb-3 border-0 border-b border-gray-200">
          Delete Employee Here
        </p>
        <p>
          Would you like to delete employee{" "}
          <span className="text-blue-500">{employee?.employee_name}</span>
        </p>
        <form className="!p-1 !mt-3">
          <div className="flex justify-end items-center gap-2">
            <button
              type="button"
              onClick={handleDeleteEmployee}
              className="bg-red-500 text-white !px-2.5 !py-1 rounded-[2px] !mt-2 text-[14px] cursor-pointer"
              disabled={loading}>
              {loading ? (
                <span>
                  Deleting
                  <span className="loading loading-dots loading-xs !pl-1"></span>
                </span>
              ) : (
                "Delete"
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

export default DeleteConfirmationModal;
