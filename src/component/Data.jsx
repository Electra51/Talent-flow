import { BiCategoryAlt, BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegBookmark, FaRegUserCircle } from "react-icons/fa";
import { IoArrowBackSharp, IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdListAlt,
  MdOutlineAddchart,
  MdOutlineCategory,
} from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { RiFileEditLine } from "react-icons/ri";
import { TbShoppingCartCopy } from "react-icons/tb";
export const navData = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/services",
    title: "Services",
  },
  {
    path: "/shop",
    title: "Shop",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/contact",
    title: "Contact",
  },
];

export const sidebarData = [
  {
    link: "/employee-list",
    label: "Employee Card View",
    icon: <LuLayoutDashboard />,
  },
  {
    link: "/employee-table",
    label: "Employee Table View",
    icon: <PiUserListBold />,
  },

  {
    link: "/dashboard/settings",
    label: "Settings",
    icon: <IoSettingsOutline />,
  },
  {
    link: "/",
    label: "Back To Home",
    icon: <IoArrowBackSharp />,
  },
];
