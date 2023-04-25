import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export default function Topbar() {
  return (
    <div className="w-full bg-gray-700 h-[60px] flex justify-between items-center sticky top-0 z-50 ">
      <div className="text-center text-white text-3xl font-semibold">
        ket dev ban ban
      </div>
      <div className="flex text-center items-center">
        <div className="text-center items-center">
          <Avatar size={40} icon={<UserOutlined />} />
        </div>

        <div className="text-center text-white pr-5 items-center pl-2">
          ketoudone
        </div>
      </div>
    </div>
  );
}
