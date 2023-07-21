import React, { useEffect, useState } from "react";
import { patchTitleTodo, patchCompletedTodo, deleteTodo } from "../axios/axios";
import { useFireStore } from "../hooks/useFireStore";

const ListItem = ({ item }) => {
  // console.log("ListItem 랜더링", item);
  const { deleteDocument, updateCompletedDocument, updateTitleDocument } =
    useFireStore("todo");
  const [isEdit, setIsEdit] = useState(false);
  //편집 상태 타이틀 설정 state
  const [editTitle, setEditTitle] = useState(item.title);

  const getStyle = _completed => {
    return {
      padding: "10px",
      textDecoration: _completed ? "line-through" : "none",
    };
  };
  //이벤트 핸들러

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleEditChange = e => {
    setEditTitle(e.target.value);
  };

  const handleCancleClick = () => {
    setIsEdit(false);
  };

  const handleSaveClick = _id => {
    updateTitleDocument(_id, editTitle);
    // let newTodoData = todoData.map(item => {
    //   if (item.id === _id) {
    //     item.title = editTitle;
    //     item.completed = false;
    //   }
    //   return item;
    // });
    // setTodoData(newTodoData);
    // 로컬스토리지 저장
    // localStorage.setItem("fbTodoData", JSON.stringify(newTodoData));
    //axios delete 호출 fbtodolist 삭제하기
    //console.log(_id, editTitle);

    //     axiosInstance
    //       .patch(`/todos/${_id}`, { title: editTitle })
    //       .then(res => res.data)
    //       .then(result => console.log(result))
    //       .catch(error => console.log(error));

    patchTitleTodo(_id, editTitle);
    item.completed = false;
    setIsEdit(false); //편집이 끝남
  };
  const handleCompleteChange = _id => {
    //FB의 fireStore에서 id를 참조 전달
    //FB의 firebase에서 completed를 반대로 !(Not 연산자 )
    updateCompletedDocument(_id, !item.completed);
    // let newTodoData = todoData.map(item => {
    //   if (item.id === _id) {
    //     //completed를 갱신.
    //     //true였던 걸 false로 false였던걸 true로
    //     item.completed = !item.completed;
    //   }
    //   return item;
    // });
    // setTodoData(newTodoData);
    // 로컬스토리지 저장
    // localStorage.setItem("fbTodoData", JSON.stringify(newTodoData));
    //axios fetch/put 호출 fbtodolist 삭제하기

    //console.log(_id, editTitle);
    patchCompletedTodo(_id, { ...item });
  };

  const handleDeleteClick = _id => {
    //console.log(_id);
    deleteDocument(_id);
    //전달된 ID를 검색해서 목록에서 제거
    //1. 전달된 ID로 해당하는 목록 찾아서 제외
    //2. 새로운 목록으로 갱신해서 화면 리랜더링
    //3. 배열의 고차함수 중 filter를 사용
    // const newTodoData = todoData.filter(item => item.id !== _id);
    // 로컬스토리지 저장
    // localStorage.setItem("fbTodoData", JSON.stringify(newTodoData));
    //axios fetch 호출 fbtodolist 삭제하기
    // setTodoData(newTodoData);
    // deleteTodo(_id);
  };

  if (isEdit) {
    //편집중
    return (
      <div className="flex items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center w-3/5">
          <input
            className="w-full px-3 py-2 mr-3 text-gray-500 rounded"
            type="text"
            // defaultValue={""}
            defaultValue={item.title}
            //흠
            // value={editTitle}
            // value={item.title}
            onChange={e => handleEditChange(e)}
          />
        </div>
        <div className="items-center">
          <button className="px-4 py-2 float-right" onClick={handleCancleClick}>
            Cancle
          </button>

          <button
            className="px-4 py-2 float-right"
            onClick={() => handleSaveClick(item.id)}
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    //일반 상태
    return (
      <div className="flex items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center flex" style={getStyle(item.completed)}>
          {/* defaultChecked: checkbox에 기본체크 상태 설정 */}
          <input
            type="checkbox"
            defaultChecked={item.completed}
            value={item.completed}
            onChange={() => handleCompleteChange(item.id)}
          />
          <span className="ml-3">{item.title}</span>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleDeleteClick(item.id)}
          >
            Delete
          </button>

          <button className="px-4 py-2 float-right" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
    );
  }
};

//리랜더링 최적화 적용
export default React.memo(ListItem);
