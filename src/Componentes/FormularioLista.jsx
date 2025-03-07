import { useState, useEffect } from "react"
import Task from "./Task"
import '../Styles/FormularioLista.css'
import { FaSearch } from "react-icons/fa"

export function FormularioLista() {
    
    //Hook para hacer cambio de estado
        const [title, setTitle] = useState('')
        const [lista,setLista] = useState([])
        //Ver filtros por categoria
        const[showToDo,setShowToDo] = useState(false)
        const[showStarted,setShowStarted] = useState(false)
        const [showCompleted, setShowCompleted] = useState(false)

    //Funcion de busqueda
        const [search, setSearch]  = useState('')
        
        //Declarar una constante con la lista de datos
        const dataBase = JSON.parse(localStorage.getItem("Lista almacenada"))
        
        //Funcion para buscar
        function searcher(e){
            setSearch(e.target.value)
        }
        //Metodo para filtrar(lo buscado)
        let results = []
        if(!search){
            results = dataBase
        }
        else{
            results=  dataBase.filter((dataItem) => dataItem.title.toLowerCase().includes(search.toLocaleLowerCase()))
            
        }

    useEffect(() =>{
      if(localStorage.getItem("Lista almacenada")!== null){
        const savedList = JSON.parse(localStorage.getItem("Lista almacenada"))
        setLista(savedList)
      }
    },[])

    //Funcion para separar en categorias
    function FilterCategories(){             
            
            //Cambiar useState para mostrar todo
            function filterAll(e){
                setShowCompleted(true)
                setShowStarted(true)
                setShowToDo(true)
            }
            //Cambiar useState para mostrar solo completas
            function filterCompletedTasks(e){
                setShowCompleted(true)
                setShowStarted(false)
                setShowToDo(false)
            }
            //Cambiar useState para mostrar solo iniciadas
            function filterStartedTasks(e){
                setShowCompleted(false)
                setShowStarted(true)
                setShowToDo(false)
            }
            //Cambiar useState para mostrar solo por hacer
            function filterToDoTasks(e){
                setShowCompleted(false)
                setShowStarted(false)
                setShowToDo(true)
            }

                return <>
                <div className="filterSettings">
                
                {/* Mostrar todas las categorias si no hay ningun filtro activado (al iniciar sesion) */}
                {showToDo===false && showStarted===false && showCompleted===false ? (filterAll()):<></>}

                
                    <button value="" onClick={e=> filterAll(e)}>Mostrar todo</button>

                    <button value="" onClick={e=> filterCompletedTasks(e)}>Completadas</button>
                    
                    <button value="" onClick={e=> filterStartedTasks(e)}>En proceso</button>

                    <button value="" onClick={e=> filterToDoTasks(e)}>Por hacer</button>
                

                    </div>
                   
                </>
    }


    //Recibir informacion del input text
        function handleChange(e){
        //Traer los caracteres escritos(valor)
        const value = e.target.value
        //Setearlo
        setTitle(value)
        }
  
    //Funcion del submit
        function handleSubmit(e){
        e.preventDefault()

        if(title) {
            const newTask = {id: crypto.randomUUID(),
            title: title,
            started: false,
            checked: false
        }
            //Copiar la lista y setearlo
            setLista([...lista,newTask])
            //Agregarlo al LocalStorage
            localStorage.setItem("Lista almacenada",JSON.stringify([...lista,newTask]))
           //Borrar el valor(al cambiar estado)
            setTitle("")
        }

        }

    //Funcion para procesar el cambio de valores entre antiguo valor y editado
        function handleClickUpdate(id, value){

        const copiedList = [...lista]
        const item = copiedList.find(item => item.id === id)
        item.title = value
        //Guardar valor modificado en el localStorage
        localStorage.setItem("Lista almacenada",JSON.stringify([...copiedList]))
        setLista(copiedList)
        
        }

    //Funcion para eliminar task(tarea)
        function handleDelete(id){
            //Encontrar ese id
            const deleted = lista.filter(item => item.id !== id)
            setLista(deleted)
            //Borrar en localStorage
            localStorage.setItem("Lista almacenada",JSON.stringify(deleted))
        }

    //Funcion para iniciar task(tarea)
        function handleDone(id){
            const copiedList = [...lista]
            const item = lista.findIndex(item => item.id === id)
            copiedList[item] = {
                id: copiedList[item].id,
                title: copiedList[item].title,
                started: !copiedList[item].started,
                checked: false

            }
            localStorage.setItem("Lista almacenada",JSON.stringify(copiedList))
            setLista(copiedList)

            
        }
    
    //Funcion para poner check una task(tarea)
        function handleDoneCheck(id){
            const copiedList = [...lista]
            const item = lista.findIndex(item => item.id === id)
            copiedList[item] = {
                id: copiedList[item].id,
                title: copiedList[item].title,
                started: true,
                checked: !copiedList[item].checked
            }
            localStorage.setItem("Lista almacenada",JSON.stringify(copiedList))
            setLista(copiedList)
        }

    const taskTableRowsFilter = (startedValue,checkedValue) => {
        
        return (results
            .filter(task => task.started ===startedValue && task.checked===checkedValue) 
            .map(item => (
            <Task 
            key={item.id} 
            item={item} 
            onUpdate={handleClickUpdate} 
            onDelete={handleDelete} 
            onDone={handleDone}
            onDoneCheck = {handleDoneCheck}
            started={item.started}
            checked= {item.checked}
            />
        )))
        
    }

    //Componente final
    return <>
    <div className="container">

        <form className="form" onSubmit={handleSubmit}>

            <input 
            onChange={handleChange}
            className="taskInput" 
            value={title}/>

            <input 
            onClick={handleSubmit} 
            className="btnCreateTask" 
            type="submit" 
            value="Agregar tarea" />

        </form>

        <div className="searchBar">
            <div className="searchInput">
                <input type="search" 
                value={search}
                onChange={searcher}
                placeholder="Busca una tarea..." className="prompt"
                />
                <i className="searchIcon">{FaSearch()}</i>  
            </div>
        </div>
        

    <FilterCategories/>

    {/* Tabla con tareas por hacer */}
    <div className="tasksContainerToDo">
            {/* Recorrido del array (results
                viene desde el localStorage) */}
            {taskTableRowsFilter(false,false) <1 || showToDo===false
            ?<></>
            :<>
            <h2>Por hacer</h2>
           
            {showToDo &&(
                taskTableRowsFilter(false,false))}
            </>}
        </div>
        
        {/* Tabla con tareas iniciadas */}
        <div className="tasksContainerStarted">
            {/* Recorrido del array (results
                viene desde el localStorage) */}
            {taskTableRowsFilter(true,false) <1 || showStarted===false
            ?<></>
            :<> <h2>En proceso</h2>
            {showStarted &&(
                taskTableRowsFilter(true,false))}</>
            }
            

        </div>

        {/* Tabla con tareas hechas */}
        <div className="tasksContainerDone">
            {/* Recorrido del array (results
                viene desde el localStorage) */}
            {taskTableRowsFilter(true,true) <1 || showCompleted===false
            ?<></>
            : <><h2>Finalizadas</h2>
            {showCompleted &&(
                taskTableRowsFilter(true,true))}</>
            }
            
            

        </div>

    </div>
    </>
}