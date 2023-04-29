import axios from "axios";
import React, { useEffect, useState } from "react";
// import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string[];
}

export default function Users() {
  const [users, setUsers] = useState([]);

  const loadUserData = async () => {
    try {
      const { data } = await axios.get("users");
      setUsers(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "email",
      render: (record) => record?.name,
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="flex">
          <span
            onClick={() => del(record.id)}
            className="cursor-pointer ml-auto"
          >
            <DeleteOutlined
              style={{
                fontSize: "20px",
                color: "#b34969",
              }}
            />
          </span>
          <Link to={`/users/${record.id}/edit`}>
            <span>
              <EditOutlined
                style={{
                  fontSize: "20px",
                  color: "#b34969",
                  marginLeft: "5px",
                }}
              />
            </span>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    loadUserData();
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`users/${id}`);
      loadUserData();
      setUsers(users?.filter((u: User) => u.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="">
      <div className="flex justify-end">
          <Link to="/register" className="text-lg">
            <button className="p-1 bg-green-500 rounded-lg text-white items-center mb-2 mr-5">
            + Add
            </button>
          </Link>
          </div>

        <div className="w-full overflow-x-scroll xl:overflow-x-hidden h-screen">
          <Table columns={columns} dataSource={users} />
        </div>
      </div>
    </AdminLayout>
  );
}
