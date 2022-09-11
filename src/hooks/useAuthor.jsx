import React, { useState } from "react";
// * supabase
import { supabase } from "../supabase/supabaseClient";
// * REDUX
import { useDispatch } from "react-redux";
import { SET_AUTHOR_STATUS, SET_USERS_INFOS } from "../store/slicers/authSlice";
import { SET_SHOW_MODAL } from "../store/slicers/modalSlice";
// * custom error class
import MyErrorClass from "../extra/MyErrorClass";

export const useAuthor = () => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

  const handleSaveAuthor = async (payload) => {
    setIsPending(true);
    const retrieveStorage = JSON.parse(localStorage.getItem("auth"));
    const createSlug = `${payload.nickname}-${retrieveStorage.auth.user.id}`;
    let url;
    try {
      if (payload.image) {
        const { data: image, error: uploadErrors } = await supabase.storage
          .from("avatars")
          .upload(`${createSlug}_${payload.image.name}`, payload.image);

        if (uploadErrors) {
          const e = new MyErrorClass("Invalid image", 401, error);
          setIsPending(false);
          setErrors(e.formatted);
          throw e;
        }

        url = image.path;
        const { data, error } = await supabase
          .from("authors")
          .insert([
            {
              nickname: payload.nickname,
              slug: createSlug,
              profilePicture: url,
              isSponsored: false,
            },
          ])
          .select();

        if (error) {
          const e = new MyErrorClass("Invalid image", 401, error);
          setIsPending(false);
          setErrors(e.formatted);
          throw e;
        }

        const { error: updateErrors } = await supabase
          .from("users")
          .update({ authorId: data[0].id })
          .eq("email", retrieveStorage.auth.user.email);

        if (updateErrors) {
          const e = new MyErrorClass("Error updating user", 401, error);
          setIsPending(false);
          setErrors(e.formatted);
          throw e;
        }

        const updateStorage = {
          ...retrieveStorage,
          author: data,
          isAuthor: true,
        };
        localStorage.removeItem("auth");
        localStorage.setItem("auth", JSON.stringify(updateStorage));
        dispatch(SET_USERS_INFOS(updateStorage));
        dispatch(SET_AUTHOR_STATUS(true));
        dispatch(SET_SHOW_MODAL({ show: false, id: "" }));

        setIsPending(false);
        setErrors(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { isPending, errors, handleSaveAuthor };
};
