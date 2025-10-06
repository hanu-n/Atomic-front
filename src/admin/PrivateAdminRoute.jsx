import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const PrivateAdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const token = await user.getIdToken();
        const res = await fetch('/api/admin/check', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setIsAdmin(data.isAdmin);
      }
    };
    checkAdmin();
  }, [user]);

  if (loading || isAdmin === null) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" />;
  if (!isAdmin) return (
    <div className="container text-center py-5">
      <div className="alert alert-danger">
        <h4>🚫 Access Denied</h4>
        <p>You don't have admin privileges to access this page.</p>
      </div>
    </div>
  );

  return children;
};

export default PrivateAdminRoute;
