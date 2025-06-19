import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [subject, setSubject] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        email,
        password,
        role,
        ...(role === "Teacher" && { subject }),
      };

      const res = await axios.post(`${BASE_URL}/signup`, payload, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.user));
      navigate("/");
      console.log("Signup Info:", payload);
    } catch (err) {
      console.error("ERROR: ", err.response?.data?.message || err.message);
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Role */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          {/* Subject (only for Teachers) */}
          {role === "Teacher" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mathematics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input input-bordered w-full"
                required={role === "Teacher"}
              />
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
