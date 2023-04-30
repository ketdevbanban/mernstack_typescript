import React, { useState } from "react";
import Input from "../components/input/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface FormData {
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
  email: string;
  role_id: number;
}

const RegistrationForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
    email: "",
    role_id: 3, // added role_id property with default value
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("register", formData);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="mx-auto p-5  h-screen">
        <div className="w-full h-screen pt-20">
          <div className="flex justify-center text-green-600 text-6xl text-bold mb-5">
            User Register
          </div>
          <form
            onSubmit={handleSubmit}
            className="shadow-xl white p-10 border-2 border-green-500 rounded-t-xl"
          >
            <div className="space-y-4">
              <div className="grid  md:grid-cols-2 lg:grid-cols-2  gap-4">
                <div>
                  <Input
                    type="text"
                    id="first_name"
                    label="First Name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="last_name"
                    label="Last Name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    id="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    id="password_confirm"
                    label="Password Confirm"
                    value={formData.password_confirm}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    type="password"
                    id="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <button
              className="p-2 bg-green-500 rounded-lg w-[200px] text-white"
              type="submit"
            >
              + Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
