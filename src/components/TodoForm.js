import React, { useState, useEffect, useRef } from "react";
import { BsArrowDown, BsPlusCircleFill } from "react-icons/bs";
import { RiCheckboxCircleLine } from "react-icons/ri";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ""
  );

  const [newInput, setNewInput] = useState("");
  const [newDescription, setNewDescription] = useState("");

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

    const todoData = {
      title: input.trim(),
      description: description.trim()
    };

    fetch('http://localhost:9000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Datos enviados exitosamente');
          setInput('');
          setDescription('');
        } else {
          console.error('Error en la petición');
        }
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const todoData = {
      id: newInput.trim(),
      description: newDescription.trim()
    };

    fetch('http://localhost:9000/api', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Datos actualizados exitosamente');
          setNewInput('');
          setNewDescription('');
        } else {
          console.error('Error en la petición');
        }
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
  };

  const handleNewInputChange = (e) => {
    setNewInput(e.target.value);
  };

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <div className="todo-form--update">
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

          {/* Nuevo input y textarea */}
          <div>
            <input
              placeholder="Ingrese id"
              value={newInput}
              onChange={handleNewInputChange}
              className="todo-input"
            />
            <textarea
              placeholder="Digite la nueva descripcion"
              value={newDescription}
              onChange={handleNewDescriptionChange}
              className="todo-input todo-description"
            />
            <button onClick={handleEdit} className="todo-button">
              <BsPlusCircleFill />
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default TodoForm;
