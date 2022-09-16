import React, { useState, useEffect } from "react";
// * custom components imports
import { TheButton } from "../components/UI/TheButton";
import { TheModal } from "../components/UI/TheModal";
import { AuthorForm } from "../components/dashboard/AuthorForm";
import { UserRecap } from "../components/dashboard/UserRecap";
// * custom hook import
import { useAuthor } from "../hooks/useAuthor";
// * font awasome
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
// * REDUX
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_MODAL } from "../store/slicers/modalSlice";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.show);
  const modalId = useSelector((state) => state.modal.id);
  const isAuthor = useSelector((state) => state.auth.isAuthor);
  const userInfos =
    useSelector((state) => state.auth.userInfos) ||
    JSON.parse(localStorage.getItem("auth"));

  const [nickname, setNickaname] = useState("");
  const [biography, setBiography] = useState("");
  const [image, setImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { isPending, errors, handleSaveAuthor } = useAuthor();

  const handleSave = () => {
    const payload = {
      nickname,
      image,
      biography,
    };
    handleSaveAuthor(payload);
  };

  useEffect(() => {
    if (isAuthor) {
      setAvatarUrl(
        JSON.parse(localStorage.getItem("auth")).author.profilePicture
      );
    }
  }, [isAuthor]);

  return (
    <>
      {/* RECAP USER COMPONENT  */}
      <UserRecap
        userInfos={userInfos}
        profileSrc={`${
          import.meta.env.VITE_AVATARS_STORAGE_PUBLIC_URL
        }${avatarUrl}`}
        mode={isAuthor && "author"}
      />

      {/* BUTTON PER MODALE REGISTRAZIONE USER  */}
      {!isAuthor && (
        <div className="grid grid-cols-1">
          <div className="flex justify-end">
            <TheButton
              width={"w-1/4"}
              padding={"px-3 py-4"}
              customClasses={"font-lg space-x-3 text-slate-100"}
              type="secondary"
              icon={faPlusCircle}
              label="Are you an author?"
              onClick={() => {
                dispatch(
                  SET_SHOW_MODAL({ show: true, id: "dashboardAuthorModal" })
                );
              }}
            />
          </div>
        </div>
      )}

      {/* AUTHOR SIGN MODAL  */}
      {showModal && modalId === "dashboardAuthorModal" && (
        <TheModal
          body={
            <AuthorForm
              nickname={nickname}
              setNickaname={setNickaname}
              biography={biography}
              setBiography={setBiography}
              image={image}
              setImage={setImage}
            />
          }
          footer={
            <div className="flex justify-between items-center">
              {errors && <p className="text-red-500">{errors.message}</p>}
              <TheButton
                isPending={isPending}
                icon={faSave}
                label="save"
                onClick={handleSave}
              />
            </div>
          }
          message="Register as Author"
          type={"closable"}
        />
      )}
    </>
  );
};
