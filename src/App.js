import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Schedule from "./pages/Schedule";
import Upload from "./pages/Upload";
import TodoChart from "./pages/TodoChart";
import { useAuthContext } from "./hooks/useFirebase";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./firebase/config";
import { FB_IS_AUTHREADY, FB_IS_ERROR } from "./modules/fbreducer";

function App() {
  // console.log("App 랜더링");
  //추후에 Redux/Recoil state 로 관리 필요
  // const { isAuthReady, user, errMessage, dispatch } = useAuthContext();

  // store에 저장된 state를 읽어온다.
  // const isAuthReady = useSelector(state => state.isAuthReady);
  // const user = useSelector(state => state.user);
  // const errMessage = useSelector(state => state.errMessage);
  // const KakaoProfile = useSelector(state => state.KakaoProfile);
  const { isAuthReady, user, errMessage } = useSelector(state => state);

  //2. store에 저장된 state를 업데이트(액션 만들어서 전달)
  const dispatch = useDispatch();

  //FB 인증 웹브라우저 새로 고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
      //로그인이 되었는지 아닌지를 파악한다.
      // AuthContext 에 User 정보를 입력한다.
      // console.log("onAuthStateChanged: ", user);
      dispatch({ type: FB_IS_AUTHREADY, payload: user }); //괄호안에 다 action
    });
  }, []);

  //error message 모달 관련
  const error = msg => {
    Modal.error({
      title: "This is a warning message",
      content: msg,
      onOk: handleOk,
      okButtonProps: { style: { background: "red" } },
    });
  };
  useEffect(() => {
    if (errMessage !== "") {
      error(errMessage);
    }
  }, [errMessage]);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    dispatch({ type: FB_IS_ERROR, payload: "" });
  };
  // const handleCancel = () => {
  //   dispatch({ type: "isError", payload: "" });
  // };

  return (
    <>
      {isAuthReady ? (
        <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
          <Header />
          <div className="container mx-auto h-full ">
            <Routes>
              {/* Navigate 를 이용한 강제 이동 */}
              <Route path="/" element={<Navigate to="/home" />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>

              <Route
                path="/login"
                element={user ? <Navigate to="/home" /> : <Login />}
              ></Route>

              <Route path="/signup" element={<SignUp />}></Route>

              <Route
                path="/todo"
                element={user ? <Todo /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/mypage"
                element={user ? <MyPage /> : <Navigate to="/login" />}
              ></Route>
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<NotFound />}></Route>
              <Route path="/todochart" element={<TodoChart />}></Route>
            </Routes>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default App;
