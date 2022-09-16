import { TheButton } from "../UI/TheButton";
import { ActionContainer } from "./ActionContainer";
// * react imports
import { useState } from "react";
// * custom hooks
import { useFetcher } from "../../hooks/useFetcher";
// * REDUX
import { useSelector, useDispatch } from "react-redux";
import { SET_SHOW_MODAL } from "../../store/slicers/modalSlice";

export const UserRecap = ({ profileSrc, userInfos }) => {
  const { isPending, errors, fetchContent } = useFetcher();

  const [api, setApi] = useState(null);
  const [results, setResults] = useState(null);
  const [listName, setListName] = useState("");

  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.show);
  const modalId = useSelector((state) => state.modal.id);

  const dynamicFetch = async (type) => {
    let api = { table: null, filter: null, filterValue: null };
    switch (type) {
      case "comments":
        api.table = "comments";
        api.filter = "authorId";
        api.filterValue = userInfos.author.id;
        setListName("comments");
        break;
      default:
        api.table = "posts";
        api.filter = "author";
        api.filterValue = userInfos.author.id;
        setListName("posts");
        break;
    }
    const res = await fetchContent(api, api.filterValue);
    setResults(res);
  };

  const openModal = async (idModal, idContent) => {
    const api = { table: idModal, filter: "id" };

    const data = await fetchContent(api, idContent);

    dispatch(SET_SHOW_MODAL({ show: true, id: idModal, data: data[0] }));
  };

  return (
    <>
      <div className="grid gap-2 md:grid-cols-2 grid-cols-1">
        {/* LEFT SIDE (responsive top) */}
        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-2 px-4">
            <img
              src={profileSrc}
              alt="profile-img"
              className="rounded-full object-contain w-50"
            />
            <div className=" flex justify-center px-10">
              <TheButton label={"Update profile picture"} />
            </div>
          </div>
          <div className="p-3">
            <ul>
              <li>
                <span className="font-bold">name: </span>
                {userInfos.additionalUserInfos.firstname}
              </li>
              <li>
                <span className="font-bold">lastname: </span>
                {userInfos.additionalUserInfos.lastname}
              </li>
              <li>
                <span className="font-bold">email: </span>
                {userInfos.auth.user.email}
              </li>
              <li>
                <span className="font-bold">birth date: </span>
                {userInfos.additionalUserInfos.birthDate}
              </li>
              <li className="flex items-center space-x-2 mt-2">
                <span className="font-bold">Sponsor status: </span>
                {userInfos.author.isSponsored ? (
                  <span className="text-green-300">Sponsorship active</span>
                ) : (
                  <TheButton
                    type={"warning"}
                    label={"upgrade your profile now!"}
                  />
                )}
              </li>
            </ul>
          </div>
          {/* ARTICOLI  */}
        </div>
        {/* RIGHT SIDE (responsive down) */}
        <div className="grid grid-cols-1 mt-20">
          <div className="grid grid-cols-3 md:grid-cols-1 gap-6 md:px-32">
            {/* modifica profilo */}
            <TheButton type={"secondary"} label={"Update Profile"} />
            {/* leggi e rispondi ai tuoi commmenti */}
            <TheButton
              type={"secondary"}
              label={"Show comments and answer"}
              onClick={() => {
                dynamicFetch("comments");
              }}
            />

            {/* leggi e rispondi alle tue recensioni */}
            <TheButton
              type={"secondary"}
              label={"Show reviews and answer"}
              onClick={() => {
                dynamicFetch("reviews");
              }}
            />

            {/* segnalaci un problema */}
            <TheButton type={"warning"} label={"Report problem"} />

            {/* elimina profilo da autore */}
            <TheButton type={"danger"} label={"Delete your author profile"} />
          </div>
          <div className="action-container mt-10 px-32">
            <ActionContainer
              showModal={showModal}
              modalId={modalId}
              openModal={openModal}
              listToRender={results}
              isPending={isPending}
              listName={listName}
            />
          </div>
        </div>
      </div>
    </>
  );
};

UserRecap.defaultProps = {
  mode: "user",
};
