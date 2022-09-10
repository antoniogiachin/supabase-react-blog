import React from "react";
import { Link } from "react-router-dom";
// * REDUX
import { useSelector } from "react-redux";

export const TheHeader = () => {
  // ! check se loggato
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center h-14 bg-lime-400 shadow-lg shadow-bottom px-8">
      <ul>
        <li>
          <h1>
            <Link className="p-2" to={"/"}>
              Tony's Blog!
            </Link>
          </h1>
        </li>
      </ul>
      <ul className="flex items-center space-x-5">
        <li>
          <Link className="p-2" to={"/"}>
            Home
          </Link>
        </li>
        {!isLogged && (
          <li>
            <Link className="p-2" to={"/auth"}>
              Login
            </Link>
          </li>
        )}
        {isLogged && (
          <li>
            <Link className="p-2" to={"/dashboard"}>
              Dashboard
            </Link>
          </li>
        )}
        {isLogged && <li className="cursor-pointer">Logout</li>}
      </ul>
    </nav>
  );
};
