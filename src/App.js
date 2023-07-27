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
import { useEffect } from "react";
import Schedule from "./pages/Schedule";
import Upload from "./pages/Upload";
import TodoChart from "./pages/TodoChart";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./firebase/config";
import { isAuthReadyFB, isErrorFB } from "./reducers/fbAuthSlice";

function App() {
  //Slice를 활용하였음.
  const { isAuthReady, uid, errMessage } = useSelector(state => state.fbAuth);

  //2. store에 저장된 state를 업데이트(액션 만들어서 전달)
  const dispatch = useDispatch();

  //FB 인증 웹브라우저 새로 고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
      //로그인이 되었는지 아닌지를 파악한다.
      // AuthContext 에 User 정보를 입력한다.
      // console.log("onAuthStateChanged: ", user);

      dispatch(
        isAuthReadyFB({
          uid: user && user.uid,
          email: user && user.email,
          displayName: user && user.displayName,
        }),
      );
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

  const handleOk = () => {
    // dispatch({ type: FB_IS_ERROR, payload: "" });
    dispatch(isErrorFB(""));
  };

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
                element={uid ? <Navigate to="/home" /> : <Login />}
              ></Route>

              <Route path="/signup" element={<SignUp />}></Route>

              <Route
                path="/todo"
                element={uid ? <Todo /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/mypage"
                element={uid ? <MyPage /> : <Navigate to="/login" />}
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
