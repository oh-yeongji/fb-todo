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

function App() {
  // console.log("App 랜더링");
  //추후에 Redux/Recoil state 로 관리 필요
  const [fbName, setFBName] = useState("");
  const [fbEmail, setFBEmail] = useState("");
  const [fbUid, setFBUid] = useState("");
  return (
    <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
      <Header
        fbName={fbName}
        fbEmail={fbEmail}
        fbUid={fbUid}
        setFBEmail={setFBEmail}
        setFBName={setFBName}
        setFBUid={setFBUid}
      />
      <div className="container mx-auto h-full ">
        <Routes>
          {/* Navigate 를 이용한 강제 이동 */}
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>

          <Route
            path="/login"
            element={
              <Login
                setFBName={setFBName}
                setFBEmail={setFBEmail}
                setFBUid={setFBUid}
              />
            }
          ></Route>

          <Route path="/signup" element={<SignUp />}></Route>

          <Route
            path="/todo"
            element={<Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid} />}
          ></Route>
          <Route
            path="/mypage"
            element={
              <MyPage
                fbName={fbName}
                fbEmail={fbEmail}
                fbUid={fbUid}
                setFBEmail={setFBEmail}
                setFBName={setFBName}
                setFBUid={setFBUid}
              />
            }
          ></Route>
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/todochart" element={<TodoChart />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
