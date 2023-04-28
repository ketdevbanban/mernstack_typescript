import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "../../../components/layout/AdminLayout";
interface Permission {
  id: number;
  name: string;
}

const RoleCreate = () => {
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      const { data } = await axios.get("permissions");
      setPermissions(data);
    };
    getPermissions();
  }, []);

  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("roles", {
      name,
      permissions: selected,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/admin/roles" />;
  }

  return (
    <AdminLayout>
      <div className="w-full flex justify-center h-screen p-5 drop-shadow-2xl bg-gray-200  ">
        <form
          onSubmit={submit}
          className="pt-20 p-3 bg-white w-full rounded-t-xl"
        >
          <div className="flex justify-center text-center items-center p-3 font-bold text-xl text-green-500">
            Create Role
          </div>
          <div className="w-full">
            <label className="w-full" htmlFor="name-input">
              Role Name
            </label>

            <input
              className="w-full outline-none bg-slate-300 p-2 rounded-r-xl text-lg"
              id="name-input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="text-center mb-5 font-bold text-xl">ການກຳນົດສິດ</div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 xl:grid-cols-6 text-start  bg-green-500 p-5">
            {permissions.map((p: Permission) => {
              return (
                <div className="flex justify-start gap-2 " key={p.id}>
                  <input
                    className="bg-green-500"
                    type="checkbox"
                    id={`permission-${p.id}`}
                    value={p.id}
                    onChange={() => check(p.id)}
                  />
                  <label htmlFor={`permission-${p.id}`}>{p.name}</label>
                </div>
              );
            })}
          </div>
          <div className="pt-3">
            <button className="w-full bg-green-300 rounded-full p-3 hover:bg-pink-500 hover:rounded-full">
              Save
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default RoleCreate;
