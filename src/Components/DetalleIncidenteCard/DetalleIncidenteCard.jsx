import React, { useState } from 'react';
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
    DialogContent
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    ReportProblemOutlined,
    LocationOnOutlined,
    CalendarMonthOutlined,
    PersonOutlineOutlined,
    CategoryOutlined,
    MapOutlined
} from '@mui/icons-material';


// Configuración de colores para los estados
const STATUS_CONFIG = {
    'Reportado': { color: 'error', variant: 'filled' },
    'En proceso': { color: 'warning', variant: 'filled' },
    'Resuelto': { color: 'success', variant: 'filled' }
};

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

    const handleOpenModal = () => {
        setOpenImageModal(true);

    }
    const handleCloseModal = () => setOpenImageModal(false);


    return (
        <Card elevation={3} sx={{ maxWidth: 600, borderRadius: 3, overflow: 'hidden', mx: 'auto', my: 2 }}>
            <CardHeader
                title={
                    <Typography variant="h5" color="primary.main">
                        Incidencia #{id}
                    </Typography>
                }
                action={renderEstadoBadge(estado)}
            />

            {imagen && (
                <>
                    <CardActionArea onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal();
                    }}
                        sx={{ '&:hover .MuiCardActionArea-focusHighlight': { opacity: 0.05 } }}>
                        <CardMedia component="img" height="240" image={imagen} alt="Evidencia"
                            sx={{
                                objectFit: 'cover',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': { transform: 'scale(1.02)' }
                            }} />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                bgcolor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: '0.7rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Click para ampliar

                        </Box>
                    </CardActionArea>
                    <Dialog
                        open={openImageModal}
                        onClose={(e) => {
                            if (e) e.stopPropagation();
                            handleCloseModal();
                        }}
                        maxWidth="lg"
                        fullWidth
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogContent sx={{ p: 0 }}>
                            <img
                                src={imagen}
                                alt="Evidencia ampliada"
                                style={{
                                    width: '100%',
                                    display: 'block'
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </>

            )}

            <CardContent sx={{ pt: imagen ? 2 : 0 }}>
                <Stack spacing={2.5}>

                    {/* Categoría */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {tipoIncidencia}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}>
                            Descripción del incidente
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            {descripcion}
                        </Typography>
                    </Box>

                    <Divider />

                    <Grid container spacing={2}>

                        <Grid container spacing={2.5}>
                            {/* Fila 1: Ubicación en texto */}
                            <Grid size={12}>
                                <Box display="flex" alignItems="flex-start" gap={1.5}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600, letterSpacing: 0.5 }}>
                                            UBICACIÓN REPORTADA
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.2 }}>
                                            {ubicacion}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Fila 2: Coordenadas */}
                            {coords && (
                                <Grid size={12} sx={{ mt: -1 }}> {/* Un margen negativo ligero para que queden agrupadas visualmente */}
                                    <Box display="flex" alignItems="flex-start" gap={1.5}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600, letterSpacing: 0.5 }}>
                                                COORDENADAS DE MAPA
                                            </Typography>
                                            <Typography variant="body2" sx={{ py: 0.2, display: 'inline-block', mt: 0.2 }}>
                                                Lat: {coords.latitude} • Lon: {coords.longitude}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>

                        <Grid size={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                        Reportado el
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        {formatFecha(fechaCreacion)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid size={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                        Usuario ID
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        {usuarioId}
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