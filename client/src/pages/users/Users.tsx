import axios from "axios";
import React, { useEffect, useState } from "react";
// import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
// import Paginator from "../../components/Paginator";

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
      <div className="p-2 bg-green-500 w-[70px] text-center items-center rounded-full text-white">
        <Link to="/users/create" className="text-lg">
          Add
        </Link>
      </div>

      <div className="w-full overflow-x-scroll xl:overflow-x-hidden h-screen">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded">
          <thead className="bg-green-200 text-lg ">
            <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8 bg-indigo-100">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user?.role?.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/users/${user.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <a
                        href="#"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(user.id)}
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
