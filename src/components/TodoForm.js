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

  const [newDelete, setNewInputDelete] = useState("");
  const [newes, setnewes] = useState("");

  const inputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChangeDrop = (event) => {
    setSelectedOption(event.target.value);
  };

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

  const handleState = (e) => {
    e.preventDefault();
    console.log('cambiando state')

    const requestData = {
      id: newes,
      state: selectedOption === "true" ? true : false
    };


    fetch("http://localhost:9000/api/state", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
    .then(response => {
      if (response.ok) {
        console.log("Petición exitosa");
        alert('Estado cambiado')
      } else {
        console.error("Error en la petición");
      }
    })
    .catch(error => {
      console.error("Error al enviar la solicitud:", error);
    });


    
  }

  const handleDelete = (e) => {
    e.preventDefault();

    const todoid = {
      id: newDelete
    };

    fetch('http://localhost:9000/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoid)
    })
      .then(response => {
        if (response.ok) {
          console.log('Todo deleted successfully');
          alert(`To-do #${todoid.id} deleted`)
        } else {
          throw new Error('Error deleting todo');


        }
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
        alert(`To-do #${todoid.id} does not exist`)
      });


  }

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
          alert('Nuevo To-do agregado a la lista')
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
          alert('Datos actualizados correctamente')
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

  const handleDeleteInput = (e) => {
    setNewInputDelete(e.target.value);
  }

  const handleStateInput = (e) => {
    setnewes(e.target.value);
  }

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
            <h2>Editar To-do</h2>
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

          {/* Aquí pongo el nuevo input para eliminar */}
          <h2>Eliminar To-do</h2>
          <input
            placeholder="Ingrese ID"
            value={newDelete}
            onChange={handleDeleteInput}
            className="todo-input"
          />
          <button onClick={handleDelete} className="todo-button">
            Eliminar
          </button>
          {/* lo finalizo acá */}

          {/* -------------------------------- */}

          {/* aqui comienzan los inputs para el state */}
          <div>
            <h2>Cambiar state</h2>
            <input
            placeholder="Ingrese ID"
            value={newes}
            onChange={handleStateInput}
            className="todo-input"
          />
            <select value={selectedOption} onChange={handleChangeDrop} className="todo-input">
              <option value="">Selecciona una opcion</option>
              <option value="true">Done</option>
              <option value="false">Undone</option>
            </select>
            <button onClick={handleState} className="todo-button">
              Cambiar
            </button>

          </div>
          {/* aqui finalizan los inputs del state */}
        </>
      )}
    </form>
  );
}

export default TodoForm;
