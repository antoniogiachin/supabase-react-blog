import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export const useFetcher = () => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchContent = async (api, eq) => {
    setIsPending(true);
    try {
      let { data, error } = await supabase
        .from(api.table)
        .select("*")
        .eq(api.filter, eq);

      if (!data) {
        const e = new MyErrorClass("No data", 500, error);
        setIsPending(false);
        setErrors(e.formatted);
        throw e;
      }

      setIsPending(false);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return { isPending, errors, fetchContent };
};
