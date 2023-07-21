import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// useContextㅇ로 AuthContext를 활용
import { useAuthContext } from "../hooks/useFirebase";

const About = () => {
  const { KakaoProfile, dispatch } = useAuthContext();
  console.log(KakaoProfile);

  useEffect(() => {
    console.log("kakao사용자 정보", KakaoProfile);
    if (!KakaoProfile) {
      kakaoLogOut();
    }
  }, [KakaoProfile]);
  const navigate = useNavigate();

  //로그아웃
  const kakaoLogOut = () => {
    if (!window.Kakao.Auth.getAccessToken()) {
      console.log("Not logged in.");
      return;
    }
    window.Kakao.Auth.logout(function (response) {
      dispatch({ type: "kakaoLogout" });
      navigate("/");
      //alert(response + " logout");
      // window.location.href='/'
      navigate("/");
    });
  };

  //탈퇴
  const memberOut = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log(response);
        dispatch({ type: "kakaoOut" });
        //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
        // window.location.href='/'
        navigate("/");
      },
      fail: function (error) {
        console.log("탈퇴 미완료");
        console.log(error);
      },
    });
  };
  return (
    <div className="p-6 mt-5 shadow rounded bg-white text-[#0891b2]">
      About/
      <button onClick={kakaoLogOut}>카카오로그아웃</button>
      <button onClick={memberOut}>카카오회원탈퇴</button>
      {KakaoProfile && (
        <div>
          닉네임: {KakaoProfile.nickname}
          <br />
          <img
            src={KakaoProfile.profile_image_url}
            alt="프로필 이미지"
            width="100"
          />
          <img
            src={KakaoProfile.thumbnail_image_url}
            alt="프로필 이미지"
            width="100"
          />
        </div>
      )}
    </div>
  );
};

export default About;
