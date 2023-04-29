import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
        role_id: 3,
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
    <>
      <div className="mx-auto p-5  h-screen">
        <Link to="/">
          <div className="flex justify-end mb-2">
            <button className=" p-2 bg-blue-500 rounded-lg cursor-pointer text-white">
              Back Home
            </button>
          </div>
        </Link>
        <div className="col-span-9 shadow-xl rounded px-6  border-2 border-t-green-500 pt-5 pb-7 mt-6 lg:mt-0 ">
          <form onSubmit={submit}>
            <h1 className="text-2xl pb-3 font-semibold text-center text-green-500">
              ກະລຸນາ ລົງທະບຽນ
            </h1>
            <div className="space-y-4">
              <div className="grid  md:grid-cols-2 lg:grid-cols-2  gap-4">
                <div>
                  <input
                    className="form-control"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    className="form-control"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password Confirm"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                className="w-[200px] p-2 bg-green-500 pt-3 rounded-full hover:bg-pink-500 hover:text-white text-center"
                type="submit"
              >
                ບັນທຶກການລົງທະບຽນ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
