import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTask.trim() === "") return;

    if (editingIndex !== null) {
      const updated = [...todos];
      updated[editingIndex].text = newTask;
      setTodos(updated);
      setEditingIndex(null);
    } else {
      setTodos([...todos, { text: newTask, completed: false }]);
    }

    setNewTask("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const editTodo = (index) => {
    setNewTask(todos[index].text);
    setEditingIndex(index);
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>{editingIndex !== null ? "Update" : "Add"}</button>
      </div>

      <ul>
  {todos.map((todo, index) => (
    <li key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(index)}
        />
        <span>{todo.text}</span>
      </div>
      <div className="buttons">
        <button className="complete" onClick={() => toggleComplete(index)}>
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button className="edit" onClick={() => editTodo(index)}>Edit</button>
        <button className="delete" onClick={() => deleteTodo(index)}>Delete</button>
      </div>
    </li>
  ))}
</ul>


      {todos.length > 0 && (
        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default App;
