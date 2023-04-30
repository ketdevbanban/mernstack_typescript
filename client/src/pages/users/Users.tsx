import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

interface DataType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string[];
}

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data } = await axios.get("users");
      setUsers(data);
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const del = async (id: number) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        await axios.delete(`users/${id}`);

        loadUserData();
        toast.success("ການລຶບສຳເລັດ", {
          position: toast.POSITION.TOP_CENTER,
        });
        setUsers(users?.filter((u: User) => u.id !== id));
      }
    } catch (error) {
      toast.error("ການລຶບບໍ່ສຳເລັດ", {
        position: toast.POSITION.TOP_CENTER,
      });
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
        <div>
          <span onClick={() => del(record.id)} className="cursor-pointer">
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

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-end">
          <Link to="/register" className="text-lg">
            <PlusCircleOutlined
              style={{ fontSize: 30, marginRight: 7, color: "green" }}
            />
            Add
          </Link>
        </div>

        <div className="w-full overflow-x-scroll xl:overflow-x-hidden h-screen pt-3">
          <Table columns={columns} dataSource={users} />
        </div>
      </div>
    </AdminLayout>
  );
}
