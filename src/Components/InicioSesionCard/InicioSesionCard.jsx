import React, { useState } from 'react';
import './InicioSesionCard.css';
import { Link } from 'react-router-dom';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

const InicioSesionCard = ({ onLoginSubmit, errorServidor }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [changePassword, setChangePassword] = useState(true);
    const changeIcon = changePassword === true ? false : true;

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
                            placeholder="correo@universidad.edu.co"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type={changePassword ? "password" : "text"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    <div className="form-actions">
                        <Link to="/recuperar" className="forgot-password">¿Olvidaste tu contraseña?</Link>
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