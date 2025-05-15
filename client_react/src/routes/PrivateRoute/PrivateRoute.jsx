import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');
    const location = useLocation();

    if (isAuthenticated && location.pathname === '/') {
        return <Navigate to="/alunos" />;
    }

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;