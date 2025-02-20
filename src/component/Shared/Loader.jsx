import React from "react";
import logo from "../../assets/logo.png";
const Loader = () => {
  return (
    <div
      className="wavy flex justify-center items-end"
      style={{ letterSpacing: "14px" }}>
      <span style={{ "--i": 2, paddingRight: "5px" }}>
        <img src={logo} alt="emflow Logo" width={20} />
      </span>
      <span
        style={{
          "--i": 3,
        }}>
        L
      </span>
      <span
        style={{
          "--i": 4,
          color: "#81B2F1",
        }}>
        0
      </span>
      <span
        style={{
          "--i": 5,
        }}>
        A
      </span>
      <span
        style={{
          "--i": 6,
          color: "#81B2F1",
        }}>
        D
      </span>
      <span
        style={{
          "--i": 7,
        }}>
        I
      </span>
      <span
        style={{
          "--i": 8,
          color: "#81B2F1",
        }}>
        N
      </span>
      <span
        style={{
          "--i": 9,
        }}>
        {" "}
        G
      </span>
      <span
        style={{
          "--i": 10,
          color: "#81B2F1",
        }}>
        .
      </span>
      <span
        style={{
          "--i": 11,
        }}>
        .
      </span>
      <span
        style={{
          "--i": 12,
          color: "#81B2F1",
        }}>
        .
      </span>
    </div>
  );
};

export default Loader;
