import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

const IncidenteCard = ({ incidente, renderEstadoBadge, formatFecha }) => {
    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px -8px rgba(13, 35, 58, 0.15)'
            }
        }}>
            {incidente.imagen && (
                <CardMedia
                    component="img"
                    height="180"
                    image={incidente.imagen}
                    alt={incidente.tipoIncidencia}
                    sx={{ objectFit: 'cover' }}
                />
            )}
            <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        {incidente.tipoIncidencia}
                    </Typography>
                    {renderEstadoBadge(incidente.estado)}
                </Box>

                <Typography variant="body2" color="text.primary" sx={{ mb: 2.5, flexGrow: 1, lineHeight: 1.6 }}>
                    {incidente.descripcion || 'Sin descripción adicional.'}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#64748b', fontSize: 16 }} />
                        <Typography variant="caption" color="text.secondary" noWrap>
                            {incidente.ubicacion}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon sx={{ color: '#64748b', fontSize: 16 }} />
                        <Typography variant="caption" color="text.secondary">
                            {formatFecha(incidente.fechaCreacion)}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default IncidenteCard