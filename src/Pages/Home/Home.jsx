import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Este es mi Home</h1>
            <Link to="/registro">Registrarse</Link>
            <Link to="/iniciosesion">Iniciar Sesion</Link>
        </div>
    )
}

export default Home