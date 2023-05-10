import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/layout/AdminLayout";
import axios from "axios";
import Swal from "sweetalert2";
interface Permission {
  id: number;
  name: string;
}

const RoleEdit = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get("permissions");
        setPermissions(response.data);

        const { data } = await axios.get(`roles/${id}`);

        form.setFieldsValue({ name: data.name });
        setSelected(data.permissions.map((p: Permission) => p.id));
      })();
    } catch (e) {
      console.log(e);
    }
  }, [form, id]);

  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const onFinish = async (values: any) => {
    try {
      await axios.put(`roles/${id}`, {
        name: values.name,
        permissions: selected,
      });
      Swal.fire("ແກ້ໄຂສຳເລັດ", "ທ່ານໄດ້ແກ້ໄຂ Role ສຳເລັດແລ້ວ", "success");

      navigate("/admin/roles");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="h-screen">
        <Form
          form={form}
          onFinish={onFinish}
          className="pt-5 p-3 bg-white w-full rounded-t-xl"
        >
          <div className="flex justify-center text-center items-center p-3 font-bold text-xl text-green-500">
            Edit Role
          </div>
          <Form.Item name="name" label="Role Name">
            <Input placeholder="Enter role name" />
          </Form.Item>
          <div className="text-center mb-5 font-bold text-xl my-3">
            ການກຳນົດສິດ
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-6 text-start   border-2 border-dotted border-blue-400 rounded-xl p-5">
            {permissions.map((p: Permission) => {
              return (
                <div className="flex justify-start gap-2" key={p.id}>
                  <Checkbox
                    value={p.id}
                    checked={selected.some((s) => s === p.id)}
                    onChange={() => check(p.id)}
                  />
                  <label htmlFor="form-check-label">{p.name}</label>
                </div>
              );
            })}
          </div>
          <div className="pt-3 text-center flex justify-center items-center">
            <Button
              type="primary"
              htmlType="submit"
              className="px-4 py-2 rounded-full transition duration-500 ease-in-out focus:outline-none opacity-75 hover:opacity-100  bg-white border border-gray-400 text-black shadow-lg w-[200px] itmem-center"
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default RoleEdit;
