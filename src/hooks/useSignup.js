import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

// 로그인, 로그아웃, 회원가입 처리 상태를 위한 Custom Hook
export const useSignup = () => {
  //authContext 데이터 전달
  const { dispatch } = useAuthContext();

  // 사용자 상태에 따라 웹브라우저 라우터 이동
  const navigate = useNavigate();

  // 서버의 에러 상태를 보관
  const [error, setError] = useState(null);

  // 서버의 연결 시도 및 연결, 연결 후 상태를 보관
  const [isPending, setIsPending] = useState(false);

  // 실제 연결을 실행할 함수
  // signUp(이메일, 비밀번호, 닉네임)
  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      // 사용자 등록 시작
      const userCredential = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;
      // console.log(user);
      if (!user) {
        // 에러 객체를 던진다.
        // console.log("회원 가입에 실패하였습니다.");
        return;
      }
      // 성공시에는 사용자 닉네임을 설정한다.
      updateProfile(appAuth.currentUser, {
        displayName: displayName,
        //   photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      // console.log("dispatch실행=====");
      dispatch({ type: "login", payload: "user" });
      // 에러 없음
      setError(null);
      // 연결 후 작업 완료
      setIsPending(false);
      // 회원가입 성공으로 login 라우터로 이동
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // 현재 error, isPending, signUp 을 리턴한다.
  return { error, isPending, signUp };
};
