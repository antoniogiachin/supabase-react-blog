// * reacts imports
import { useState } from "react";
// * custom components
import { AuthForm } from "../components/auth/AuthForm";

export const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="w-full h-96 grid place-items-center">
      <h2 className="text-center text-lg uppercase text-slate-100">
        {isLoginForm ? "Login" : "Register"}
      </h2>
      <div
        className={`${
          !isLoginForm && "mt-5"
        } bg-sky-900 w-2/3 py-12 flex items-center justify-center  text-slate-800 rounded-lg shadow-xl`}
      >
        <AuthForm isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} />
      </div>
    </div>
  );
};
