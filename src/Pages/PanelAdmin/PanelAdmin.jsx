import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../Context/AuthProvider';
import SimpleSidebar from '../../Components/Sidebar/Sidebar';
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminAccessCard from '../../Components/AdminAccessCard/AdminAccessCard';
import { History } from '@mui/icons-material';

const PanelAdmin = () => {
    const auth = getAuth();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sesión cerrada correctamente");
            navigate('/')
        }).catch((error) => {
            console.error("Error al cerrar sesión: ", error);
        });
    };

    const accesosAdmin = [
        {
            titulo: 'Ver Incidentes',
            descripcion: 'Consulta en forma de tabla todos los incidentes registrados en el sistema.',
            link: '/incidentesadmin',
            icon: <History sx={{ fontSize: 40, color: '#1e40af' }} />,
            bgColor: '#eff6ff'
        },
        {
            titulo: 'Ver Estadísticas',
            descripcion: 'Consulta gráficos interactivos de distribución de roles y tendencias del sistema.',
            link: '/estadisticas',
            icon: <BarChartIcon sx={{ fontSize: 40, color: '#1e40af' }} />,
            bgColor: '#eff6ff'
        }
    ];

    return (
        <SimpleSidebar>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                {/* Banner de Bienvenida Admin */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0d233a', mb: 1, letterSpacing: '-0.025em' }}>
                        Panel de Administración
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#475569', mb: 1 }}>
                        ¡Bienvenido, {user ? user.nombre : "Administrador"}!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Acceso a las herramientas de control y análisis de métricas globales de Uniamazonia Reporta.
                    </Typography>
                </Box>

                {/* Cuadrícula de Accesos Rápidos Admin */}
                <Grid container spacing={3}>
                    {accesosAdmin.map((acceso, index) => (
                        <AdminAccessCard key={index} acceso={acceso} />
                    ))}
                </Grid>
            </Container>
        </SimpleSidebar>
    )
}

export default PanelAdmin