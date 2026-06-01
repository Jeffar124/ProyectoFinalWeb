import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider';
import GraficoIncidentes from '../../Components/GraficoIncidentes/GraficoIncidentes';
import SimpleSidebar from '../../Components/Sidebar/Sidebar';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Estadisticas = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleVolver = () => {
    if (user && user.rol === 'Usuario') {
      navigate('/panelusuario');
    } else if (user && user.rol === 'Administrador') {
      navigate('/paneladmin');
    } else {
      navigate(-1);
    }
  }

  return (
    <SimpleSidebar>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Cabecera con Botón Volver */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 5 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#0d233a', mb: 1, letterSpacing: '-0.025em' }}>
              Estadísticas del Sistema
            </Typography>
          </Box>
          <Button
            onClick={handleVolver}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderColor: '#cbd5e1',
              color: '#475569',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              px: 2,
              '&:hover': {
                borderColor: '#1e40af',
                color: '#1e40af',
                backgroundColor: '#f1f5f9'
              }
            }}
          >
            Volver
          </Button>
        </Box>

        <Box sx={{
          backgroundColor: '#ffffff',
          p: { xs: 2, md: 4 },
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.02)'
        }}>
          <GraficoIncidentes />
        </Box>
      </Container>
    </SimpleSidebar>
  )
}

export default Estadisticas