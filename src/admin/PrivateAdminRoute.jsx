import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const PrivateAdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  const isAdmin = user?.email === "admin@example.com"; 

  if (!user || !isAdmin) return <Navigate to="/login" />;

  return children;
};

export default PrivateAdminRoute;
