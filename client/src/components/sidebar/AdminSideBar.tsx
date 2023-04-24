import React, { useState } from "react";
import { FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("ຜູ້ໃຊ້ງານ", "sub1", <UserOutlined />, [
    getItem("ຜູ້ໃຊ້ງານທັງໝົດ", "3"),
    getItem("ເພີ່ມຜູ້ໃຊ້ງານ", "4"),
  ]),
  getItem("ການກຳນົດສິດນຳໃຊ້", "sub2", <TeamOutlined />, [
    getItem("ສ້າງກົດ", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export default function AdminSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
}
