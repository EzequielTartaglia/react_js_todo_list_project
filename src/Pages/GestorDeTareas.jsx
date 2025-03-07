import { useAuth0 } from "@auth0/auth0-react";
import { FormularioLista } from '../Componentes/FormularioLista';

export default function ListaPage() {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) return null; 

    return (
        <>
            <h1>Gestor de tareas</h1>
            <div className='RecognizedUserMesagge'>
                ¡Hola <span>{user.name}</span>, continua desde donde te habías quedado!
            </div>
            <div className='LoggedList'>
                <FormularioLista />
            </div>
        </>
    );
}
