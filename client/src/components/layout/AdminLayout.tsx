import React from "react";
import { Layout } from "antd";

import Topbar from "../Topbar";
import AdminSideBar from "../sidebar/AdminSideBar";

const { Content } = Layout;
export default function AdminLayout({ children }: any) {
  return (
    <Layout>
      <Topbar />
      <Layout>
        <AdminSideBar />
        <Layout>
          <Content style={{ padding: "10px" }}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
