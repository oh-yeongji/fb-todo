import React, { useState } from "react";
import SignUpDiv from "../style/UserCss";
import { useNavigate } from "react-router-dom";
// firebase 연동
import firebase from "../firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const handleSignUp = async e => {
    e.preventDefault();
    try {
      console.log("회원가입 - firebase 연동");
      // firebase 에 회원 가입하기
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pw);

      //회원 가입 성공시 사용자 이름을 업데이트
      await createUser.user.updateProfile({
        displayName: nickName,
      });
      //로그인 창으로 이동
      navigate("/login");
      console.log("등록된 정보 : ", createUser.user);
    } catch (error) {
      //회원가입 시 에러 처리
      console.error(error.code);
      if (error.code == "auth/email-already-in-use") {
        alert("The email address is already in use");
      } else if (error.code == "auth/invalid-email") {
        alert("The email address is not valid.");
      } else if (error.code == "auth/operation-not-allowed") {
        alert("Operation not allowed.");
      } else if (error.code == "auth/weak-password") {
        alert("The password is too weak.");
      }
    } finally {
      // 회원가입 완료 시 홈 화면으로
      navigate("/");
    }
  };
  return (
    <div className="p-6 m-5 shadow rounded bg-white flex flex-col">
      <h2>Sign Up</h2>
      {/*
       * emotion 을 활용하여 tag 의 용도를 구분한다
       * css 도 함께 적용한다
       */}
      <SignUpDiv>
        <form className="shadow bg-white rounded-lg">
          <label htmlFor="">닉네임</label>
          <input
            type="text"
            required
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            minLength={2}
            maxLength={10}
          />
          <label htmlFor="">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            autoComplete="off"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
            minLength={8}
            maxLength={16}
          />
          <label htmlFor="">비밀번호 확인</label>
          <input
            type="password"
            value={pwConfirm}
            onChange={e => {
              setPwConfirm(e.target.value);
            }}
            required
            minLength={8}
            maxLength={16}
          />
          <div className="btn-list flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleSignUp(e)}
            >
              회원가입
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
            >
              취소
            </button>
          </div>
        </form>
      </SignUpDiv>
    </div>
  );
};

export default SignUp;
