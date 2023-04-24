import React from "react";

export default function Topbar() {
  return (
    <div className="w-full bg-gray-700 h-[60px] flex justify-between items-center sticky top-0 z-50 ">
      <div className="text-center text-white text-3xl font-semibold">
        ket dev ban ban
      </div>
      <div className="p-2 bg-green-600 rounded-full">
        <div className="text-center text-white pr-5">ketoudone</div>
      </div>
    </div>
  );
}
