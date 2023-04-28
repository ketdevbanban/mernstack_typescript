import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface MenuItem {
  key: string;
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface SubMenuItem {
  key: string;
  title: string;
  path: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  subMenuItems?: { [key: string]: SubMenuItem[] };
}

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/dashboard",
  },
  {
    key: "users",
    title: "Users",
    icon: <UserOutlined />,
    path: "/users",
  },
  {
    key: "teams",
    title: "Teams",
    icon: <TeamOutlined />,
    path: "/teams",
  },
  {
    key: "logout",
    title: "Logout",
    icon: <LogoutOutlined />,
    path: "/logout",
  },
];


const subMenuItems: { [key: string]: SubMenuItem[] } = {
  teams: [
    {
      key: "subteam1",
      title: "Subteam 1",
      path: "/teams/subteam1",
    },
    {
      key: "subteam2",
      title: "Subteam 2",
      path: "/teams/subteam2",
    },
  ],
};


const UserSideBar: React.FC<SidebarProps> = ({ menuItems, subMenuItems }) => {
  const [collapsed, setCollapsed] = useState(false);

  const renderSubMenuItems = (subMenuItems: SubMenuItem[]) => {
    return subMenuItems.map((subMenuItem) => (
      <Menu.Item key={subMenuItem.key}>
        <Link to={subMenuItem.path}>{subMenuItem.title}</Link>
      </Menu.Item>
    ));
  };

  const renderMenuItems = () => {
    return menuItems.map((menuItem) =>
      subMenuItems && subMenuItems[menuItem.key] ? (
        <SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.title}>
          {renderSubMenuItems(subMenuItems[menuItem.key])}
        </SubMenu>
      ) : (
        <Menu.Item key={menuItem.key} icon={menuItem.icon}>
          <Link to={menuItem.path}>{menuItem.title}</Link>
        </Menu.Item>
      )
    );
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {renderMenuItems()}
      </Menu>
    </Sider>
  );
};

export default UserSideBar;
