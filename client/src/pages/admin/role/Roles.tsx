import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import Swal from "sweetalert2";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Role } from "../../../models/role";

export default function Roles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        try {
          const { data } = await axios.get("roles");
          setRoles(data);
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const del = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "ເຈົ້າຕ້ອງການລຶບແທ້ບໍ່",
        text: "ຖ້າເຈົ້າລຶບ ຈະບໍ່ສາມາດກູ້ຄືນມາໄດ້",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ຕ້ອງການລຶບ",
      });

      if (result.isConfirmed) {
        Swal.fire("ລຶບສຳເລັດ", "ຖ້າທ່ານລຶມຈະບໍ່ສາມາດກູຄືນໄດ້", "success");
        await axios.delete(`roles/${id}`);

        setRoles(roles.filter((r: Role) => r.id !== id));
      }
    } catch (error) {
      toast.warn("ບໍ່ສາມາດລຶບໄດ້ເນຶ່ອງຈາກວ່າ ຍັງມີຜູ້ໃຊ້ກົດນີ້ຢູ່", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const columns: ColumnsType<Role> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Id",
      render: (record) =>
        record.name == "Admin" ? (
          <span>
            <CheckOutlined style={{ fontSize: "30px", color: "#13ed87" }} />
          </span>
        ) : (
          <span>
            <CloseOutlined style={{ fontSize: "30px", color: "#c91038" }} />
          </span>
        ),
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
          <Table
            columns={columns}
            dataSource={roles}
            bordered
            size="middle"
            scroll={{ y: 500 }}
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: "30px",
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
              width: "100%",
            }}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
