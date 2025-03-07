import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "react-json-pretty/themes/monikai.css";
import logo from "../Images/logo.png";

export default function NavegadorBar() {
  const { isAuthenticated } = useAuth0();

  return <>{isAuthenticated ? <NavLogin /> : <NavLogout />}</>;
}

//Componentes adicionales
export const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
    <>
      <li className={isActive === to ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    </>
  );
};

export const PerfilNav = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="nav-custom">
        <img className="img-nav-custom" src={user.picture} alt={user.name} />
      </div>
    )
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout()} className="logoutButton">
      {" "}
      Cerrar sesión
    </button>
  );
};
export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button onClick={() => loginWithRedirect()} className="loginButton">
        Iniciar sesión
      </button>
    </>
  );
};

export const NavLogin = () => {
  const { user } = useAuth0();

  return (
    <nav className="nav">
      <Link to="/instrucciones" className="site-title">
        <img src={logo} alt="" />
      </Link>

      <ul className="principalMenu">
        <CustomLink to="/instrucciones">Instrucciones</CustomLink>
        <CustomLink to="/gestor-de-tareas">Gestor de tareas</CustomLink>
      </ul>
      <ul>
        <PerfilNav />

        <ul className="sessionInfo">
          <li>{user.name}</li>
          <li>
            <CustomLink to="/">
              <LogoutButton />
            </CustomLink>
          </li>
          <li>
            <em>
              <u>Ultimo inicio:</u> {user.updated_at}
            </em>
          </li>

          {localStorage.setItem("User", user.name)}
          {localStorage.setItem("User img", user.picture)}
          {localStorage.setItem("Last Updated", user.updated_at)}
        </ul>
      </ul>
    </nav>
  );
};

export const NavLogout = () => {
  return (
    <nav className="nav">
      <Link className="site-title">
        <img src={logo} alt="" />
      </Link>

      <ul>
        <PerfilNav />

        <ul className="sessionInfo">
          <LoginButton />

          {localStorage.removeItem("User")}
          {localStorage.removeItem("User img")}
          {localStorage.removeItem("Last Updated")}
        </ul>
      </ul>
    </nav>
  );
};
