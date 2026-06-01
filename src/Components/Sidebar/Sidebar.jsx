import * as React from 'react';
import {
    AppBar, Box, CssBaseline, Divider, Drawer, IconButton,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Toolbar, Typography, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../../Context/AuthProvider';

const drawerWidth = 260;

export default function SimpleSidebar({ children }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sesión cerrada correctamente");
            navigate('/');
        }).catch((error) => {
            console.error("Error al cerrar sesión: ", error);
        });
    };

    // Configurar menú dinámico según el rol
    const menuItems = [];
    if (user) {
        if (user.rol === 'Usuario') {
            menuItems.push(
                { text: 'Inicio', path: '/panelusuario', icon: <DashboardIcon /> },
                { text: 'Registrar Incidente', path: '/registrarincidente', icon: <AddCircleOutlineIcon /> },
                { text: 'Mis Reportes', path: '/incidentesusuario', icon: <HistoryIcon /> },
                { text: 'Estadísticas', path: '/estadisticas', icon: <BarChartIcon /> },
            );
        } else if (user.rol === 'Administrador') {
            menuItems.push(
                { text: 'Panel Admin', path: '/paneladmin', icon: <DashboardIcon /> },
                { text: 'Estadísticas', path: '/estadisticas', icon: <BarChartIcon /> },
            );
        }
    }

    // CONTENIDO DE LA SIDEBAR
    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
            {/* Header del Drawer / Perfil de Usuario */}
            <Box sx={{
                p: 3,
                background: 'linear-gradient(135deg, #0d233a 0%, #1e3a8a 100%)',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 1
            }}>
                <Avatar sx={{ bgcolor: '#eff6ff', color: '#1e40af', width: 56, height: 56 }}>
                    <AccountCircleIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {user ? user.nombre : "Cargando..."}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#93c5fd', fontWeight: 500 }}>
                        {user ? user.rol : ""}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            {/* Listado de Enlaces */}
            <List sx={{ px: 1, py: 2, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                sx={{
                                    borderRadius: '10px',
                                    backgroundColor: active ? '#eff6ff' : 'transparent',
                                    color: active ? '#1e40af' : '#475569',
                                    fontWeight: active ? 600 : 500,
                                    '&:hover': {
                                        backgroundColor: '#f1f5f9',
                                        color: '#0d233a',
                                        '& .MuiListItemIcon-root': { color: '#0d233a' }
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: active ? '#1e40af' : '#64748b',
                                        minWidth: 40
                                    }
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: '14px',
                                        fontWeight: active ? 600 : 500
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider />

            {/* Botón de Cerrar Sesión al final */}
            <List sx={{ px: 1, py: 2 }}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleSignOut}
                        sx={{
                            borderRadius: '10px',
                            color: '#b91c1c',
                            '&:hover': {
                                backgroundColor: '#fef2f2',
                                color: '#991b1b',
                                '& .MuiListItemIcon-root': { color: '#991b1b' }
                            },
                            '& .MuiListItemIcon-root': {
                                color: '#b91c1c',
                                minWidth: 40
                            }
                        }}
                    >
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Cerrar Sesión"
                            primaryTypographyProps={{ fontSize: '14px', fontWeight: 600 }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <CssBaseline />

            {/* BARRA SUPERIOR (NAVBAR) */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#0d233a',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                            Uniamazonia Reporta
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, color: '#93c5fd', fontWeight: 500 }}>
                        Bienestar Universitario
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* SIDEBAR */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* Vista Móvil (Temporal) */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #e2e8f0' },
                    }}
                >
                    {drawerContent}
                </Drawer>

                {/* Vista Escritorio (Permanente) */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #e2e8f0' },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* CONTENIDO PRINCIPAL DINÁMICO */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 4 },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}