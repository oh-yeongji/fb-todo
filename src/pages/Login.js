import React, { useState } from "react";
import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";

const Login = ({ setFBName, setFBEmail, setFBUid }) => {
  // Link , NavLink , useNavigate
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //로그인
  const handleLogin = async e => {
    // console.log(e.target);
    e.preventDefault();
    //firebase 로그인 시도
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("로그인 성공");
      //로그인 된 사용자 정보를 가지고 옴.
      const user = firebase.auth().currentUser;
      console.log(user);
      setFBName(user.displayName);
      setFBEmail(user.email);
      setFBUid(user.uid);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        alert("올바른 이메일 형식이 아닙니다.");
      } else if (error.code === "auth/wrong-password") {
        alert("올바르지않은 비밀번호입니다.");
      } else if (error.code === "auth/user-not-found") {
        alert("가입되지 않은 사용자 입니다.");
      } else if (error.code === "auth/missing-email") {
        alert("이메일이 입력되지않았습니다.");
      } else {
        alert("로그인이 실패하였습니다.");
      }
    }
  };
  return (
    <div className="p-6 m-auto mt-5 shadow rounded-md bg-white flex flex-col">
      <h2>Login</h2>
      {/* 
      1.emotion을 활용하여 tag의 용도를 구분한다.
      2. css도 함께 적용한다.
       */}
      {/* 여기는 이렇게 하고 안에는 */}
      <LoginDiv>
        <form>
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
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            maxLength={16}
          />

          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleLogin(e)}
            >
              로그인
            </button>
            <button
              className="border rounded px-3 py-2 shadow "
              onClick={e => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              회원가입
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                console.log("비밀번호 찾기");
              }}
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </LoginDiv>
    </div>
  );
};

export default Login;
