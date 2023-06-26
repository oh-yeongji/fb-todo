import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
  // console.log("List 랜더링");
  return (
    <div>
      {/* 밑은 자스 자리 */}
      {todoData.map(item => (
        //key는 반복문에서 unique해야함.
        <ListItem
          // 여기서 key는 for 용
          key={item.id}
          item={item}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      ))}
    </div>
  );
};
//리랜더링 최적화를 위한 코드
export default React.memo(List);


