import React, { useEffect, useState } from "react";
import MyPageDiv from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import {
  useAuthContext,
  useUpdateNickName,
  useUpdateEmail,
  useUpdatePass,
  useUserDelete,
} from "../hooks/useFirebase";
import { useSelector } from "react-redux";

const MyPage = () => {
  const { displayName, email } = useSelector(state => state.fbAuth);

  const { updateNickName } = useUpdateNickName();
  const { updateMail } = useUpdateEmail();
  const { userDelete } = useUserDelete();
  const { updatePass } = useUpdatePass();

  const navigate = useNavigate();

  const [nickName, setNickName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pw, setPw] = useState("");

  //AuthContext 에 state의 user를 출력
  useEffect(() => {
    setNickName(displayName);
    setUserEmail(email);
  }, []);

  const handlerNickName = async e => {
    e.preventDefault();
    updateNickName(nickName);
  };
  const handlerEmail = async e => {
    e.preventDefault();
    console.log(userEmail);
    updateMail(userEmail);
  };
  const handlerPassword = async e => {
    e.preventDefault();

    updatePass(pw);

    console.log("패스워드 업데이트");
  };
  const handlerDelete = async e => {
    e.preventDefault();
    userDelete();
    // try {
    //   await user.delete();
    //   alert("서비스 탈퇴하셨습니다");
    //   setFBEmail("");
    //   setFBName("");
    //   setFBUid("");
    //   navigate("/");
    // } catch (error) {
    //   console.log(error.code);
    // }
  };
  return (
    <div className="p-6 m-5 shadow rounded bg-white flex flex-col">
      <h2>MyPage</h2>
      {/*
       * emotion 을 활용하여 tag 의 용도를 구분한다
       * css 도 함께 적용한다
       */}
      <MyPageDiv>
        <form className="shadow bg-white rounded-lg">
          <div>
            <label htmlFor="">닉네임</label>
            <input
              type="text"
              required
              value={nickName}
              onChange={e => setNickName(e.target.value)}
              minLength={2}
              maxLength={10}
            />
            <button
              className="border rounded px-3 py-2 shadow "
              onClick={handlerNickName}
            >
              닉네임 변경
            </button>
          </div>

          <div>
            <label htmlFor="">이메일</label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerEmail}
            >
              이메일변경
            </button>
          </div>

          <div>
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
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerPassword}
            >
              비밀번호 변경
            </button>
          </div>

          <div className="btn-list flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerDelete}
            >
              회원탈퇴
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
      </MyPageDiv>
    </div>
  );
};

export default MyPage;
