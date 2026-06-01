import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../Context/AuthProvider';
import SimpleSidebar from '../../Components/Sidebar/Sidebar';
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
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
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ 
                                height: '100%', 
                                borderRadius: '16px', 
                                border: '1px solid #e2e8f0', 
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 20px -8px rgba(13, 35, 58, 0.12)',
                                    borderColor: '#cbd5e1'
                                }
                            }}>
                                <CardActionArea component={Link} to={acceso.link} sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                    <Box sx={{ 
                                        p: 1.5, 
                                        borderRadius: '12px', 
                                        backgroundColor: acceso.bgColor, 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        mb: 3
                                    }}>
                                        {acceso.icon}
                                    </Box>
                                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: '#0d233a', mb: 1.5 }}>
                                        {acceso.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {acceso.descripcion}
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </SimpleSidebar>
    )
}

export default PanelAdmin