import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";

//로그인 thunk 액션
export const asyncLoginFetch = createAsyncThunk(
  "fbAuthSlice/asyncLoginFetch ",
  async ({ email, password }) => {
    console.log(email, password);

    try {
      //then 위쪽을 올려준다.
      const userCredential = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user; // ?
      //state를 업데이트하려면 return 으로 돌려줌
      //{}가 action의 payload
      return {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      };

      // dispatch(
      //   loginFB({
      //     email: user.email,
      //     displayName: user.displayName,
      //     uid: user.uid,
      //   }),
      // );
    } catch (err) {
      // console.log(err.message);
      let errMessage = "";
      if (err.code === "auth/invalid-email") {
        errMessage = "올바른 이메일 형식이 아닙니다.";
      } else if (err.code === "auth/wrong-password") {
        errMessage = "올바르지 않은 비밀번호입니다.";
      } else if (err.code === "auth/user-not-found") {
        errMessage = "가입되지 않은 사용자 입니다.";
      } else if (err.code === "auth/missing-email") {
        errMessage = "이메일이 입력되지 않았습니다.";
      } else {
        errMessage = "로그인이 실패하였습니다.";
      }

      // dispatch({ type: FB_IS_ERROR, payload: errMessage });
      // dispatch(isErrorFB(errMessage)); action의 payload

      return { errMessage: errMessage };
    }
  },
);

//로그아웃 thunk 액션
export const asyncLogoutFetch = createAsyncThunk(
  "fbAuthSlice/asyncLogoutFetch",
  async () => {
    try {
      // FB 로그아웃 API
      await signOut(appAuth);
      return { uid: null, email: null, displayName: null, errMessage: "" };
    } catch (err) {
      return { errMessage: "로그아웃을 다시 시도하세요." };
    }
  },
);
