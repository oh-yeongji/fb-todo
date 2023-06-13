import React, { useState } from "react";

const Form = ({ todoData ,setTodoData }) => {
  // 새로운 할일 state 변수
  const [value, setValue] = useState("");

  // input type = "text" 의 value 변경 화면 리랜더링
  const handleChange = e => {
    setValue(e.target.value);
  };
  //form submit실행시 체크
  const handleSubmit = e => {
    //웹 브라우저 url주소표시창으로 데이터 전송을 막아야함.
    //마치 a태그의 href를 막아주듯이.
    e.preventDefault();
    //새로운 todo객체를 만들어준다.
    //형식 즉 , 키명을 구조를 지켜줘야 함.
    const newTodo = { id: Date.now(), title: value, completed: false };
    //그리고state저장. 화면이 랜더링 된다.
    //todoData에 추가.
    setTodoData([...todoData, newTodo]);
    //입력창 초기화
    setValue("");
  };
  return (
    <div>
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          placeholder="할일을 입력해주세요."
          value={value}
          onChange={handleChange}
        />
        <input type="submit" style={{ flex: "1" }} value="입력" />
      </form>
    </div>
  );
};

export default Form;
