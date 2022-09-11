import React, { useState } from "react";

export const AuthorForm = () => {
  const [nickname, setNickaname] = useState("");
  const [biography, setBiography] = useState("");
  const [image, setImage] = useState("");

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
          type="text"
          className="text-gray-800 mt-1 h-36 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
        />
      </label>
      <label>
        <span className="text-gray-800">Profile picture: </span>
        <input
          type="file"
          className="text-gray-800 mt-1 block w-full p-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:ring-0"
        />
      </label>
    </form>
  );
};
