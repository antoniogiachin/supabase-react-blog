// * react imports
import { useState } from "react";
// * custom hooks
import { useAuth } from "../../hooks/useAuth";

export const AuthForm = ({ isLoginForm, setIsLoginForm }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, isPendind, handleRegister, handleLogin } = useAuth(payload);

  return (
    <form onSubmit={isFormLogin ? handleLogin : handleRegister}>
      {!isLoginForm && (
        <div className="mt-3 flex flex-col space-y-1">
          <label>firstname:</label>
          <input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            className="rounded p-2 text-slate-800 text-sm"
            type="text"
          />
        </div>
      )}
      {!isLoginForm && (
        <div className="mt-3 flex flex-col space-y-1">
          <label>lastname:</label>
          <input
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            className="rounded p-2 text-slate-800 text-sm"
            type="text"
          />
        </div>
      )}
      <div className="mt-3 flex flex-col space-y-1">
        <label>email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="rounded p-2 text-slate-800 text-sm"
          type="email"
        />
      </div>
      <div className="mt-3 flex flex-col space-y-1">
        <label>password:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="rounded p-2 text-slate-800 text-sm"
          type="password"
        />
      </div>
      <div className="mt-3 flex justify-end space-x-2">
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
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
        >
          {isLoginForm ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
};
