import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Two different failure states get two different redirects, on purpose:
 *  - not logged in at all -> /login (they might be an admin who just needs to sign in)
 *  - logged in but not admin -> /home (a real customer account, don't imply they should log in again)
 */
export function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
