import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Store the list of all todos
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  // Store the current input value
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
 // Add new task in the list
  const addTodo = () => {
    if (newTask.trim() === "") return;

    if (editingIndex !== null) {
      //track which task is being edited
      const updated = [...todos];
      updated[editingIndex].text = newTask;
      setTodos(updated);
      setEditingIndex(null);
    } else {
      setTodos([...todos, { text: newTask, completed: false }]);
    }

    setNewTask("");
  };
// Delete the task from the list
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
 // Mark the task as completed
  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };
// Edit the task in the list
  const editTodo = (index) => {
    setNewTask(todos[index].text);
    setEditingIndex(index);
  };
// Clear all the tasks from the list
  const clearAll = () => {
    setTodos([]);
  };
// Main structure of the app
  return (
    <div className="app">
      <h1>Todo List</h1>
      {/* Input box and Add/update button     */}
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>{editingIndex !== null ? "Update" : "Add"}</button>
      </div>
      {/* List of all tasks */}
      <ul>
  {todos.map((todo, index) => (
    <li key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {/* Task content with checkbox and text */}
      <div className="task-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(index)}
        />
        <span>{todo.text}</span>
      </div>
      {/* Action buttons: Complete, Edit, Delete */}
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
      {/* Clear all button, shown only if task exist */}
      {todos.length > 0 && (
        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default App;
