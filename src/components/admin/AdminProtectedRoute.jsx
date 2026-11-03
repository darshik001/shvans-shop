import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminLogin from "./AdminLogin";

const AdminProtectedRoute = () => {
  const { isLogin } = useSelector((state) => state.adminAuth);
  const location = useLocation();

  // Login ન કર્યું હોય
  if (!isLogin) {
    if (location.pathname === "/admin") {
      return <AdminLogin />;
    }

    return <Navigate to="/admin" replace />;
  }

  // Login થઈ ગયું હોય અને /admin ખોલે
  if (location.pathname === "/admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Login થઈ ગયું હોય તો બધા protected admin pages પર જવા દો
  return <Outlet />;
};

export default AdminProtectedRoute;