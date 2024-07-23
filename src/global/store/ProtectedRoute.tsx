import { Navigate } from "react-router-dom";
import { useLoginStore } from "../../auth/store/login.store";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = useLoginStore((state) => state.token);

  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
