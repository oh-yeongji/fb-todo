import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import { appAuth } from "../firebase/config";
import { sagaLoginSuccessFB, sagaLogoutSuccessFB } from "./fbAuthSlice";

//함수 *제너레이터는 실행중 멈춤, 재생이 가능하다.
function* fbAuthSaga() {
  console.log("saga : 1. fbAuthSaga 실행");
  //   yield takeEvery("액션타입", 처리할함수);
  yield takeEvery("fbAuthSlice/sagaLoginFB", fbLogin);
  yield takeEvery("fbAuthSlice/sagaLogoutFB", fbLogout);
}

function* fbLogin(action) {
  console.log("saga: 2. fbLogin");
  console.log(action);
  //외부 api연동을 시도한다.
  //   yield call(외부연동함수작성);
  const userCredential = yield call(() => {
    // //yield로 멈추기때문에 await필요없어
    const result = signInWithEmailAndPassword(
      appAuth,
      action.payload.email,
      action.payload.password,
    );
    return result;
  });
  const user = yield userCredential.user;
  // dispatch를 통해서 state를 업데이트 합니다.
  yield put(
    sagaLoginSuccessFB({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
    }),
  );
}

function* fbLogout(action) {
  console.log("saga: 2. fbLogout");
  console.log(action);
  yield call(() => {
    signOut(appAuth);
  });
  yield put(sagaLogoutSuccessFB());
}
export default fbAuthSaga;
