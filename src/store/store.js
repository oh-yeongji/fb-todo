import { configureStore } from "@reduxjs/toolkit";
import fbAuthSaga from "../reducers/fbAuthSaga";
import fbAuthSlice from "../reducers/fbAuthSlice";
//Saga관련
import createSagaMiddleware from "@redux-saga/core";

const saga = createSagaMiddleware();

//reducer 들을 모아줌.
const store = configureStore({
  reducer: {
    fbAuth: fbAuthSlice.reducer,
  },
  middleware: [saga],
});

saga.run(fbAuthSaga);

//store.reducer는 1개만 가능 ,reducers아니고 reducer

export default store;
