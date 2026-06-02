import React, { useEffect, useState } from 'react'
import './RegistroCard.css'
import { Link } from 'react-router-dom';

import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

const RegistroCard = ({ onRegisterSubmit, errorServidor }) => {
    const [formulario, setFormulario] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
    });

    const [changePassword, setChangePassword] = useState(true);
    const changeIcon = changePassword === true ? false : true;

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onRegisterSubmit(formulario.nombre, formulario.correo, formulario.contraseña);
    };



    return (
        <div className="registro-container">
            <div className="registro-card">
                <div className="registro-header">
                    <h2>Crear Cuenta</h2>
                    <p>Regístrate para reportar incidentes en tu campus</p>
                </div>

                {errorServidor && <p className='error-message'>{errorServidor}</p>}

                <form onSubmit={handleSubmit} className="registro-form">
                    <div className="grupo-input">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre completo"
                            required
                        />
                    </div>

                    <div className="grupo-input">
                        <label htmlFor="correo">Correo Institucional</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            value={formulario.correo}
                            onChange={handleChange}
                            placeholder="correo@universidad.edu.co"
                            required
                        />
                    </div>

                    <div className="grupo-input">
                        <label htmlFor="contraseña">Contraseña</label>
                        <input
                            type={changePassword ? "password" : "text"}
                            id="contraseña"
                            name="contraseña"
                            value={formulario.contraseña}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                        <span className="icon"
                            onClick={() => {
                                setChangePassword(changeIcon);
                            }}
                        >
                            {changeIcon ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                        </span>
                    </div>

                    <button type="submit" className="btn-registro">
                        Registrarse
                    </button>
                </form>
                <div className="registro-footer">
                    <p>¿Ya tienes una cuenta? <Link to={"/iniciosesion"}>Inicia Sesión</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RegistroCard