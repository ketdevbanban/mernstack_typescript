import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login(): JSX.Element {
  const [redirect, setRedirect] = useState(false);

  const submit = async (values: LoginFormValues) => {
    try {
      const { data } = await axios.post("login", values);
      console.log("ms from api=>", data);
      toast.success(data, {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.warning(data.message, {
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
    <main className="flex justify-center h-screen text-center items-center   bg-background-login bg-cover   bg-no-repeat ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched }) => (
          <Form className="shadow-xl p-5 bg-gray-300 rounded-lg w-[270px]">
            <div className="flex items-center gap-x-3 mb-3">
              <a href="/">
                <img
                  src="https://yt3.googleusercontent.com/Z7eNwMJPppYF6gzn2vCVn5F_-9KNCDIr_7J6sn2zMGkVeh4LhLUx_WjBKPon68uUD09Ds6rMQ_U=s176-c-k-c0x00ffffff-no-rj"
                  alt="logo"
                  width="50"
                  height="50"
                  className="rounded-full ring-4 ring-blue-500 ring-offset-2"
                />
              </a>
              <span className="text-xl text-blue-900">Ket Dev ban ban</span>
            </div>
            <h1 className="text-2xl font-semibold">ເຂົ້າສູ່ລະບົບ</h1>

            <Field
              name="email"
              className="w-full p-2 rounded-lg m-2 outline-none text-center items-center"
              placeholder="Email"
              required
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              name="password"
              type="password"
              className="w-full p-2 rounded-lg m-2 outline-none text-center items-center"
              placeholder="Password"
              required
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            <button
              className="w-full p-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full text-white hover:text-gray-950"
              type="submit"
            >
              ເຂົ້າສູ່ລະບົບ
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
