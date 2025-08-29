import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, deleteItem, toggleComplete, editItem }) => {
  return (
    <div>
      {tasks.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          deleteItem={deleteItem}
          toggleComplete={toggleComplete}
          editItem={editItem}
        />
      ))}
    </div>
  );
};

export default TodoList;
