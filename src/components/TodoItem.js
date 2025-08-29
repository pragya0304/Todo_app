import React from "react";
import "./TodoItem.css";

const TodoItem = ({ item, index, deleteItem, toggleComplete, editItem }) => {
  return (
    <li className={`todo-item ${item.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleComplete(index)}
      />
      <span>{item.text}</span>
      <div className="buttons">
        <button onClick={() => editItem(index)}>Edit</button>
        <button onClick={() => deleteItem(index)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
