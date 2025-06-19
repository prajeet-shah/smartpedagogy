import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.user));
      navigate("/");
      console.log(res?.data?.user);

      // Add login logic here
    } catch (err) {
      navigate("/login");
      console.error("error: ", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 btn btn-sm btn-ghost"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content">
          Don’t have an account?
          <Link
            to={"/signup"}
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
