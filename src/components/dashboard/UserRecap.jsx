import { TheButton } from "../UI/TheButton";

export const UserRecap = ({ profileSrc, userInfos }) => {
  return (
    <>
      <div className="grid gap-2 grid-cols-2">
        {/* LEFT SIDE  */}
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
              <li>name: {userInfos.additionalUserInfos.firstname}</li>
              <li>lastname: {userInfos.additionalUserInfos.lastname} </li>
              <li>email: {userInfos.auth.user.email} </li>
              <li>birth date: {userInfos.additionalUserInfos.birthDate}</li>
            </ul>
          </div>
        </div>
        {/* ARTICOLI  */}
      </div>

      {/* RIGHT SIDE  */}
      <div className="grid grid-cols-1">
        <div className="flex flex-col">
          {/* modifica profilo */}
          {/* leggi e rispondi ai tuoi commmenti */}
          {/* leggi e rispondi alle tue recensioni */}
          {/* elimina profilo da autore */}
          {/* segnalaci un problema */}
        </div>
      </div>
    </>
  );
};

UserRecap.defaultProps = {
  mode: "User",
};
