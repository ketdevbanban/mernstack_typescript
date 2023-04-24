import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
try {
    const { data } = await axios.post("register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm: passwordConfirm,
      });
  
      console.log(data);
      toast.success(data, {
        position: toast.POSITION.TOP_CENTER,
      });
  
      setRedirect(true);
} catch (error) {
    console.log(error);
    toast.error("ການລົງທະບຽນບໍ່ສຳເລັດ !!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
}
   
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="flex justify-center text-center h-screen items-center bg-gray-800">
      <form
        onSubmit={submit}
        className="form shadow-4xl p-5 bg-green-100 rounded-xl"
      >
        <h1 className="text-2xl pb-3 font-semibold">ກະລຸນາ ລົງທະບຽນ</h1>

        <div className="w-full">
          <label htmlFor="floatingInput">ຊື່</label>
          <input
            className="w-full outline-none bg-white p-2 text-center rounded-lg m-2"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-floating">
          <label htmlFor="floatingInput">ນາມສະກຸນ</label>
          <input
            className="w-full outline-none bg-white p-2 text-center rounded-lg m-2"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-floating">
          <label htmlFor="floatingInput">Email address</label>
          <input
            type="email"
            className="w-full outline-none bg-white p-2 text-center rounded-lg m-2"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-floating">
          <label htmlFor="floatingPassword">ລະຫັດຜ່ານ</label>
          <input
            type="password"
            className="w-full outline-none bg-white p-2 text-center rounded-lg m-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-floating">
          <label htmlFor="floatingPassword">ຢືນຢັນລະຫັດຜ່ານ</label>
          <input
            type="password"
            className="w-full outline-none bg-white p-2 text-center rounded-lg m-2"
            id="floatingPassword"
            placeholder="Password Confirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button
          className="w-full p-2 bg-green-500 pt-3 rounded-full hover:bg-pink-500 hover:text-white"
          type="submit"
        >
          ບັນທຶກການລົງທະບຽນ
        </button>
      </form>
    </main>
  );
}
