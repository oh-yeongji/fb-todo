import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { updateProfile } from "firebase/auth";
import { appAuth } from "../firebase/config";

export const useUpdateNickName = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updateNickName = async displayName => {
    setError(null);
    setIsPending(true);
    try {
      //FB의 닉네임 변경 API 사용
      await updateProfile(appAuth.currentUser, {
        displayName: displayName,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      });

      //Context의 state 변경
      dispatch({ type: "updateName", payload: appAuth.currentUser });
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);
    }
  };
  return { error, isPending, updateNickName };
};
