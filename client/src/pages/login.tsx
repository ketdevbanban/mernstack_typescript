import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("login", {
        email,
        password,
      });
      console.log(data);
      toast.success(data, {
        position: toast.POSITION.TOP_CENTER,
      });

      setRedirect(true);
    } catch (error) {
      console.log(error);
      toast.warn("ເຂົ້າລະບົບບໍ່ສຳເລັດ!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex justify-center h-screen text-center items-center bg-gray-800">
      <form onSubmit={submit} className="shadow-xl p-5 bg-gray-200 rounded-lg">
        <h1 className="text-2xl font-semibold">ເຂົ້າສູ່ລະບົບ</h1>

        <input
          type="email"
          className="w-full p-2 rounded-lg m-2 outline-none text-center items-center"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 rounded-lg m-2 outline-none text-center items-center"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full p-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full text-white hover:text-gray-950"
          type="submit"
        >
          ເຂົ້າສູ່ລະບົບ
        </button>
      </form>
    </main>
  );
}
