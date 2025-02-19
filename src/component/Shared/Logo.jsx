import React from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <Link to={"/"} className="flex justify-center items-center gap-1 !pr-6">
      <img src={logo} alt="" width={50} />
      <p className="font-semibold text-2xl text-[#2946AD]">
        Em<span className="text-[#81B2F1]">FL</span>ow
      </p>
    </Link>
  );
};

export default Logo;
