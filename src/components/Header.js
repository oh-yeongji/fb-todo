import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoginFetch } from "../reducers/actions";

const Header = () => {
  //AuthContext로그아웃 실행으로 상태변경
  // const { logout } = useLogout();
  const { displayName, email, uid } = useSelector(state => state.fbAuth);
  // console.log("============");
  //console.log(user);
  // const navigator = useNavigate();
  const dispatch = useDispatch();

  //fb 로그아웃
  const handleLogout = async () => {
    // logout();
    await dispatch(asyncLoginFetch()).unwrap(); 
    //후속처리
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
              to={uid ? "/todo" : "/login"}
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
          {uid ? (
            <div className="text-white">
              {displayName}
              {email}
              {uid}
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
