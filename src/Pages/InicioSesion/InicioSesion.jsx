import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InicioSesionCard from '../../Components/InicioSesionCard/InicioSesionCard';

const InicioSesion = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLoginFirebase = (email, password) => {
        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso, redirigimos a la raíz
                navigate("/panelusuario");
            })
            .catch((error) => {
                // Controlamos los errores que vienen del servidor de Firebase
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    setError('Credenciales incorrectas. Inténtalo de nuevo.');
                } else {
                    setError('Ocurrió un error al intentar conectar con el servidor.');
                }
            });
    };

    return (
        <>
            {/* Le pasamos la lógica al componente a través de sus propiedades */}
            <InicioSesionCard 
                onLoginSubmit={handleLoginFirebase} 
                errorServidor={error}
            />
        </>
    );
};

export default InicioSesion;