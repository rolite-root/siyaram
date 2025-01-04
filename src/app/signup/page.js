"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";

export default function Signup() {
  useEffect(() => {
    AOS.init({ duration: 900 });
    document.title = "Sign Up | SiyaRam";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;

    // Check if the password contains spaces
    if (/\s/.test(password)) {
      setError("Password cannot contain spaces.");
      return false;
    }

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      setSubmitted(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-purple-200 text-white p-8">
      <div className="flex w-full max-w-4xl shadow-xl rounded-lg overflow-hidden bg-gray-800" data-aos="zoom-x-out">
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 to-blue-200 flex-col items-center justify-center p-10 text-gray-700">
          <h2 className="text-4xl font-bold text-violet-500 mb-4 animate-pulse">Join Our Community</h2>
          <p className="text-lg text-center">
            Sign up to access exclusive resources and features, all available in one place.
          </p>
          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-2"><span>✓</span> Access premium resources</li>
            <li className="flex items-center gap-2"><span>✓</span> Personalized support</li>
            <li className="flex items-center gap-2"><span>✓</span> Member-only discounts</li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 bg-gray-900 p-10">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">Sign Up</h2>
          {submitted && (
            <p className="text-center text-green-400 mb-6">
              Welcome! Please check your email.
            </p>
          )}
          {error && (
            <p className="text-center text-red-400 mb-6">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-500">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-blue-500 text-blue-400 focus:ring focus:ring-blue-500 focus:outline-none transition-transform transform hover:scale-105"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-500">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-blue-500 text-blue-400 focus:ring focus:ring-blue-500 focus:outline-none transition-transform transform hover:scale-105"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-500">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-blue-500 text-blue-400 focus:ring focus:ring-blue-500 focus:outline-none transition-transform transform hover:scale-105"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-500">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-blue-500 text-blue-400 focus:ring focus:ring-blue-500 focus:outline-none transition-transform transform hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="form-checkbox text-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <label htmlFor="showPassword" className="text-sm font-medium text-blue-500">
                Show Password
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-500">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 rounded-md bg-gray-800 border border-blue-500 text-blue-400 focus:ring focus:ring-blue-500 focus:outline-none transition-transform transform hover:scale-105"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-transform transform hover:scale-110 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Create Account
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-400">Already have an account? <a href="/login" className="text-blue-400 hover:underline">Log In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
