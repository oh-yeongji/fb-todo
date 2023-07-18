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
import { useState } from "react";
import Schedule from "./pages/Schedule";
import Upload from "./pages/Upload";
import TodoChart from "./pages/TodoChart";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  // console.log("App 랜더링");
  //추후에 Redux/Recoil state 로 관리 필요
  const [fbName, setFBName] = useState("");
  const [fbEmail, setFBEmail] = useState("");
  const [fbUid, setFBUid] = useState("");

  const { isAuthReady, user } = useAuthContext(); //user의 유무에 따라 화면결과 다름.

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
                element={
                  user ? (
                    <Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>
              <Route
                path="/mypage"
                element={
                  user ? (
                    <MyPage
                      fbName={fbName}
                      fbEmail={fbEmail}
                      fbUid={fbUid}
                      setFBName={setFBName}
                      setFBEmail={setFBEmail}
                      setFBUid={setFBUid}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
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
