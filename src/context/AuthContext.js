import { createContext, useReducer } from "react";

//FB인증 Context를 생성함.
const AuthContext = createContext(); //전역변수를 만들어서 상태관리를 시작할거야. context공간을 하나 만들어냄.

//context 관리 리듀서함수
const authReducer = (state, action) => {
  console.log("리듀서함수: ", action); // {type:"login",payload:""}
  // console.log(action.type , action.payload);
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload }; //payload자리에 immer를 쓰는게 좋다.
    case "logout":
      return { ...state, user: null };
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
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
      {/* index.js에서 App,Browser이 이자리로 들어온다? */}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
