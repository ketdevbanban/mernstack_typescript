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
        id: 11,
        link: "/users",
        icon: <UserSwitchOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "ຜູ້ໃຊ້ທັງໝົດ",
      },
      {
        id: 12,
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
        id: 21,
        link: "/admin/roles",
        icon: <UnlockOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "All Roles",
      },
      {
        id: 22,
        link: "/admin/role/create",
        icon: <PlusOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "Add Role",
      },
    ],
  },
  {
    id: 3,

    icon: <UnlockOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
    title: "Products",

    Menu_item: [
      {
        id: 31,
        link: "/admin/products",
        icon: <UnlockOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "All Products",
      },
      {
        id: 32,
        link: "/admin/products/create",
        icon: <PlusOutlined style={{ fontSize: 20, color: "#e310ab" }} />,
        label: "Add Product",
      },
    ],
  },
];
