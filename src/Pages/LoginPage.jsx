import React, { useState } from "react";
import Logo from "../component/Shared/Logo";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import HelmetReact from "../component/Shared/HelmetReact";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogin = async () => {
    setLoading(true);
    const { email, password } = value;
    if (email === "admin@admin.com" && password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ email }));
      toast.success("Login successfully!");
      navigate("/");
    } else {
      toast.error("Invalid username or password. Please try again.");
      setErrors({
        email: "Invalid username",
        password: "Invalid password",
      });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] text-black dark:text-white flex flex-col justify-center items-center h-[100vh]">
      <HelmetReact title={"EmFLow | Login"} />
      <Logo />
      <form className="!p-1 !mt-5">
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={value.email}
            onChange={handleChange}
            placeholder="Email"
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } dark:border-[#3c3c3c] dark:bg-[#111111] text-gray-700 dark:text-gray-200 !rounded-[2px] w-full !py-1 !px-1.5`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="!mt-2">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={value.password}
            onChange={handleChange}
            placeholder="password"
            className={`border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } dark:border-[#3c3c3c] dark:bg-[#111111] text-gray-700 dark:text-gray-200 !rounded-[2px] w-full !py-1 !px-1.5`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="bg-[#2A46AD] dark:bg-[#2A46AD] text-white !px-2.5 !py-1 rounded-[2px] text-[14px] cursor-pointer w-full !mt-5"
          disabled={loading}>
          {loading ? (
            <span>
              Loading
              <span className="loading loading-dots loading-xs !pl-1"></span>
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="text-center font-normal text-[14px] !mt-3">
        <p>
          <span className="underline">Username:</span> admin@admin.com
        </p>
        <p>
          <span className="underline">Password:</span> admin123
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
