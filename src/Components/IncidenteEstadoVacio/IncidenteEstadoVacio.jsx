import React from 'react'
import { Link } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const IncidenteEstadoVacio = () => {
    return (
        <Paper
            sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: '16px',
                border: '1px dashed #cbd5e1',
                boxShadow: 'none',
                backgroundColor: '#f8fafc'
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#475569', mb: 1 }}>
                No has registrado incidentes aún
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: '400px', mx: 'auto' }}>
                Tu campus limpio y seguro empieza por ti. Si ves un daño en infraestructura, luminarias o equipos, repórtalo ahora.
            </Typography>
            <Button
                component={Link}
                to="/registrarincidente"
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                    backgroundColor: '#0d233a',
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5,
                    px: 3,
                    boxShadow: '0 4px 6px -1px rgba(13, 35, 58, 0.2)',
                    '&:hover': {
                        backgroundColor: '#1e40af',
                        boxShadow: '0 6px 12px -2px rgba(30, 64, 175, 0.2)'
                    }
                }}
            >
                Reportar Ahora
            </Button>
        </Paper>
    )
}

export default IncidenteEstadoVacio