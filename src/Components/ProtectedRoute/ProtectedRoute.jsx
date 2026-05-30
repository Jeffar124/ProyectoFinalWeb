import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import SimpleSidebar from '../Sidebar/Sidebar';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <SimpleSidebar />;
    }

    if (!user || !allowedRoles.includes(user.rol)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;