import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loadin() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress aria-label="Loading…" />
        </Box>
    );
}
