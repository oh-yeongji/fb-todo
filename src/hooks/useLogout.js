import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//FB로그아웃
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      //FB로그아웃API
      await signOut(appAuth);
      dispatch({ type: "logout" });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return { error, isPending, logout };
};
