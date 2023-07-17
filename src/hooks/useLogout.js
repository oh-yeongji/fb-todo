import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { signOut } from "firebase/auth";

//FB로그아웃
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = () => {
    setError(null);
    setIsPending(true);
    //FB로그아웃API
    signOut(appAuth)
      .then(() => {
        dispatch({ type: "logout" });
        // Sign-out successful.
      })
      .catch(err => {
        // An error happened.
        console.log(err);
      });
  };
  return { error, isPending, logout };
};
