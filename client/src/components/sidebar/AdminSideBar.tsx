import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { AdminNavdata } from "../../data/data";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function AdminSideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        defaultOpenKeys={["1", "2", "3"]}
        mode="inline"
        className="font-semibold"
        theme="dark"
      >
        {AdminNavdata.map((m) => (
          
          <SubMenu key={m.id} icon={m.icon} title={m.title}>
            {m?.Menu_item?.map((mm) => (
              <Menu.Item key={mm.id}>
                <Link to={mm.link}>
                  {mm.icon}
                  <span className="pl-2">{mm.label}</span>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
}
