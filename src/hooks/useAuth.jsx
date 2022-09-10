import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export const useAuth = (payload) => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleRegister = async () => {
    setIsPending(true);
    try {
      const { data, error } = await supabase.authh.signUp({
        email: payload.email,
        password: email.password,
      });
      await supabase.from("users").insert([
        {
          firstname: payload.firstname,
          lastname: payload.lastname,
          birth_date: payload.birthDate,
        },
      ]);

      if (error) {
        const e = new Error("Impossibile registrare utente");
        e.code = error.code;
        e.details = error.details;
        e.message = error.message;
        setIsPending(false);
        setErrors(e.message);
        throw error;
      }

      const valueToStore = {
        auth: data.session,
        additionalUserInfos: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          birthDate: payload.birth_date,
        },
      };
      localStorage.setItem("auth", JSON.stringify(valueToStore));
      setIsPending(false);
      setErrors(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = async () => {
    setIsPending(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      const { fetchData, fetchError } = await supabase
        .from("users")
        .select()
        .eq("email", payload.email)
        .single();

      if (error || fetchError) {
        const e = new Error("Impossibile loggare utente");
        e.code = error.code || fetchError.code;
        e.details = error.details || fetchError.details;
        e.message = error.message || fetchError.message;
        setIsPending(false);
        setErrors(e.message);
        throw error;
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
    } catch (err) {
      consolerr.log(err);
    }
  };

  return { isPending, errors, handleRegister, handleLogin, handleLogout };
};
