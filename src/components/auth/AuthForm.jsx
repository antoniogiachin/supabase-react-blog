// * react imports
import { useEffect } from "react";
import { useState } from "react";
// * custom hooks
import { useAuth } from "../../hooks/useAuth";
import { TheButton } from "../UI/TheButton";

export const AuthForm = ({ isLoginForm, setIsLoginForm }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const { errors, isPending, handleRegister, handleLogin } = useAuth();

  useEffect(() => {
    setShowErrors(true);
    setTimeout(() => {
      setShowErrors(false);
    }, 2500);
  }, [errors]);

  const doRegister = () => {
    const payload = {
      firstname,
      lastname,
      birthDate,
      email,
      password,
    };
    console.log(payload);
    handleRegister(payload);
  };

  const doLogin = () => {
    const payload = {
      email,
      password,
    };
    handleLogin(payload);
  };

  return (
    <form className="grid grid-cols-1 gap-6">
      {!isLoginForm && (
        <label>
          <span className="text-gray-100">Firstname: </span>
          <input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            type="text"
            className="text-gray-800 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
          />
        </label>
      )}
      {!isLoginForm && (
        <label>
          <span className="text-gray-100">Lastname: </span>
          <input
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            type="text"
            className="text-gray-800 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
          />
        </label>
      )}
      {!isLoginForm && (
        <label>
          <span className="text-gray-100">Birth date: </span>
          <input
            onChange={(e) => setBirthDate(e.target.value)}
            value={birthDate}
            type="date"
            className="text-gray-800 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
          />
        </label>
      )}
      {/* email  */}
      <label className="block">
        <span className="text-gray-100">Email: </span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="text-gray-800 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
        />
      </label>
      {/* password  */}
      <label className="block">
        <span className="text-gray-100">Password: </span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="text-gray-800 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
        />
      </label>
      <div className="mt-1 flex justify-end space-x-2">
        <p
          onClick={() => {
            setIsLoginForm(
              (prevIsLoginForm) => (prevIsLoginForm = !prevIsLoginForm)
            );
          }}
          className="text-xs text-cyan-300 font-bold hover:underline cursor-pointer self-center "
        >
          {isLoginForm ? "Not registered yet?" : "Already registered?"}
        </p>
        <TheButton
          type={"secondary"}
          label={isLoginForm ? "Login" : "Register"}
          isPending={isPending}
          onClick={isLoginForm ? doLogin : doRegister}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-red-500">{errors && showErrors && errors.message}</p>
        <p className="text-red-500">
          {isLoginForm &&
            showErrors &&
            errors &&
            errors.advice &&
            "Register first!"}
          {!isLoginForm &&
            showErrors &&
            errors &&
            errors.advice &&
            "Use already registered!"}
        </p>
      </div>
    </form>
  );
};
