import React, { useMemo, useEffect, useState } from "react";
import ReactDom from "react-dom";
// * custom components
import { TheButton } from "./TheButton";
// * styles
import styles from "./TheModal.module.css";
// * REDUX
import { Provider, useDispatch } from "react-redux";
import { SET_SHOW_MODAL } from "../../store/slicers/modalSlice";
// * fontawasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export const TheModal = (props) => {
  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();
  const closeDialog = () => {
    dispatch(SET_SHOW_MODAL(false));
  };

  useEffect(() => {
    setShowErrors(true);
    setTimeout(() => {
      setShowErrors(false);
    }, 2500);
  }, [props.errors]);

  const setClass = useMemo(() => {
    switch (props.type) {
      case "closable":
        return "containerbig";

      default:
        return "containerlittle";
    }
  }, [props.type]);


  return ReactDom.createPortal(
    <div className={styles.modal}>
      <div className={styles[setClass]}>
        {props.type === "closable" ? (
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="uppercase text-center font-bold text-lg">
                {props.message}
              </h3>
              <div className=" opacity-50 hover:opacity-100 cursor-pointer ">
                <FontAwesomeIcon icon={faCircleXmark} onClick={closeDialog} />
              </div>
            </div>
            <div>{props.body}</div>
            <div className="flex justify-end space-x-3">{props.footer}</div>
          </div>
        ) : (
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <h3 className="uppercase text-center font-bold text-lg">
              {props.message}
            </h3>
            <div className="flex justify-end space-x-3">
              {props.errors && showErrors && <p className="text-red-500">{}</p>}
              <TheButton
                label="Si"
                onClick={props.handleFunction}
                isPending={props.isPending}
              />
              <TheButton label="No" type={"danger"} onClick={closeDialog} />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal-modal")
  );
};

TheModal.defaultProps = {
  message: "Give message prop",
  type: "alert", // 'closable'
  errors: null,
  isPending: false,
};
