import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import {
  RiCloseCircleLine,
  RiCheckboxCircleLine,
  RiArrowDownCircleLine,
} from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({
  completeTodo,
  removeTodo,
  updateTodo,
  showDescription,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/api') 
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);


  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div className="description">
        <div
          key={todo.id}
          onClick={() => completeTodo(todo.id)}
          className="todo"
        >
          Id: {todo.id} | Title: {todo.title} | Description: {todo.description} | State: {todo.state}
        </div>
        <div className="icons">
          <RiCheckboxCircleLine
            onClick={() => completeTodo(todo.id)}
            className="delete-icon"
          />
          <RiArrowDownCircleLine
            onClick={() => showDescription(todo.id)}
            className="delete-icon"
          />
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
          <TiEdit
            onClick={() =>
              setEdit({
                id: todo.id,
                value: todo.text,
                description: todo.description,
              })
            }
            className="edit-icon"
          />
        </div>
      </div>
      {todo.showDescription && (
        <div onClick={() => completeTodo(todo.id)} className="description">
          Description: {todo.description}
        </div>
      )}
    </div>
  ));
};

export default Todo;
