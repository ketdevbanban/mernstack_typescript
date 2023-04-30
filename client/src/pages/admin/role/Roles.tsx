import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function Roles() {
  const [roles, setRoles] = useState([]);

  interface Role {
    id: number;
    name: string;
  }
  interface DataType {
    id: number;
    name: string;
  }
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("roles");
        setRoles(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const del = async (id: number) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        await axios.delete(`roles/${id}`);

        setRoles(roles.filter((r: Role) => r.id !== id));
        toast.success("ການລຶບສິດສຳເລັດ", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.warn("ບໍ່ສາມາດລຶບໄດ້ເນຶ່ອງຈາກວ່າ ຍັງມີຜູ້ໃຊ້ກົດນີ້ຢູ່", {
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
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Actions",
      render: (record) => (
        <div className="flex ">
          <span onClick={() => del(record.id)} className="cursor-pointer">
            <DeleteOutlined
              style={{
                fontSize: "20px",
                color: "#b34969",
              }}
            />
          </span>
          <Link to={`/roles/${record.id}/edit`}>
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
      <div className="">
        <div className="flex justify-end">
          <Link to="/admin/role/create" className="text-lg">
            <PlusCircleOutlined
              style={{ fontSize: 30, marginRight: 7, color: "green" }}
            />
            Add
          </Link>
        </div>

        <div className="w-full overflow-x-scroll xl:overflow-x-hidden h-screen pt-3">
          <Table columns={columns} dataSource={roles} />
        </div>
      </div>
    </AdminLayout>
  );
}
