"use client";

const LoginHeader = () => {
  return (
    <div className="flex flex-row justify-between px-32 pt-14 pb-5 border-b-4 border-primary">
      <img src="Logo.svg" alt="Recall Logo" />
      <div className="flex flex-row gap-10 items-center">
        <div className="btn btn-ghost">
          <a href="/login" className="text-primary text-xl">
            Login
          </a>
        </div>
        <div className="btn btn-primary">
          {/* Goes to login for now, sign up page later */}
          <a href="/login" className="text-secondary text-xl">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
