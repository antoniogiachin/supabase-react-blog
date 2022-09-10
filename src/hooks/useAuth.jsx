import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
// * custom error class
import MyErrorClass from "../extra/MyErrorClass";
// * REDUX
import { useDispatch } from "react-redux";
import { SET_LOGGED_STATUS, SET_USERS_INFOS } from "../store/slicers/authSlice";
import { SET_SHOW_MODAL } from "../store/slicers/modalSlice";
// * react router
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState(null);

  // ! NAVIGATE
  const navigate = useNavigate();

  // ! DISPATCH
  const dispatch = useDispatch();

  const handleRegister = async (payload) => {
    setIsPending(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });
      await supabase.from("users").insert([
        {
          firstname: payload.firstname,
          lastname: payload.lastname,
          birth_date: payload.birthDate,
          email: payload.email,
        },
      ]);

      if (error) {
        const e = new MyErrorClass("Can't register user", 401, error);
        setIsPending(false);
        let errorToSet = e.formatted;
        if (e.details.message.includes("already")) {
          errorToSet.advice = true;
        }
        if (e.details.message.includes("6")) {
          errorToSet.message = e.details.message;
        }
        setErrors(errorToSet);
        throw e;
      }

      const valueToStore = {
        auth: data.session,
        additionalUserInfos: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          birthDate: payload.birthDate,
        },
      };
      localStorage.setItem("auth", JSON.stringify(valueToStore));
      dispatch(SET_LOGGED_STATUS(true));
      dispatch(SET_USERS_INFOS(valueToStore));

      setIsPending(false);
      setErrors(null);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = async (payload) => {
    setIsPending(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        const e = new MyErrorClass("Invalid email/password", 401, error);
        setIsPending(false);
        setErrors(e.formatted);
        throw e;
      }

      const { data: fetchData, error: fetchError } = await supabase
        .from("users")
        .select()
        .eq("email", data.user.email)
        .single();

      if (fetchError) {
        const e = new MyErrorClass(
          "No user with this email found",
          401,
          error,
          true
        );
        setIsPending(false);
        setErrors(e.formatted);
        console.log(errors);
        throw e;
      }

      const valueToStore = {
        auth: data.session,
        additionalUserInfos: {
          firstname: fetchData.firstname,
          lastname: fetchData.lastname,
          birthDate: fetchData.birth_date,
        },
      };

      localStorage.removeItem("auth");
      localStorage.setItem("auth", JSON.stringify(valueToStore));
      dispatch(SET_LOGGED_STATUS(true));
      dispatch(SET_USERS_INFOS(valueToStore));
      setIsPending(false);
      setErrors(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = async () => {
    setIsPending(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        const e = new MyErrorClass(
          "No user with this email found",
          401,
          error,
          true
        );
        setIsPending(false);
        setErrors(e.formatted);
        console.log(errors);
        throw e;
      }

      setIsPending(false);
      setErrors(null);
      localStorage.removeItem("auth");
      dispatch(SET_LOGGED_STATUS(false));
      dispatch(SET_USERS_INFOS(null));
      dispatch(SET_SHOW_MODAL(false));
      navigate("/");
    } catch (err) {
      consolerr.log(err);
    }
  };

  return { isPending, errors, handleRegister, handleLogin, handleLogout };
};
