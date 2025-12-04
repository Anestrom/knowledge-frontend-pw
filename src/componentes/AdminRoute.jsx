import { Navigate } from 'react-router-dom';
import { isAdmin } from '../servicos/AuthServico';

function AdminRoute({ children }) {
    return isAdmin() ? children : <Navigate to="/" />;
}

export default AdminRoute;
