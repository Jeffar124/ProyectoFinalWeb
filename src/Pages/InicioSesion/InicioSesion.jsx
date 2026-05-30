import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InicioSesionCard from '../../Components/InicioSesionCard/InicioSesionCard';
import { useAuth } from '../../Context/AuthProvider';

const InicioSesion = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const auth = getAuth();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            if (user.rol === 'Usuario') {
                navigate("/panelusuario");
            } else {
                navigate('/paneladmin');
            }
        }
    }, [user, navigate]);

    const handleLoginFirebase = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                // Controlamos los errores que vienen del servidor de Firebase
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
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