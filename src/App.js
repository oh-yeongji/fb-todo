import { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  console.log("App 랜더링");
  // 더미 데이터 state변수
  //useState안에 초기값이 들어가면
  //더미데이터 일반변수에서 state변수가됨
  const [todoData, setTodoData] = useState([
    { id: 1, title: "할일 1", completed: true },
    { id: 2, title: "할일 2", completed: false },
    { id: 3, title: "할일 3", completed: true },
    { id: 4, title: "할일 4", completed: true },
  ]);
  //이벤트 핸들러

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div>
          <div className="flex justify-between mb-3">
            <h1 className="text-center w-3/4 text-2xl text-red-600 font-semibold">
              Firebase Todo-List
            </h1>
          </div>
          {/* 할일 목록 */}
          <List todoData={todoData} setTodoData={setTodoData} />
          {/* 할일 추가 */}
          <Form todoData={todoData} setTodoData={setTodoData} />
        </div>
      </div>
    </div>
  );
}

export default App;
