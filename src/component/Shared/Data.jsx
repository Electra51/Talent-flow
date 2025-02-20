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
