import React from "react";
import AdminLayout from "../../../components/layout/AdminLayout";

export default function AllRoles() {
  return (
    <AdminLayout>
      <div className="h-screen flex drop-shadow-xl bg-slate-300">
        <form>
          <input
            type="text"
            placeholder="Add "
            className="bg-gray-200 p-2 w-full"
          />
        </form>
      </div>
    </AdminLayout>
  );
}
