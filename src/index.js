import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
//Provider는 store의 state에 접근 가능 한 영역을 지정
import { Provider } from "react-redux";

//1.Redux Store에서 관리할 초기 객체
const initialState = {
  user: null, // 사용자 정보
  isAuthReady: false, //로그인 상태 체크
  errMessage: "", // 에러 메시지
  KakaoProfile: null,
};
//2. Reducer 함수 작성
//dispatch에 의해 전달된 액션을 이용하여 state를 업데이트
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthReady: true }; //
    case "logout":
      return { ...state, user: null };

    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };

    case "updateName":
      return { ...state, user: action.payload };

    case "updateEmail":
      return { ...state, user: action.payload };

    case "deleteUser":
      return { ...state, user: null };

    case "isError":
      return { ...state, errMessage: action.payload };
    //dispatch({type: "isError", payload: "비밀번호 오류 입니다."})

    default:
      //그대로(기본값) 돌려준다.
      return state;
  }
};

//3. store 생성
//저장소 = createStore(리듀서 함수,state 초기값)
const store = createStore(authReducer, initialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //store의 state를 사용할 범위 지정
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
