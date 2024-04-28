"use client";

import React from "react";
import LoginHeader from "../LoginHeader";

const Login = () => {
  return (
    <div className="flex flex-col bg-secondary min-h-full">
      <LoginHeader />
      <div className="flex flex-col sm:px-32 px-10 sm:py-64 py-10 justify-start text-left gap-14">
        <div className="flex flex-col gap-5">
          <div className="text-3xl text-primary">
            Improve your learning today!
          </div>
          <div className="text-3xl font-semibold">What's your name?</div>
        </div>
        <label className="input input-bordered flex items-center gap-2 max-w-4xl">
          <input
            type="text"
            className="grow text-black"
            placeholder="Enter your name here"
          />
          <span className="btn btn-submit">Submit</span>
        </label>
      </div>
    </div>
  );
};

export default Login;
