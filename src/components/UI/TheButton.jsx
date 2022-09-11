import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";

export const TheButton = (props) => {
  const buttonType = useMemo(() => {
    switch (props.type) {
      case "warning":
        return {
          colors: "bg-yellow-400 text-black",
          hover: "hover:bg-yellow-600 hover:shadow-lg",
          focus:
            "focus:bg-yellow-300 focus:shadow-lg focus:outline-none focus:ring-0",
          active: "active:bg-gray-400 active:shadow-lg",
        };
      case "danger":
        return {
          colors: "bg-red-400 text-black",
          hover: "hover:bg-red-600 hover:shadow-lg",
          focus:
            "focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0",
          active: "active:bg-gray-400 active:shadow-lg",
        };
      case "secondary":
        return {
          colors: "bg-gray-400 text-black",
          hover: "hover:bg-gray-600 hover:shadow-lg",
          focus:
            "focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0",
          active: "active:bg-gray-400 active:shadow-lg",
        };
      default:
        return {
          colors: "bg-green-400 text-black",
          hover: "hover:bg-green-600 hover:shadow-lg",
          focus:
            "focus:bg-green-300 focus:shadow-lg focus:outline-none focus:ring-0",
          active: "active:bg-green-400 active:shadow-lg",
        };
    }
  }, [props.type]);

  return (
    <button
      onClick={props.onClick}
      type="button"
      className={`flex ${props.width} ${props.customClasses} items-center  ${
        props.padding
      } ${
        buttonType.colors
      } font-medium  leading-tight uppercase rounded shadow-md ${
        buttonType.hover
      }${buttonType.active} ${
        buttonType.focus
      } transition duration-150 ease-in-out ${
        props.isPending && "opacity-20 cursor-not-allowed"
      }`}
      disabled={props.isPending}
    >
      {props.isPending && (
        <svg
          className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {props.icon && (
        <FontAwesomeIcon className="mr-2" icon={props.icon}></FontAwesomeIcon>
      )}
      <span> {props.label}</span>
    </button>
  );
};

TheButton.defaultProps = {
  type: "success",
  label: "Insert label",
  isPending: false,
  padding: "px-6 py-2.5",
  customClasses: "justify-between text-xs",
};
