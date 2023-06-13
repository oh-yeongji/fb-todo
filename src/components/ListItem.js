import React from "react";

const ListItem = ({ item, todoData, setTodoData }) => {
  console.log("ListItem 랜더링", item);
  const btnStyle = {
    color: "#fff",
    float: "right",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
  };
  const getStyle = _completed => {
    return {
      padding: "10px",
      borderBottom: "1px dotted #ccc",
      textDecoration: _completed ? "line-through" : "none",
    };
  };
  //이벤트 핸들러
  const handleClick = _id => {
    //전달된 ID를 검색해서 목록에서 제거
    //1. 전달된 ID로 해당하는 목록 찾아서 제외
    //2. 새로운 목록으로 갱신해서 화면 리랜더링
    //3. 배열의 고차함수 중 filter를 사용
    const newTodoData = todoData.filter(item => item.id !== _id);
    setTodoData(newTodoData);
  };
  const handleCompleteChange = _id => {
    //중요한 것은 id에 해당하는것만 수정하면 되는게 아님.
    //state는 항상 새롭게 만든내용  즉, 배열로 업데이트 해야한다.
    // 새로운 배열을 만들어서 set하자.

    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        //completed를 갱신.
        //true였던 걸 false로 false였던걸 true로
        item.completed = !item.completed;
      }
      return item;
    });
    setTodoData(newTodoData);
  };

  return (
    <div style={getStyle(item.completed)} key={item.id}>
      {/* defaultChecked: checkbox에 기본체크 상태 설정 */}
      <input
        type="checkbox"
        defaultChecked={item.completed}
        onChange={() => handleCompleteChange(item.id)}
      />
      {/* html태그에서 자스 출력할때 */}
      {item.title}
      <button style={btnStyle} onClick={() => handleClick(item.id)}>
        X
      </button>
    </div>
  );
};

export default ListItem;
