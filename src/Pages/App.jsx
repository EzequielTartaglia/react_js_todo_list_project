// Import styles and libraries
import '../Styles/App.css';
import '../Styles/NavegadorBar.css';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

// Import components
import Instrucciones from './Instrucciones';
import GestorDeTareas from './GestorDeTareas';
import Particle from '../Componentes/Particles';
import NavegadorBar from '../Componentes/NavegadorBar';

export default function App() {
  const { isAuthenticated } = useAuth0();

  // Helper function for toast notifications
  const showToast = (message, type = 'info', delay = 3000) => {
    toast[type](message, {
      position: "bottom-center",
      autoClose: delay,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  // Backup function
  const backup = () => {
    setTimeout(() => {
      Swal.fire({
        title: '¿Desea continuar con la lista almacenada?',
        text: 'Si es la primera vez que ingresa o desea resetear su lista haga click en "Insertar lista vacia", si tiene una lista almacenada, haga click en "Insertar lista almacenada"',
        icon: "warning",
        focusConfirm: false,
        allowOutsideClick: false,
        showClass: { popup: "animate__animated animate__fadeInDown" },
        hideClass: { popup: "animate__animated animate__fadeOutUp" },
        width: 700,
        padding: "1.7rem",
        color: 'black',
        background: "linear-gradient(360deg, #0ecd97 , grey 70%)",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Insertar lista vacia',
        confirmButtonColor: 'red',
        denyButtonText: 'Insertar lista almacenada',
        denyButtonColor: 'black',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("Lista almacenada", JSON.stringify([]));
          showToast('¡Creando lista!', 'info');
          setTimeout(() => showToast('¡Lista creada, con exito!', 'success'), 3000);
        } else if (result.isDenied) {
          showToast('Cargando...', 'info');
          setTimeout(() => showToast('¡Lista cargada, con exito!', 'success'), 3000);
        }
      });
    }, 3000);
  };

  // Timer Log function
  const timerLog = () => {
    setTimeout(() => {
      showToast('¡Inicio de sesión, exitoso!', 'success', 1000);
    }, 500);
  };

  return (
    <div className="App">
      <Particle />
      <NavegadorBar />
      
      <h1 className="titleApp">Making time</h1>
      <h2 className="subTitleApp">Gestor de tareas</h2>

      <main>
        <QuoteHeader />
        
        <div>
          {/* Routes */}
          <Routes>
            <Route path="/instrucciones" element={<Instrucciones />} />
            <Route path="/gestor-de-tareas" element={<GestorDeTareas />} />
          </Routes>
        </div>
        
        {isAuthenticated ? (
          <>
            {/* Notifications on successful login */}
            <ToastContainer position="bottom-center" autoClose={5000} theme="dark" />
            {timerLog()}
            {backup()}
          </>
        ) : (
          <NotLogInInstructions />
        )}
      </main>

      <footer id="footerApp">
        <ul id="footerCredits">
          <li>Making time&#174;</li> |
          <li>Desarrollado por <span className="credito"><a href="https://www.linkedin.com/in/ezequieltartaglia/" target="blank">Ezequiel M. Tartaglia</a></span></li> |
          <li>Todos los derechos reservados 2022&copy;</li>
        </ul>
      </footer>
    </div>
  );
}

export function QuoteHeader() {
  return (
    <quote>
      <em className="quote">"La gestión del tiempo debe centrarse en decidir qué tareas debemos hacer y elegir lo que no debemos hacer. ¿Cómo ser más productivo? Comience por priorizar las tareas y asignarles franjas horarias específicas."</em>
    </quote>
  );
}

export function NotLogInInstructions() {
  return (
    <>
      <p>En <b className="titleBolder">Making time</b> podrás gestionar tu tiempo de manera eficaz. <b>Inicia sesión</b> para desbloquear funciones como:</p>
      <ul className="listApp">
        <li>Agregar tareas</li>
        <li>Buscar tareas en tu lista</li>
        <li>Inicializar tareas</li>
        <li>Almacenar tareas</li>
        <li>Concluir tareas</li>
        <li>Eliminar tareas</li>
      </ul>
    </>
  );
}
