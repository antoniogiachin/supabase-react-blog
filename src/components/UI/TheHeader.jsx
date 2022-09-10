import React from "react";
import { Link } from "react-router-dom";
// * REDUX
import { useSelector, useDispatch } from "react-redux";
import { SET_SHOW_MODAL } from "../../store/slicers/modalSlice";
// * FONT AWASOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSwatchbook } from "@fortawesome/free-solid-svg-icons";

export const TheHeader = () => {
  const dispatch = useDispatch();
  // ! check se loggato
  const isLogged = useSelector((state) => state.auth.isLogged);
  // ! handleLogout
  const openModal = () => {
    dispatch(SET_SHOW_MODAL(true));
  };

  return (
    <nav className="fixed top-0 w-full flex justify-between items-center h-14 bg-lime-400 shadow-lg shadow-bottom px-8">
      <ul>
        <li>
          <h1>
            <Link className="p-2 flex space-x-2 items-center" to={"/"}>
              <span>Tony's Blog!</span>
              <FontAwesomeIcon icon={faSwatchbook} />
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
        {isLogged && (
          <li className="cursor-pointer" onClick={openModal}>
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
};
