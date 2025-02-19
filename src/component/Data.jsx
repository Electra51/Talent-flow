import img1 from "../assets/man1.jpeg";
import img2 from "../assets/man2.jpeg";
import img3 from "../assets/man3.jpeg";
import img4 from "../assets/man4.jpeg";
import img5 from "../assets/man5.jpeg";
import img6 from "../assets/man6.jpeg";
import img7 from "../assets/man7.jpeg";
import { MdDashboard } from "react-icons/md";
import { FaIdCard } from "react-icons/fa6";
import { BsTable } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

export const sidebarData = [
  {
    link: "/",
    label: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    link: "/employee-list",
    label: "Employee Card View",
    icon: <FaIdCard />,
  },
  {
    link: "/employee-table",
    label: "Employee Table View",
    icon: <BsTable />,
  },
];
export const sidebarDataForMobile = [
  {
    link: "/",
    label: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    link: "/employee-list",
    label: "Employee Card View",
    icon: <FaIdCard />,
  },
  {
    link: "/employee-table",
    label: "Employee Table View",
    icon: <BsTable />,
  },
  {
    link: "/profile",
    label: "Profile",
    icon: <CgProfile />,
  },
  {
    link: "/login",
    label: "Login",
    icon: <FiLogOut />,
  },
];
export const employeeData = [
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
  {
    name: "Michael Johnson",
    profileImage: img2,
    phone: "+1 555-9101",
    email: "michael.johnson@example.com",
    address: "789 Oak St, Chicago, IL 60605",
  },
  {
    name: "Emily Davis",
    profileImage: img7,
    phone: "+1 555-1122",
    email: "emily.davis@example.com",
    address: "321 Pine St, Houston, TX 77002",
  },
  {
    name: "Robert Brown",
    profileImage: img5,
    phone: "+1 555-3344",
    email: "robert.brown@example.com",
    address: "654 Maple St, San Francisco, CA 94103",
  },
  {
    name: "Olivia Wilson",
    profileImage: img4,
    phone: "+1 555-5566",
    email: "olivia.wilson@example.com",
    address: "987 Cedar St, Miami, FL 33101",
  },
  {
    name: "David Martinez",
    profileImage: img3,
    phone: "+1 555-7788",
    email: "david.martinez@example.com",
    address: "159 Birch St, Seattle, WA 98101",
  },
];
