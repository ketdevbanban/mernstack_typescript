import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Role } from "../../models/role";
import AdminLayout from "../../components/layout/AdminLayout";

const UserEdit = (props: any) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  console.log("Params id =>", id);
  useEffect(() => {
    (async () => {
      const response = await axios.get("roles");

      setRoles(response.data);
      console.log(response.data);

      const { data } = await axios.get(`users/${id}`);

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setRoleId(data.role.id);
      console.log("user=>", data);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`users/${id}`, {
      first_name,
      last_name,
      email,
      role_id,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/users" />;
  }

  return (
    <AdminLayout>
      <div className="mx-auto p-5 pt-20 h-screen">
        <div className="col-span-9 shadow-xl rounded px-6 bg-white pt-5 pb-7 mt-6 lg:mt-0 ">
          <form onSubmit={submit}>
            <h3 className="text-lg capitalize mb-4 font-semibold text-green-500">
              Edit User
            </h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="ຊື່ "
                    id="first_name"
                    className="form-control"
                    defaultValue={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    placeholder="ນາມສະກຸນ "
                    title="last_name"
                    id="last_name"
                    className="form-control"
                    defaultValue={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    title="email"
                    id="email"
                    className="form-control"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <select
                    title="role"
                    className="form-control-select"
                    value={role_id}
                    onChange={(e) => setRoleId(e.target.value)}
                  >
                    {roles.map((r: Role) => {
                      return (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <button className="px-6 py-2 bg-green-500 text-white  rounded-lg hover:bg-green-700">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserEdit;
