import React from "react";
// * custom components imports
import { TheButton } from "../components/UI/TheButton";
import { TheModal } from "../components/UI/TheModal";
// * font awasome
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// * REDUX
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_MODAL } from "../store/slicers/modalSlice";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.show);
  const modalId = useSelector((state) => state.modal.id);

  return (
    <div>
      <div className="grid grid-cols-1">
        <div className="flex justify-end">
          <TheButton
            width={"w-1/4"}
            padding={"px-3 py-4"}
            customClasses={"font-lg space-x-3"}
            type="secondary"
            icon={faPlusCircle}
            label="Are you an author?"
            onClick={() => {
              dispatch(SET_SHOW_MODAL({ show: true, id: "dashboardAuthorModal" }));
            }}
          />
        </div>
        {/* AUTHOR SIGN MODAL  */}
        {showModal && modalId === "dashboardAuthorModal" && (
          <TheModal type={"closable"} />
        )}
      </div>
    </div>
  );
};
