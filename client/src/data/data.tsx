import {
  UserSwitchOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UnlockOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export const AdminNavdata = [
  {
    id: 1,

    icon: <UsergroupAddOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
    title: "ຜູ້ໃໍຊ້ງານ",

    Menu_item: [
      {
        id: 1,
        link: "/users",
        icon: <UserSwitchOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "ຜູ້ໃຊ້ທັງໝົດ",
      },
      {
        id: 2,
        link: "/register",
        icon: <UserAddOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "ເພີ່ມຜູ້ໃຊ້ງານ",
      },
    ],
  },
  {
    id: 2,

    icon: <UnlockOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
    title: "Roles",

    Menu_item: [
      {
        id: 1,
        link: "/admin/roles",
        icon: <UnlockOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "All Roles",
      },
      {
        id: 2,
        link: "/admin/slider",
        icon: <PlusOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "Add Role",
      },
      {
        id: 3,
        link: "/admin/slider",
        icon: <LockOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "Permissions",
      },
    ],
  },
];
