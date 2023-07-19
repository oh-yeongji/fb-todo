//React 의 useContext 훅을 사용
//AuthContext의 state 및 dispatch 함수를

//가져오는 커스텀 훅
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//가져오는 커스텀 훅 정의
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  return context; //state,dispatch가 담겨있음.
};
