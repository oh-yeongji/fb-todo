//fb 로그인 커스텀 훅
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
//default안하는 이유 :모아서 쓸거라서
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      //then 위쪽을 올려준다.
      const userCredential = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user; // ?
      dispatch({ type: "login", payload: user });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return { error, isPending, login };
};
