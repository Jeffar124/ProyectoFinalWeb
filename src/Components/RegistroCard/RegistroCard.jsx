import React, { useEffect, useState } from 'react'
import { app, auth, db } from "../../Firebase/config.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import './RegistroCard.css'

const RegistroCard = () => {
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
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formulario.correo,
                formulario.contraseña
            );

            const user = userCredential.user;

            console.log(user);

            await setDoc(doc(db, "usuarios", user.uid), {
                nombre: formulario.nombre,
                correo: formulario.correo,
                rol: "Usuario",
            });

        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }
    };




    return (
        <>
            <div className="registro-card">
                <h2 className="titulo">Registro</h2>

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
            </div>
        </>
    )
}

export default RegistroCard