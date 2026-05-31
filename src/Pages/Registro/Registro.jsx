import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../Firebase/config.js"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import RegistroCard from '../../Components/RegistroCard/RegistroCard'
import { useAuth } from '../../Context/AuthProvider';

const Registro = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { user, loading } = useAuth(); 

    useEffect(() => {
        if (loading) return;
        
        if (user) {
            if (user.rol === 'Usuario') {
                navigate("/panelusuario");
            } else {
                navigate('/paneladmin');
            }
        }
    }, [user, loading, navigate]);

    const handleRegisterFirebase = async (nombre, correo, contraseña) => {
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
            const userAuth = userCredential.user;

            await setDoc(doc(db, "usuarios", userAuth.uid), {
                nombre: nombre,
                correo: correo,
                rol: "Usuario", 
            });

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Este correo electrónico ya está registrado. Intenta iniciar sesión.');
            } else if (error.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else if (error.code === 'auth/invalid-email') {
                setError('El formato del correo electrónico no es válido.');
            } else {
                setError('Ocurrió un error al registrar la cuenta.');
            }
        }
    };

    return (
        <>
            <RegistroCard 
                onRegisterSubmit={handleRegisterFirebase}
                errorServidor={error}
            />
        </>
    );
};

export default Registro;