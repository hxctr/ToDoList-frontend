import React, { useState, useEffect, useRef } from "react";
import { BsArrowDown, BsPlusCircleFill } from "react-icons/bs";
import { RiCheckboxCircleLine } from "react-icons/ri";

function TodoForm(props) {

  //esto es para los inputs principales
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ""
  );

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setShowDescription(!showDescription);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //este si es para los todos list
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      description,
      isDone: false,
      showDescription: true,
    });


    //este objeto es para el fetch con el POST
    const todoData = {
      title: input,
      description: description
    };

    //--
    // peticion POST para aniadir un nuevo todo
    fetch('https://todo-api-h8ov.onrender.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoData)
    })
      .then(response => {
        if (response.ok) {
          console.log("Datos enviados exitosamente");
        } else {
          throw new Error("Error en la petición");
        }
      })
      .catch(error => {
        console.error("Error al enviar los datos:", error);
      });
    //--
    setInput("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <div className="todo-form--update">
          {/* de aquí abajo es para mostrar unos campos para actualizar */}
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit todo-description"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            name="description"
            className="todo-input todo-description"
          />

          <button onClick={handleSubmit} className="todo-button">
            <RiCheckboxCircleLine />
          </button>
        </div>
      ) : (
        <>
          {/* Aquí para abajo es para añadir un nuevo to-do */}
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleDescription} className="todo-button edit">
            <BsArrowDown />
          </button>
          <button onClick={handleSubmit} className="todo-button">
            <BsPlusCircleFill />
          </button>
          {showDescription && (
            <textarea
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              className="todo-input todo-description"
            />
          )}
        </>
      )}
    </form>
  );
}

export default TodoForm;
