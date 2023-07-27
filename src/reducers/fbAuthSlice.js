import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";

//slice 초기값
const initialState = {
  uid: null,
  displayName: null,
  email: null,
  isAuthReady: false, //로그인 상태 체크
  errMessage: "", // 에러 메시지
};
//slice생성
const fbAuthSlice = createSlice({
  name: "fbAuthSlice", //일반적으로 변수이름씀.아무거나 써도 됨.
  initialState: initialState,
  //액션 크리에이터 함수 모음들  (액션생성함수)
  //상태를 즉시 업데이트(동기 코드)
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
      console.log(action);
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
});

//store에 포함하기 위한 export (조각냈으니 모아야 함.)
export default fbAuthSlice;
//dispatch 활용(액션을 만들어줌)
export const {
  loginFB,
  logoutFB,
  isAuthReadyFB,
  updateNameFB,
  updateEmailFB,
  deleteUserFB,
  isErrorFB,
} = fbAuthSlice.actions;
