import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrTransaction, GrUserSettings } from "react-icons/gr";
import { IoDocumentOutline, IoSettingsOutline } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TfiViewGrid } from "react-icons/tfi";

export const sidebarItems = [
  {
    key: "",
    label: "Overview",
    path: "",
    icon: <RxDashboard size={20} />,
  },
  {
    key: "users-list",
    label: "User Management",
    path: "users-list",
    icon: <FaRegCircleUser size={20} />,
  },
  {
    key: "categories",
    label: "Category",
    path: "categories",
    icon: <TfiViewGrid size={20} />,
  },
  {
    key: "transaction",
    label: "Transaction",
    path: "transaction",
    icon: <GrTransaction size={20} />,
  },
  {
    key: "transaction",
    label: "Transaction",
    path: "transaction",
    icon: <GrTransaction size={20} />,
  },
  {
    key: "transaction",
    label: "Transaction",
    path: "transaction",
    icon: <GrTransaction size={20} />,
  },
  {
    key: "all-admin",
    label: "Admin Manage",
    path: "all-admin",
    icon: <GrUserSettings size={20} />,
  },

  {
    key: "changePassword",
    label: "Change Password",
    path: "changePassword",
    icon: <CiLock size={20} />,
  },
  {
    key: "setting",
    label: "Setting",
    path: "setting",
    icon: <IoSettingsOutline size={20} />,
  },
  {
    key: "cms",
    label: "Content Manage",
    path: "cms",
    icon: <IoDocumentOutline size={20} />,
    children: [
      {
        key: "terms-condition",
        label: "Terms Condition",
        path: "terms-condition",
        icon: <AiOutlineSafetyCertificate size={20} />,
      },
      {
        key: "policy",
        label: "Privacy Policy",
        path: "policy",
        icon: <PiUsersThreeLight size={20} />,
      },
      {
        key: "about",
        label: "About Us",
        path: "about",
        icon: <PiUsersThreeLight size={20} />,
      },
      {
        key: "faq",
        label: "FAQ",
        path: "faq",
        icon: <PiUsersThreeLight size={20} />,
      },
    ],
  },
];
