import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdDelete, MdEdit } from "react-icons/md";
import img1 from "../assets/man1.jpeg";
import img6 from "../assets/man6.jpeg";
import PageHeader from "../component/Shared/PageHeader";
import Modal from "../component/Shared/Modal";

const getInitialEmployees = () => {
  const storedEmployees = localStorage.getItem("employees");
  return storedEmployees
    ? JSON.parse(storedEmployees)
    : [
        {
          name: "John Doe",
          profileImage: img1,
          phone: "+1 555-1234",
          email: "john.doe@example.com",
          address: "123 Main St, New York, NY 10001",
        },
        {
          name: "Jane Smith",
          profileImage: img6,
          phone: "+1 555-5678",
          email: "jane.smith@example.com",
          address: "456 Elm St, Los Angeles, CA 90012",
        },
      ];
};

const EmployeeTableView = () => {
  const [employees, setEmployees] = useState(getInitialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [actionType, setActionType] = useState("");
  const [value, setValue] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    profileImage: "",
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Open Modal
  const openModal = (employee = null, type) => {
    setSelectedEmployee(employee);
    setActionType(type);
    setValue(employee || { name: "", phone: "", email: "", address: "" });
    document.getElementById("employee_modal").showModal();
  };

  // Handle Input Change
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // Create or Update Employee
  // const handleSave = () => {
  //   if (actionType === "create") {
  //     const newEmployee = {
  //       ...value,
  //       id: Date.now(),
  //       profileImage: "https://via.placeholder.com/56",
  //     };
  //     setEmployees([...employees, newEmployee]);
  //   } else if (actionType === "edit") {
  //     setEmployees(
  //       employees.map((emp) =>
  //         emp.id === selectedEmployee.id ? { ...emp, ...value } : emp
  //       )
  //     );
  //   }
  //   document.getElementById("employee_modal").close();
  // };
  const handleSave = () => {
    if (actionType === "create") {
      const newEmployee = {
        ...value,
        id: Date.now(),
        profileImage: value.profileImage || "https://via.placeholder.com/56",
      };
      setEmployees([...employees, newEmployee]);
    } else if (actionType === "edit") {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id ? { ...emp, ...value } : emp
        )
      );
    }
    document.getElementById("employee_modal").close();
  };

  // Delete Employee
  const handleDelete = () => {
    setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
    document.getElementById("employee_modal").close();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue({ ...value, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Define Table Columns
  const columns = [
    {
      name: "Profile Img",
      grow: 0,
      cell: (row) => (
        <img height="56px" width="56px" alt={row.name} src={row.profileImage} />
      ),
    },
    { name: "Name", selector: (row) => row.name },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Email", selector: (row) => row.email },
    { name: "Address", selector: (row) => row.address },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="flex gap-2">
          <MdEdit
            className="text-blue-500 cursor-pointer text-xl"
            onClick={() => openModal(row, "edit")}
          />
          <MdDelete
            className="text-red-500 cursor-pointer text-xl"
            onClick={() => openModal(row, "delete")}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={"Employee Table View"}
        openModal={openModal}
        buttonName={"Add Employee"}
        menu={"Employee Table View"}
      />
      <div className="border border-gray-300 rounded-sm">
        <DataTable columns={columns} data={employees} />
      </div>
      <Modal
        actionType={actionType}
        selectedEmployee={selectedEmployee}
        value={value}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleSave={handleSave}
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default EmployeeTableView;
