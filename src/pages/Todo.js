import { useEffect, useState } from "react";
import React from "react";
import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { getTodo, deleteAllTodo } from "../axios/axios";
// import Loading from "../components/Loading";
//사용자의 uid가 필요함.
//이유: 회원가입을 여러명이 할수 있는데,
//todo를 등록해 주기 위해서 uid 필요
import { useAuthContext } from "../hooks/useFirebase";
import { useCollection } from "../hooks/useCollection";
const Todo = ({ fbName, fbEmail, fbUid }) => {
  //사용자별 등록을 위해 user를 참조
  const { user } = useAuthContext();
  //컬렉션 데이터 출력state
  const { documents, error } = useCollection("todo", ["uid", "==", user.uid]);
  console.log("문서목록========");
  console.log(documents);
  const navigator = useNavigate();

  //로딩처리
  // const [isLoading, setIsLoading] = useState(true);

  // 백엔드반에 DB table 구성에 활용한다.
  //FB, MongDB에서는 Collection 구성에 활용한다.
  console.log(fbName, fbEmail);
  //jsonServer 데이터 state변수
  // const initTodoData = [];
  //로컬 데이터 state변수
  // const initTodoData=localStorage.getItem("fbTodoData")
  const [todoData, setTodoData] = useState([]);

  const handleRemoveClick = () => {
    setTodoData([]);
    //로컬스토리지 초기화
    // localStorage.setItem("fbTodoData", JSON.stringify([]));
    deleteAllTodo();
  };

  //이벤트 핸들러

  return (
    <div className="flex justify-center items-start mt-5 w-full">
      {/* isLoading이 true면 얘를 보여줘 */}
      {/* {isLoading && <Loading />} */}
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className="text-center w-3/4 text-2xl text-red-600 font-semibold">
            Firebase Todo-List
          </h1>
          <button
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]"
            onClick={handleRemoveClick}
          >
            Delete All
          </button>
        </div>
        {/* 할일 목록 */}
        {error && <strong>{error}</strong>}
        {documents && <List todoData={documents} />}
        {/* <List todoData={todoData} setTodoData={setTodoData} /> */}
        {/* 할일 추가 */}
        <Form todoData={todoData} setTodoData={setTodoData} uid={user.uid} />
      </div>
    </div>
  );
};

export default Todo;
