import React from "react";
import { Link } from "react-router-dom";

export const TheHeader = () => {
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
        <li>
          <Link className="p-2" to={"/auth"}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};
