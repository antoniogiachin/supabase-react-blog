import React, { useMemo } from "react";
import ReactDom from "react-dom";
// * custom components
import { TheButton } from "./TheButton";
// * styles
import styles from "./TheModal.module.css";

export const TheModal = (props) => {
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
        <div className="container mx-auto px-4 flex flex-col space-y-2">
          <h3 className="uppercase text-center font-bold text-lg">
            {props.message}
          </h3>
          <div className="flex justify-end space-x-3">
            <TheButton label="Si" />
            <TheButton label="No" type={"danger"} />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal-modal")
  );
};

TheModal.defaultProps = {
  message: "Give message prop",
  type: "alert", // 'closable'
};
