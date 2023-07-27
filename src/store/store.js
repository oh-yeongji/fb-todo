import { configureStore } from "@reduxjs/toolkit";
import fbAuthSlice from "../reducers/fbAuthSlice";

//reducer 들을 모아줌.
const store = configureStore({
  reducer: {
    fbAuth: fbAuthSlice.reducer,

  },
});
//store.reducer는 1개만 가능 ,reducers아니고 reducer

export default store;
