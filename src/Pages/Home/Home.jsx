import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (

        <div>
            <header>
                <h1>Este es mi Home</h1>
                <nav>
                    <Link to="/registro">Registrarse</Link>
                    <Link to="/iniciosesion">Iniciar Sesion</Link>
                </nav>
            </header>
            <main>
                <h1>Un proceso simple y transparente</h1>
                <h3>Tres pasos para contribuir al mejoramiento de nuestro entorno universitario. Tu voz activa los recursos necesarios</h3>
                <div>
                    <div>
                        <h2>1.Crea el Reporte</h2>
                        <h3>Describe el problema, selecciona la categoria...</h3>
                    </div>
                    <div>
                        <h2>2.Seguimiento</h2>
                        <h3>Recibe notidicaciones en tiempo real sobre...</h3>
                    </div>
                    <div>
                        <h2>3.Resolución</h2>
                        <h3>El equipo de mantenimiento institucional soluciona el...</h3>
                    </div>
                </div>
                <div>
                    <h2>¿Listo para mejorar tu campus?</h2>
                    <h3>Ingresa con tu correo institucional y se parte del bienestar de nuestra comunidad</h3>
                    <button onClick={<Link to="/registro">Registrarse</Link>}></button>
                </div>
            </main>
            <footer><h6>footer</h6></footer>
        </div>
    )
}

export default Home