import { createSlice } from "@reduxjs/toolkit";
import { asyncLoginFetch, asyncLogoutFetch } from "./actions";

//추후에 actions.js 파일로 작성하시길 권장
//thunk 액션 크리에이터는 많아질 소지가 있습니다.
//dispatch(asyncLoginFetch())
//로그인 액션

//slice 초기값 (변수명도 관례상 initialState)
const initialState = {
  uid: null,
  displayName: null,
  email: null,
  isAuthReady: false, //로그인 상태 체크
  errMessage: "", // 에러 메시지
  isLoading: false, //비동기 처리
};
//slice생성
const fbAuthSlice = createSlice({
  name: "fbAuthSlice", //일반적으로 변수이름씀.아무거나 써도 됨.
  initialState: initialState,
  //액션 ({type:"구분자", payload: state 변경 })크리에이터 함수 모음들  (액션생성함수)
  //상태를 즉시 업데이트(동기 코드)
  //왼쪽 initialState는 isAuthReady를 가리킴
  //reducera함수는안바뀌고 꼭 이해할것.
  //dispatch()
  reducers: {
    loginFB: (state, action) => {
      // state.user = action.payload; //객체 바로들어가면 안되니까 뜯어서
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    logoutFB: state => {
      // state.user = null;
      state.displayName = null;
      state.uid = null;
      state.email = null;
    },
    isAuthReadyFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload && action.payload.displayName;
      state.uid = action.payload && action.payload.uid;
      state.email = action.payload && action.payload.email;
      state.isAuthReady = true;
    },
    updateNameFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload.displayName;
    },
    updateEmailFB: (state, action) => {
      // state.user = action.payload;
      state.email = action.payload.email;
    },
    deleteUserFB: (state, action) => {
      // state.user = null;
      state.displayName = null;
      state.uid = null;
      state.email = null;
    },
    isErrorFB: (state, action) => {
      state.errMessage = action.payload;
    },
  },
  // 비동기 업데이트 체크(미들웨어) 코드
  // axios 또는 fetch 를 이용합니다.
  // 비동기 액션(thunk 리듀서)에 따른 액션처리
  //pending(호출중) / fulfilled(결과리턴) / rejected(호출실패)
  extraReducers: builder => {
    builder.addCase(asyncLoginFetch.pending, (state, action) => {
      console.log("로그인 연결중...");
      state.isLoading = true;
    });
    builder.addCase(asyncLoginFetch.fulfilled, (state, action) => {
      console.log("결과를 돌려받음");
      console.log(action);

      state.displayName = action.payload.displayName
        ? action.payload.displayName
        : null;
      state.uid = action.payload.uid ? action.payload.uid : null;
      state.email = action.payload.email ? action.payload.email : null;

      state.errMessage = action.payload.errMessage
        ? action.payload.errMessage
        : "";

      state.isLoading = false;
    });
    builder.addCase(asyncLoginFetch.rejected, (state, action) => {
      console.log("네트워크 에러");
      state.isLoading = false;
      state.errMessage = action.payload.errMessage; //rejected된것
    });
    // logout 케이스
    builder.addCase(asyncLogoutFetch.fulfilled, (state, action) => {
      console.log("로그아웃 완료");
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.errMessage = action.payload.errMessage;
    });
  },
});

//store에 포함하기 위한 export (조각냈으니 모아야 함.)
export default fbAuthSlice;
//dispatch 활용(액션을 만들어줌)
//여기에 들어가는 애들은 액션 키 들
export const {
  loginFB,
  logoutFB,
  isAuthReadyFB,
  updateNameFB,
  updateEmailFB,
  deleteUserFB,
  isErrorFB,
} = fbAuthSlice.actions;

//비동기 액션 크리에이터 (dispatch 로 호출)
// export { asyncLoginFetch };
