import React, { useState } from 'react'
import './RecuperarContrasena.css'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';




const RecuperarContrasena = () => {

    const auth = getAuth();
    const [correo, setCorreo] = useState('');
    const navigate = useNavigate();

    const recuperarContrasena = async () => {
        try {
            await sendPasswordResetEmail(auth, correo);
            alert("Se ha enviado un enlace de recuperación a tu correo.");
            navigate('/iniciosesion')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='recuperar-container'>
            <div className='recuperar-card'>
                <div className='recuperar-header'>
                    <h2>Recuperar Contraseña</h2>
                    <p>Ingresa tu correo institucional para restablecer tu contraseña</p>
                </div>
                <form className='recuperar-form'
                    onSubmit={(e) => {
                        e.preventDefault();
                        recuperarContrasena(correo);
                    }}
                >
                    <div className='form-group'>
                        <label htmlFor='email'>Correo Institucional</label>
                        <input type='email' id='email' placeholder='correo@universidad.edu.co' required onChange={(e) => setCorreo(e.target.value)} />
                    </div>
                    <button type='submit' className='recuperar-btn'>
                        Enviar Correo
                    </button>
                </form>
                <div className='recuperar-footer'>
                    <p>¿Ya tienes una cuenta? <Link to='/iniciosesion'>Inicia Sesión</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RecuperarContrasena