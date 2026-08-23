import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "./AuthContext";


const ProtectedRoute = ({
  children,
}) => {

  const {
    isAuthenticated,
    loading,
  } = useAuth();


  const location =
    useLocation();



  // =========================================================
  // AUTH CHECK STILL RUNNING
  // =========================================================

  if (loading) {

    return (

      <div className="auth-loading-page">

        <div className="auth-loading-spinner">
        </div>

        <p>
          Checking your session...
        </p>

      </div>

    );

  }



  // =========================================================
  // USER NOT LOGGED IN
  // =========================================================

  if (!isAuthenticated) {

    return (

      <Navigate

        to="/login"

        replace

        state={{
          from:
            location.pathname,
        }}

      />

    );

  }



  // =========================================================
  // USER LOGGED IN
  // =========================================================

  return children;

};


export default ProtectedRoute;