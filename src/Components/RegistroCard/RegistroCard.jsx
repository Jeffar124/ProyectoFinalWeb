import React, { useEffect, useState } from 'react'
import './RegistroCard.css'
import { Link } from 'react-router-dom';

const RegistroCard = ({ onRegisterSubmit, errorServidor}) => {
    const [formulario, setFormulario] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
    });

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
        <>
            <div className="registro-card">
                <h2 className="titulo">Registro</h2>

                {errorServidor && <p className='error-message'>{errorServidor}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="grupo-input">
                        <label>Nombre Completo</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre"
                        />
                    </div>

                    <div className="grupo-input">
                        <label>Correo</label>
                        <input
                            type="email"
                            name="correo"
                            value={formulario.correo}
                            onChange={handleChange}
                            placeholder="Ingrese su correo"
                        />
                    </div>

                    <div className="grupo-input">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="contraseña"
                            value={formulario.contraseña}
                            onChange={handleChange}
                            placeholder="Ingrese su contraseña"
                        />
                    </div>

                    <button type="submit" className="btn-registro">
                        Registrarse
                    </button>
                </form>
                <div>
                    <p>¿Ya tienes una cuenta? <Link to={"/iniciosesion"}>Inicia Sesión</Link></p>
                </div>
            </div>
        </>
    )
}

export default RegistroCard