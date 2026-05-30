import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../Context/AuthProvider';

const PanelAdmin = () => {
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
            <h1>Panel Admin</h1>
            <h2>Bienvenido {user ? user.nombre : "Administrador"}</h2>
            <button onClick={handleSignOut}>Cerrar Sesion</button>
        </div>
    )
}

export default PanelAdmin