import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteUserFB,
  isErrorFB,
  loginFB,
  logoutFB,
  updateEmailFB,
  updateNameFB,
} from "../reducers/fbAuthSlice";

//사용자 로그인 Hook
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();
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
      // dispatch({ type: FB_LOGIN, payload: user });
      dispatch(
        loginFB({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        }),
      );
      navigate("/");
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
      dispatch(isErrorFB(errMessage)); //action의 payload
    }
  };
  return { error, isPending, login };
};
//사용자 로그아웃 Hook
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      //FB로그아웃API
      await signOut(appAuth);
      dispatch(logoutFB());
      navigate("/");
    } catch (err) {
      // console.log(err.message);
      dispatch(isErrorFB(err.message));
    }
  };
  return { error, isPending, logout };
};

//회원가입 Hook
export const useSignup = () => {
  //authContext 데이터 전달
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();

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
      await updateProfile(appAuth.currentUser, {
        displayName: displayName,
        //   photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      // console.log("dispatch실행=====");
      // dispatch({ type: FB_LOGIN, payload: user });
      dispatch(
        loginFB({
          uid: appAuth.currentUser.uid,
          email: appAuth.currentUser.email,
          displayName: appAuth.currentUser.displayName,
        }),
      );
      // 에러 없음
      setError(null);
      // 연결 후 작업 완료
      setIsPending(false);
      // 회원가입 성공으로 login 라우터로 이동
      navigate("/login");
    } catch (err) {
      console.log(err);
      let errMessage = "";
      if (err.code == "auth/email-already-in-use") {
        errMessage = "The email address is already in use";
      } else if (err.code == "auth/invalid-email") {
        errMessage = "The email address is not valid.";
      } else if (err.code == "auth/operation-not-allowed") {
        errMessage = "Operation not allowed.";
      } else if (err.code == "auth/weak-password") {
        errMessage = "The password is too weak.";
      }
      // dispatch({ type: FB_IS_ERROR, payload: errMessage });
      dispatch(isErrorFB(err.message));
    }
  };

  // 현재 error, isPending, signUp 을 리턴한다.
  return { error, isPending, signUp };
};

//회원이메일 변경
export const useUpdateEmail = () => {
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updateMail = async email => {
    setError(null);
    setIsPending(true);
    console.log("jjj", email);
    try {
      await updateEmail(appAuth.currentUser, email);
      setIsPending(false);
      // dispatch({ type: FB_UPDATE_EMAIL, payload: appAuth.currentUser });
      dispatch(
        updateEmailFB({
          uid: appAuth.currentUser.uid,
          email: appAuth.currentUser.email,
          displayName: appAuth.currentUser.displayName,
        }),
      );
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);

      let errMessage = "";
      if (err.code == "auth/email-already-in-use") {
        errMessage = "The email address is already in use";
      } else if (err.code == "auth/invalid-email") {
        errMessage = "The email address is not valid.";
      } else {
        errMessage = "이메일을 확인해 주세요.";
      }
      dispatch(isErrorFB(errMessage));

      // console.log(err);

      // if (err.code == "auth/email-already-in-use") {
      //   errMessage = "The email address is already in use";
      // } else if (err.code == "auth/invalid-email") {
      //   errMessage = "The email address is not valid.";
      // } else if (err.code == "auth/operation-not-allowed") {
      //   errMessage = "Operation not allowed.";
      // } else if (err.code == "auth/weak-password") {
      //   errMessage = "The password is too weak.";
      // }
      // dispatch({ type: FB_IS_ERROR, payload: errMessage });
    }
  };
  return { error, isPending, updateMail };
};

//회원 닉네임 변경 Hook
export const useUpdateNickName = () => {
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();

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
      //dispatch({ type: FB_UPDATE_NAME, payload: appAuth.currentUser });
      dispatch(
        updateNameFB({
          uid: appAuth.currentUser.uid,
          email: appAuth.currentUser.uid.email,
          displayName: appAuth.currentUser.displayName,
        }),
      ); //appAith가 payload니까 똑같은거 전송하면 됨.
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);
      dispatch(isErrorFB(err.message));
    }
  };
  return { error, isPending, updateNickName };
};

//회원 비밀번호 변경 Hook
export const useUpdatePass = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const updatePass = async newPass => {
    setError(null);
    setIsPending(true);
    try {
      await updatePassword(appAuth.currentUser, newPass);
      //console.log("비밀번호 업데이트 완료");
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);

      let errMessage = "";
      if (err.code == "auth/weak-password") {
        errMessage = "The password is too weak.";
      } else {
        errMessage = "비밀번호 다시 입력해 주세요.";
      }
      dispatch(isErrorFB(errMessage));
    }
  };
  return { error, isPending, updatePass };
};

//회원 탈퇴 Hook
export const useUserDelete = () => {
  const navigate = useNavigate();
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const userDelete = async () => {
    setError(null);
    setIsPending(true);
    try {
      await deleteUser(appAuth.currentUser);
      setIsPending(false);
      // dispatch({ type: FB_DELETE_USER });
      dispatch(deleteUserFB());
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);
      dispatch(isErrorFB(err.Message));
    }
  };

  return { error, isPending, userDelete };
};
