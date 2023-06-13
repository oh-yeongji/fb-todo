import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
  console.log("List 랜더링");
  return (
    <div>
      {/* 밑은 자스 자리 */}
      {todoData.map(item => (
        //key는 반복문에서 unique해야함.
        <ListItem
          key={item.id}
          item={item}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      ))}
    </div>
  );
};

export default React.memo(List);
