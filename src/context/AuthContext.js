import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";

//FB인증 Context를 생성함.
//store (은행금고)라고 하자.
const AuthContext = createContext(); //전역변수를 만들어서 상태관리를 시작할거야. context공간을 하나 만들어냄.

//context 관리 리듀서함수
//action(요청서)을 처리하는 reducer함수.
//reducer 함수 형태로 action(요청서)를 처리하는 이유는
//원본(state)를 훼손하지않고 원하는 데이터 처리 후
// 원본(state)를 변경한다. (불변성 유지)
const authReducer = (state, action) => {
  console.log("리듀서함수: ", action); // {type:"login",payload:""}

  //action 은 반드시 형태가 {type:"구분자"}
  //  {type:"입금",payload:1000}   //입금과 출금에는 데이터를 바꾸기위한 payload가 있지만 잔고는 데이터 변경할 필요가 없기 때문에 payload할 필요 없음.
  //  {type:"출금",payload:1000}   //type은 필수고 payload는 필수아닐수있음.
  //  {type:"잔고"}
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthReady: true }; //
    case "logout":
      return { ...state, user: null };

    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };

    default:
      //그대로(기본값) 돌려준다.
      return state;
  }
};

//Context를 구독(Subscribe)하도록 Provider를 생성
//children에다가 App을 전달해서 ({children})에서 {children}으로 전달
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    // dispatch로 authReducer를 실행시킴
    //state를 뜯으면 user하나밖에 안남음.
    user: null, // 사용자 정보
    isAuthReady: false, //로그인 상태 체크
  });
  //FB 인증 웹브라우저 새로 고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
    
      //로그인이 되었는지 아닌지를 파악한다.
      // AuthContext 에 User 정보를 입력한다.
      console.log("onAuthStateChanged: ", user);
      dispatch({ type: "isAuthReady", payload: user }); //괄호안에 다 action
    });
  }, []);
  return (
    //provider는 value를 공급하고
    //value가 없으면 state랑 dispatch에 접근 못함.
    //뜯어준이유는 비교해야하니까 ...state랑 비교대상이랑
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
      {/* index.js에서 App,Browser이 이자리로 들어온다? */}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
