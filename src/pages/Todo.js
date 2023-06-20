import { useEffect, useState } from "react";
import React from "react";
import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { getTodo, deleteAllTodo } from "../axios/axios";
import Loading from "../components/Loading";

const Todo = ({ fbName, fbEmail, fbUid }) => {
  const navigator = useNavigate();

  //로딩처리
  const [isLoading, setIsLoading] = useState(true);
  
  // 백엔드반에 DB table 구성에 활용한다.
  //FB, MongDB에서는 Collection 구성에 활용한다.
  console.log(fbName, fbEmail);
  //jsonServer 데이터 state변수
  const initTodoData = [];
  const [todoData, setTodoData] = useState(initTodoData);

  const handleRemoveClick = () => {
    setTodoData([]);
    //로컬스토리지 초기화
    // localStorage.setItem("fbTodoData", JSON.stringify([]));
    deleteAllTodo();
  };

  //uid 없는경우 로그인으로 바로보내기
  useEffect(() => {
    // if (fbUid == "") {
    if (!fbUid) {
      navigator("/login");
    }
  }, []);

  //axios get 호출 fbtodolist 호출 자료받기
  useEffect(() => {
    getTodo(setTodoData, setIsLoading);
  }, []);

  //이벤트 핸들러

  return (
    <div className="flex justify-center items-start mt-5 w-full">
      {/* isLoading이 true면 얘를 보여줘 */}
      {isLoading && <Loading />}
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
        <List todoData={todoData} setTodoData={setTodoData} />
        {/* 할일 추가 */}
        <Form
          todoData={todoData}
          setTodoData={setTodoData}
          fbName={fbName}
          fbEmail={fbEmail}
        />
      </div>
    </div>
  );
};

export default Todo;
