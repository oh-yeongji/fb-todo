import React from "react";
import { Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Header = () => {
  //AuthContext로그아웃 실행으로 상태변경
  const { logout } = useLogout();
  const { user } = useAuthContext();
  // console.log("============");
  console.log(user);
  // const navigator = useNavigate();
  //fb 로그아웃
  const handleLogout = () => {
    logout();
    // firebase.auth().signOut();
    // console.log("로그아웃");

    // //로그아웃 하고나면 들어있던 정보를변경하는것을 빈 문자열로 호출
    // //그리고 홈으로 이동
    // setFBName("");
    // setFBEmail("");
    // setFBUid("");
    // navigator("/");
  };
  return (
    // component Header가 아님 html header임(말하자면)
    <header className="p-7 bg-black">
      <div className="flex align-items-center justify-between">
        <Link to="/" className="text-white hover:text-orange-600">
          logo
        </Link>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link to="/home" className="text-white hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-orange-600">
              About
            </Link>
          </li>

          <li>
            {/* fbUid가 맞으면 todo 아니면 login으로 가라 */}
            <Link
              to={user ? "/todo" : "/login"}
              className="text-white hover:text-orange-600"
            >
              Todo
            </Link>
          </li>
          <li>
            <Link to="/schedule" className="text-white hover:text-orange-600">
              Schedule
            </Link>
          </li>
          <li>
            <Link to="/upload" className="text-white hover:text-orange-600">
              Upload
            </Link>
          </li>
          <li>
            <Link to="/todochart" className="text-white hover:text-orange-600">
              Chart
            </Link>
          </li>
        </ul>

        <div className="flex justify-center gap-5">
          {user ? (
            <div className="text-white">
              {user.displayName}
              {user.email}
              {user.uid}
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/mypage">마이페이지</Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-500">
                로그인
              </Link>
              <Link to="/signup" className="text-white hover:text-blue-500">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
