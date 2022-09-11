import React from "react";
// * custom components imports
import { TheButton } from "../components/UI/TheButton";

export const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1">
        <div className="flex justify-end">
          <TheButton width={"w-1/3"} padding={"px-2 py-4"} type="secondary" />
        </div>
      </div>
    </div>
  );
};
