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
    <>
      <div className="container">
        <div className="todo-block">
          <div className="title">
            <h1>할일 목록</h1>
          </div>
          {/* 할일 목록 */}
          <List todoData={todoData} setTodoData={setTodoData} />
          {/* 할일 추가 */}
          <Form todoData={todoData} setTodoData={setTodoData} />
        </div>
      </div>
    </>
  );
}

export default App;
