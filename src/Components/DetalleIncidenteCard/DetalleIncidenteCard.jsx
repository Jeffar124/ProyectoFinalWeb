import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Box,
    Divider,
    Stack,
    Dialog,
    IconButton,
    CardActionArea,
    DialogContent,
    Paper
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase/config';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const DetalleIncidenteCard = ({ incidente, renderEstadoBadge, formatFecha }) => {
    const {
        id,
        usuarioId,
        tipoIncidencia,
        descripcion,
        imagen,
        ubicacion,
        coords,
        fechaCreacion,
        estado
    } = incidente;

    const [openImageModal, setOpenImageModal] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState('');

    const handleOpenModal = () => setOpenImageModal(true);
    const handleCloseModal = () => setOpenImageModal(false);

    useEffect(() => {
        const obtenerUsuario = async () => {
            const docRef = doc(db, "usuarios", usuarioId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setNombreUsuario(docSnap.data().nombre);
            }
        }
        if (usuarioId) obtenerUsuario()
    }, [usuarioId])

    return (
        <Card
            elevation={0}
            sx={{
                maxWidth: 680,
                borderRadius: '20px',
                overflow: 'hidden',
                mx: 'auto',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 24px -6px rgba(13, 35, 58, 0.08)',
            }}
        >
            {/* Header con gradiente */}
            <Box
                sx={{
                    background: '#1e3a8a',
                    px: 3,
                    py: 2.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="caption" sx={{ color: '#93c5fd', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Reporte
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                        #{id?.substring(0, 8)}
                    </Typography>
                </Box>
                {renderEstadoBadge(estado)}
            </Box>

            {/* Imagen con overlay de zoom */}
            {imagen && (
                <>
                    <CardActionArea
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal();
                        }}
                        sx={{
                            position: 'relative',
                            '&:hover .zoom-overlay': { opacity: 1 },
                            '&:hover img': { transform: 'scale(1.03)' }
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="260"
                            image={imagen}
                            alt="Evidencia"
                            sx={{
                                objectFit: 'cover',
                                transition: 'transform 0.35s ease-in-out',
                            }}
                        />
                        {/* Overlay de zoom */}
                        <Box
                            className="zoom-overlay"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(13, 35, 58, 0.45)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.25s ease',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: '#ffffff',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '50px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                }}
                            >
                                Ver imagen completa
                            </Box>
                        </Box>
                    </CardActionArea>

                    {/* Modal de imagen ampliada */}
                    <Dialog
                        open={openImageModal}
                        onClose={(e) => {
                            if (e) e.stopPropagation();
                            handleCloseModal();
                        }}
                        maxWidth="lg"
                        fullWidth
                        onClick={(e) => e.stopPropagation()}
                        PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}
                    >
                        <DialogContent sx={{ p: 0 }}>
                            <img
                                src={imagen}
                                alt="Evidencia ampliada"
                                style={{ width: '100%', display: 'block' }}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            )}

            {/* Contenido principal */}
            <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>

                    {/* Tipo de incidencia */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: '#0d233a',
                                mb: 0.5,
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {tipoIncidencia}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                            Categoría del incidente
                        </Typography>
                    </Box>

                    {/* Descripción */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2.5,
                            backgroundColor: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', mb: 1 }}
                        >
                            Descripción del incidente
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#1e293b', lineHeight: 1.7 }}>
                            {descripcion || 'Sin descripción adicional.'}
                        </Typography>
                    </Paper>

                    <Divider sx={{ borderColor: '#f1f5f9' }} />

                    {/* Metadatos en cuadrícula */}
                    <Grid container spacing={2}>

                        {/* Ubicación */}
                        <Grid size={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1.5,
                                    p: 2,
                                    borderRadius: '12px',
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1,
                                        borderRadius: '8px',
                                        backgroundColor: '#eff6ff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                                        Ubicación reportada
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                                        {ubicacion}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Coordenadas */}
                        {coords && (
                            <Grid size={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 1.5,
                                        p: 2,
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: '8px',
                                            backgroundColor: '#f0fdf4',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                                            Coordenadas GPS
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b', fontFamily: 'monospace' }}>
                                            Lat: {coords.latitude?.toFixed(6)} • Lon: {coords.longitude?.toFixed(6)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        )}

                        {/* Fecha */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1.5,
                                    p: 2,
                                    borderRadius: '12px',
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    height: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1,
                                        borderRadius: '8px',
                                        backgroundColor: '#fff7ed',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                                        Fecha de reporte
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                                        {formatFecha(fechaCreacion)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Usuario */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1.5,
                                    p: 2,
                                    borderRadius: '12px',
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    height: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1,
                                        borderRadius: '8px',
                                        backgroundColor: '#fdf4ff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                                        Reportado por
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                                        {nombreUsuario || '—'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default DetalleIncidenteCard