import { Chip } from '@mui/material';

export const renderEstadoBadge = (estado) => {
    // Aseguramos comparar correctamente ignorando minúsculas/mayúsculas si es necesario
    const estadoNormalizado = estado?.trim();

    let colorConfig = {
        bg: '#fef3c7',
        text: '#b45309',
        label: 'Reportado'
    };

    if (estadoNormalizado === 'En Proceso' || estadoNormalizado === 'En proceso') {
        colorConfig = {
            bg: '#dbeafe',
            text: '#1d4ed8',
            label: 'En Proceso'
        };
    } else if (estadoNormalizado === 'Resuelto') {
        colorConfig = {
            bg: '#d1fae5',
            text: '#047857',
            label: 'Resuelto'
        };
    }

    return (
        <Chip
            label={colorConfig.label}
            sx={{
                backgroundColor: colorConfig.bg,
                color: colorConfig.text,
                fontWeight: 700,
                borderRadius: '8px',
                fontSize: '0.75rem',
                height: '24px'
            }}
        />
    );
};

export const formatFecha = (timestamp) => {
    if (!timestamp) return 'Reciente';
    // Soporta tanto timestamps de Firebase (.seconds) como objetos Date nativos
    const seconds = timestamp.seconds ?? (timestamp._seconds ?? null);
    if (!seconds) return 'Reciente';

    const date = new Date(seconds * 1000);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};