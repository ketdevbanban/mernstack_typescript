import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login1: React.FC = () => {
  const [redirect, setRedirect] = useState(false);

  const onFinish = async (values: any) => {
    try {
      const { data } = await axios.post("login", values);
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
    <div
      className="flex justify-center items-center h-screen 
   bg-background-login bg-cover   bg-no-repeat 
    "
    >
      <Form
        name="normal_login"
        className="shadow-lg rounded-2xl p-5 bg-gray-100"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
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
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item className="text-center items-center">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-green-500 hover:bg-green-700"
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item className="text-center items-center bg-pink-400 rounded-2xl hover:bg-pink-700">
          <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login1;
