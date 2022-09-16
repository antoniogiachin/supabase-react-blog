// * custom components
import { TheButton } from "../UI/TheButton";
// * fontawasome
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// * react imports
import { useState } from "react";

export const ActionContainer = ({ listToRender, isPending, listName }) => {
  const [commentTrigger, setCommentTrigger] = useState(false);

  return (
    <div>
      {isPending && <div>Loading...</div>}
      <h3 className="text-xl uppercase font-bold text-slate-200 mb-4">
        {listName && listName}
      </h3>
      <ul className="flex flex-col space-y-2">
        {listToRender &&
          listToRender.map((el) => (
            <li key={el.id}>
              <div className="border border-slate-800 p-2 bg-white rounded-md">
                <p>
                  Title: <span className="font-bold">{el.title}</span>
                </p>
                <p>
                  Content: <span>{el.title}</span>
                </p>
                <div className="flex justify-end px-3 space-x-2">
                  {commentTrigger && (
                    <input
                      type="text"
                      className="text-gray-800 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
                    />
                  )}
                  {commentTrigger && (
                    <TheButton label={null} icon={faPaperPlane} />
                  )}
                  {commentTrigger && (
                    <TheButton
                      type={"warning"}
                      label={null}
                      icon={faRectangleXmark}
                      onClick={() => {
                        setCommentTrigger(false);
                      }}
                    />
                  )}

                  {!commentTrigger && (
                    <TheButton
                      label={null}
                      icon={faUpRightAndDownLeftFromCenter}
                    />
                  )}
                  {!commentTrigger && (
                    <TheButton
                      type={"secondary"}
                      label={null}
                      icon={faReply}
                      onClick={() => {
                        setCommentTrigger(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
