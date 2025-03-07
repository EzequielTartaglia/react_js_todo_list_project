import { useState, useEffect } from "react";
import Task from "./Task";
import '../Styles/FormularioLista.css';
import { FaSearch } from "react-icons/fa";

export function FormularioLista() {
  const [title, setTitle] = useState('');
  const [lista, setLista] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    showToDo: false,
    showStarted: false,
    showCompleted: false
  });

  const dataBase = JSON.parse(localStorage.getItem("Lista almacenada")) || [];

  useEffect(() => {
    if (dataBase.length > 0) {
      setLista(dataBase);
    }
  }, []);

  const searcher = (e) => setSearch(e.target.value);

  const filteredTasks = search
    ? dataBase.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
    : dataBase;

  const handleChange = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      const newTask = {
        id: crypto.randomUUID(),
        title,
        started: false,
        checked: false
      };
      const updatedList = [...lista, newTask];
      setLista(updatedList);
      localStorage.setItem("Lista almacenada", JSON.stringify(updatedList));
      setTitle('');
    }
  };

  const handleUpdate = (id, value) => {
    const updatedList = lista.map(task => task.id === id ? { ...task, title: value } : task);
    setLista(updatedList);
    localStorage.setItem("Lista almacenada", JSON.stringify(updatedList));
  };

  const handleDelete = (id) => {
    const updatedList = lista.filter(task => task.id !== id);
    setLista(updatedList);
    localStorage.setItem("Lista almacenada", JSON.stringify(updatedList));
  };

  const handleToggleTask = (id, field) => {
    const updatedList = lista.map(task =>
      task.id === id ? { ...task, [field]: !task[field] } : task
    );
    setLista(updatedList);
    localStorage.setItem("Lista almacenada", JSON.stringify(updatedList));
  };

  const handleFilter = (filter) => {
    setFilters(prev => ({ ...prev, ...filter }));
  };

  const renderTaskRows = (startedValue, checkedValue) => {
    return filteredTasks
      .filter(task => task.started === startedValue && task.checked === checkedValue)
      .map(item => (
        <Task
          key={item.id}
          item={item}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onDone={() => handleToggleTask(item.id, 'started')}
          onDoneCheck={() => handleToggleTask(item.id, 'checked')}
        />
      ));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="taskInput"
          value={title}
        />
        <input
          onClick={handleSubmit}
          className="btnCreateTask"
          type="submit"
          value="Agregar tarea"
        />
      </form>

      <div className="searchBar">
        <div className="searchInput">
          <input
            type="search"
            value={search}
            onChange={searcher}
            placeholder="Busca una tarea..."
            className="prompt"
          />
          <i className="searchIcon"><FaSearch /></i>
        </div>
      </div>

      <div className="filterSettings">
        {['Mostrar todo', 'Completadas', 'En proceso', 'Por hacer'].map((text, index) => (
          <button
            key={text}
            onClick={() => handleFilter({ [`show${text.replace(/\s/g, '')}`]: true })}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="tasksContainerToDo">
        {filters.showToDo && renderTaskRows(false, false)}
      </div>

      <div className="tasksContainerStarted">
        {filters.showStarted && renderTaskRows(true, false)}
      </div>

      <div className="tasksContainerDone">
        {filters.showCompleted && renderTaskRows(true, true)}
      </div>
    </div>
  );
}
