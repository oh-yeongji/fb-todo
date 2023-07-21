import React from "react";
import { useNavigate } from "react-router-dom";
//useContext를 활용해서 AuthContext활용
import { useAuthContext } from "../hooks/useFirebase";

const KakaoLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = () => {
    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image, account_email", //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
      success: function (response) {
        console.log(response); // 로그인 성공하면 받아오는 데이터
        window.Kakao.API.request({
          // 사용자 정보 가져오기
          url: "/v2/user/me",
          success: res => {
            const kakao_account = res.kakao_account;
            console.log("사용자 정보", kakao_account);
            console.log("사용자profile", kakao_account.profile);

            dispatch({ type: "kakaoLogin", payload: kakao_account.profile });
            navigate("/about");
          },
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };
  return (
    <div>
      <button onClick={login}>카카오로그인</button>
    </div>
  );
};

export default KakaoLogin;
