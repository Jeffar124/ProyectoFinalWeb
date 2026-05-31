import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../Context/AuthProvider';
import SimpleSidebar from '../../Components/Sidebar/Sidebar';

const PanelUsuario = () => {
  const auth = getAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Cierre de sesión exitoso
      console.log("Sesión cerrada correctamente");
      navigate('/')
    }).catch((error) => {
      // Ocurrió un error
      console.error("Error al cerrar sesión: ", error);
    });
  };

  return (
    <div>
      <SimpleSidebar>
        <h1>PanelUsuario</h1>
        <h1>Bienvenido {user ? user.nombre : "Usuario"}</h1>
        <Link to="/registrarincidente">Registrar Incidente</Link>
        <Link to="/incidentesusuario">Mis Reportes</Link>
        <Link to="/estadisticas">Ver Estadisticas</Link>
        <br />

        <button onClick={handleSignOut}>Cerrar Sesion</button>
      </SimpleSidebar>
    </div>

  )
}

export default PanelUsuario