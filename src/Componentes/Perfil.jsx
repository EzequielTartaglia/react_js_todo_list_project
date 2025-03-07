/* import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

//Informacion de usuario
export const Perfil = () => {

    //Datos del usuario
    const {user, isAuthenticated} = useAuth0()

    
    return(
        isAuthenticated &&(
        <div>
        
        <img class="img" src={user.picture} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
            
        <JSONPretty data={user}></JSONPretty>
    </div>

    ) 
        
    )
} */