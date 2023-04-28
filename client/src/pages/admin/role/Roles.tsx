import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import axios from "axios";
import { Link } from "react-router-dom";
// import { Role } from "../../../models/role";

export default function Roles() {
  const [roles, setRoles] = useState([]);

  interface Role {
    id: number;
    name: string;
  }

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("roles");

      setRoles(data);
    })();
  }, []);
  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`roles/${id}`);

      setRoles(roles.filter((r: Role) => r.id !== id));
    }
  };
  return (
    <AdminLayout>
      <Link to="/admin/role/create">
      <div className=" bg-green-500 rounded-lg p-2 text-center items-center text-white font-bold cursor-pointer hover:bg-green-400 mb-3">
        Add Role
      </div>
      </Link>

      <div className="w-full overflow-x-scroll xl:overflow-x-hidden h-screen ">
        <table className="min-w-full bg-white  rounded">
          <thead className="bg-green-200 text-lg">
            <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8 bg-indigo-100 ">
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id} className="w-full h-16 text-center">
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <div className="flex justify-center gap-x-3">
                      <Link
                        to={`/roles/${role.id}/edit`}
                        className="p-2 rounded-lg bg-green-500"
                      >
                        Edit
                      </Link>
                      <a
                        href="#"
                        className="p-2 rounded-lg bg-orange-500"
                        onClick={() => del(role.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
