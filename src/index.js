import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
//Provider는 store의 state에 접근 가능 한 영역을 지정
import { Provider } from "react-redux";
//Redux DevTools 설치
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer, { initialState } from "./modules/fbreducer";



//3. store 생성
//저장소 = createStore(리듀서 함수,state 초기값,개발도구)
const store = createStore(authReducer, initialState, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //store의 state를 사용할 범위 지정
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
