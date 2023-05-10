import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import AdminLayout from "../../../components/layout/AdminLayout";
import Swal from "sweetalert2";
interface Permission {
  id: number;
  name: string;
}

const RoleCreate = () => {
  const [permissions, setPermissions] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    try {
      const getPermissions = async () => {
        const { data } = await axios.get("permissions");
        setPermissions(data);
      };
      getPermissions();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const initialValues = {
    name: "",
    permissions: [] as number[],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Role name is required"),
  });

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await axios.post("roles", values);
      Swal.fire({
        icon: "success",
        title: "ການສ້າງ Role ສຳເລັດ",
      });

      setSubmitting(false);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    
    }
  };

  if (redirect) {
    return <Navigate to="/admin/roles" />;
  }

  return (
    <AdminLayout>
      <div className="mx-auto p-5 h-screen">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="pt-5 p-3 bg-white w-full rounded-t-xl">
              <div className="flex justify-center text-center items-center p-3 font-bold text-xl text-green-500">
                Create Role
              </div>
              <div className="w-full">
                <label className="w-full" htmlFor="name-input">
                  Role Name
                </label>
                <Field className="form-control" id="name-input" name="name" />
              </div>

              <div className="text-center mb-5 font-bold text-xl my-3">
                ການກຳນົດສິດ
              </div>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-6 text-start   border-2 border-dotted border-blue-400 rounded-xl p-5">
                {permissions.map((p: Permission) => {
                  return (
                    <div className="flex justify-start gap-2 " key={p.id}>
                      <input
                        className="bg-green-500"
                        type="checkbox"
                        id={`permission-${p.id}`}
                        value={p.id}
                        checked={values.permissions.includes(p.id)}
                        onChange={() => {
                          const newSelected = [...values.permissions];
                          if (newSelected.includes(p.id)) {
                            newSelected.splice(newSelected.indexOf(p.id), 1);
                          } else {
                            newSelected.push(p.id);
                          }
                          setFieldValue("permissions", newSelected);
                        }}
                      />
                      <label htmlFor={`permission-${p.id}`}>{p.name}</label>
                    </div>
                  );
                })}
              </div>
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-300 rounded-full p-3 hover:bg-pink-500 hover:rounded-full"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AdminLayout>
  );
};

export default RoleCreate;
