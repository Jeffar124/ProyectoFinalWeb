import React, { useState } from 'react';
import './InicioSesionCard.css';
import { Link } from 'react-router-dom';

const InicioSesionCard = ({ onLoginSubmit, errorServidor }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Le pasa las credenciales a la Página contenedora
        onLoginSubmit(email, password);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Bienvenido</h2>
                    <p>Ingresa tus credenciales para acceder</p>
                </div>

                {errorServidor && <p className="error-message">{errorServidor}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo Institucional</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="usuario@uniamazonia.edu.co"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <a href="#forgot" className="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className="login-btn">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="login-footer">
                    <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
                </div>
            </div>
        </div>
    );
};

export default InicioSesionCard;