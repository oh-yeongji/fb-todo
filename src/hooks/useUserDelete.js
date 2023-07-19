import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { appAuth } from "../firebase/config";

export const useUserDelete = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const userDelete = async () => {
    setError(null);
    setIsPending(true);
    try {
      await deleteUser(appAuth.currentUser);
      setIsPending(false);
      dispatch({ type: "deleteUser" });
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);
    }
  };

  return { error, isPending, userDelete };
};
