import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../Context/AuthProvider';
import SimpleSidebar from '../../Components/Sidebar/Sidebar';
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';

const PanelUsuario = () => {
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

  const accesosDirectos = [
    {
      titulo: 'Reportar Incidente',
      descripcion: 'Reporta daños en infraestructura, fallas eléctricas o de red de forma inmediata.',
      link: '/registrarincidente',
      icon: <AddCircleOutlineIcon sx={{ fontSize: 40, color: '#1e40af' }} />,
      bgColor: '#eff6ff'
    },
    {
      titulo: 'Mis Reportes',
      descripcion: 'Revisa el historial y haz el seguimiento en tiempo real del estado de tus reportes.',
      link: '/incidentesusuario',
      icon: <HistoryIcon sx={{ fontSize: 40, color: '#0ea5e9' }} />,
      bgColor: '#f0f9ff'
    },
    {
      titulo: 'Ver Estadísticas',
      descripcion: 'Consulta las métricas globales sobre la comunidad y reportes de la plataforma.',
      link: '/estadisticas',
      icon: <BarChartIcon sx={{ fontSize: 40, color: '#0f2d59' }} />,
      bgColor: '#f8fafc'
    }
  ];

  return (
    <SimpleSidebar>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Banner de Bienvenida */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0d233a', mb: 1, letterSpacing: '-0.025em' }}>
            Panel de Usuario
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#475569', mb: 1 }}>
            ¡Hola, {user ? user.nombre : "Usuario"}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bienvenido al portal de reporte y gestión de incidentes del campus. Selecciona una opción para comenzar.
          </Typography>
        </Box>

        {/* Cuadrícula de Accesos Rápidos */}
        <Grid container spacing={3}>
          {accesosDirectos.map((acceso, index) => (
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

export default PanelUsuario