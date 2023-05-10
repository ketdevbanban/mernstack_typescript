import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

import { User } from "../models/user";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Topbar = (props: { user: User }) => {
  const logout = async () => {
    try {
      const { data } = await axios.post("logout", {});
      toast.success(data, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="w-full bg-green-500 h-[60px] flex justify-between items-center sticky top-0 z-50 drop-shadow-lg">
      <div className="flex items-center gap-x-3 ml-5">
        <a href="/">
          <img
            src="https://yt3.googleusercontent.com/Z7eNwMJPppYF6gzn2vCVn5F_-9KNCDIr_7J6sn2zMGkVeh4LhLUx_WjBKPon68uUD09Ds6rMQ_U=s176-c-k-c0x00ffffff-no-rj"
            alt="logo"
            width="50"
            height="50"
            className="rounded-full ring-2 ring-blue-900 ring-offset-2"
          />
        </a>
        <span className="text-2xl text-white font-bold ">Ket Dev ban ban</span>
      </div>

      <div className="flex text-center items-center">
        <Link to={`/users/${props.user.id}/edit`}>
          <UserOutlined
            style={{ fontSize: "30px", padding: "10px", color: "#edf5f4" }}
          />
          <button className="text-center text-white pr-5 items-center pl-2">
            {props?.user?.name}
          </button>
        </Link>

        <Link to="/login" onClick={logout}>
          <LogoutOutlined
            style={{ fontSize: "30px", padding: "10px", color: "#d9183e" }}
          />
          <span className="text-white">Logout</span>
        </Link>
      </div>
    </header>
  );
};

export default connect((state: { user: User }) => {
  return {
    user: state.user,
  };
})(Topbar);
