import { useState } from 'react';
import '../Styles/FormularioLista.css';
import { FaCheckCircle, FaPause, FaPlay, FaEdit, FaTrash, FaReply } from "react-icons/fa";

export default function Task({ item, onUpdate, onDelete, onDone, onDoneCheck, started, checked }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(item.title);

  // Edit task form
  const FormEditar = () => (
    <form id='taskUpdateForm' onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="taskInput"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
      />
      <button id="buttonEdit" onClick={() => { onUpdate(item.id, newValue); setIsEditing(false); }}>
        Cambiar
      </button>
    </form>
  );

  // Common button component
  const IconButton = ({ id, onClick, icon }) => (
    <button id={id} onClick={onClick}>
      {icon}
    </button>
  );

  // Task started view
  const TaskStarted = () => (
    <div id='taskInformation' className='containerDoneStarted'>
      <span className='taskTitle'>{item.title}</span>
      <IconButton id="buttonDoneStarted" onClick={() => onDone(item.id)} icon={FaPause()} />
      <IconButton id="buttonDoneFinish" onClick={() => onDoneCheck(item.id)} icon={FaCheckCircle()} />
    </div>
  );

  // Task finished view
  const TaskFinished = () => (
    <div id='taskInformation' className='containerDoneFinished'>
      <span className='taskTitle'><del>{item.title}</del></span>
      <IconButton id="buttonDoneReply" onClick={() => onDone(item.id)} icon={FaReply()} />
      <IconButton id="buttonDoneFinished" onClick={() => onDoneCheck(item.id)} icon={FaCheckCircle()} />
    </div>
  );

  // Task to do view
  const TaskToDo = () => (
    <div id='taskInformation'>
      <IconButton id='buttonEdit' onClick={() => setIsEditing(true)} icon={FaEdit()} />
      <span className='taskTitle'>{item.title}</span>
      <IconButton id="buttonDone" onClick={() => onDone(item.id)} icon={FaPlay()} />
      <IconButton id="buttonDelete" onClick={() => onDelete(item.id)} icon={FaTrash()} />
    </div>
  );

  // Default task element rendering based on task state
  const TaskElement = () => {
    if (started) {
      return checked ? <TaskFinished /> : <TaskStarted />;
    }
    return <TaskToDo />;
  };

  return (
    <div className='taskToDo'>
      {isEditing ? <FormEditar /> : <TaskElement />}
    </div>
  );
}
