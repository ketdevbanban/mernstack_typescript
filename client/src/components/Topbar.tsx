import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
export default function Topbar() {
  return (
    <header className="w-full bg-green-500 h-[60px] flex justify-between items-center sticky top-0 z-50 drop-shadow-lg">
      <div className="flex items-center gap-x-3">
        <a href="/">
          <img
            src="https://yt3.googleusercontent.com/Z7eNwMJPppYF6gzn2vCVn5F_-9KNCDIr_7J6sn2zMGkVeh4LhLUx_WjBKPon68uUD09Ds6rMQ_U=s176-c-k-c0x00ffffff-no-rj"
            alt="logo"
            width="50"
            height="50"
          />
        </a>
        <span className="text-xl text-blue-900">Ket Dev ban ban</span>
      </div>

      <div className="flex text-center items-center">
        <div className="text-center items-center">
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <Link to="/login">
          <button className="text-center text-white pr-5 items-center pl-2">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}
