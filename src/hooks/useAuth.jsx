import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
// * custom error class
import MyErrorClass from "../extra/MyErrorClass";
// * REDUX
import { useDispatch } from "react-redux";
import { SET_LOGGED_STATUS } from "../store/slicers/authSlice";

export const useAuth = () => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState(null);

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

      setIsPending(false);
      setErrors(null);
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
      setIsPending(false);
      setErrors(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = async () => {
    setIsPending(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        const e = new Error("Error signin out user....");
        e.code = error.code;
        e.details = error.details;
        e.message = error.message;
        setIsPending(false);
        setErrors(e.message);
        throw error;
      }

      setIsPending(false);
      setErrors(null);
      localStorage.removeItem("auth");
      dispatch(SET_LOGGED_STATUS(false));
    } catch (err) {
      consolerr.log(err);
    }
  };

  return { isPending, errors, handleRegister, handleLogin, handleLogout };
};
