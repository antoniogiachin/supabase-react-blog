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
        {/* RIGHT SIDE  */}
        <div className="grid grid-cols-1 mt-20">
          <div className="flex flex-col space-y-6 px-32">
            {/* modifica profilo */}
            <TheButton type={"secondary"} label={"Update Profile"} />
            {/* leggi e rispondi ai tuoi commmenti */}
            <TheButton type={"secondary"} label={"Show comments and answer"} />

            {/* leggi e rispondi alle tue recensioni */}
            <TheButton type={"secondary"} label={"Show reviews and answer"} />

            {/* segnalaci un problema */}
            <TheButton type={"warning"} label={"Report problem"} />

            {/* elimina profilo da autore */}
            <TheButton type={"danger"} label={"Delete your author profile"} />
          </div>
        </div>
      </div>
    </>
  );
};

UserRecap.defaultProps = {
  mode: "user",
};
