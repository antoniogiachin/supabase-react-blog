// * font awasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const AuthorForm = ({
  nickname,
  setNickaname,
  biography,
  setBiography,
  image,
  setImage,
}) => {
  return (
    <form className="grid grid-cols-1 gap-6">
      <label>
        <span className="text-gray-800">Nickname: </span>
        <input
          value={nickname}
          onChange={(e) => {
            setNickaname(e.target.value);
          }}
          type="text"
          className="text-gray-800 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
        />
      </label>
      <label>
        <span className="text-gray-800">Bio: </span>
        <textarea
          value={biography}
          onChange={(e) => {
            setBiography(e.target.value);
          }}
          type="text"
          className="text-gray-800 mt-1 h-36 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
        />
      </label>
      <label>
        <span className="text-gray-800">Profile picture: </span>
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
          accept={"image/jpg image/png"}
          className={`text-gray-800 mt-1 block w-full p-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0`}
        />
      </label>
      {image && image.name && (
        <div className="flex flex-col">
          <div>
            <p>Uploaded Image</p>
          </div>
          <div className="flex justify-between my-2">
            <p className="text-slate-800">{image.name.split(".")[0]}</p>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setImage(null);
              }}
            />
          </div>
        </div>
      )}
    </form>
  );
};
