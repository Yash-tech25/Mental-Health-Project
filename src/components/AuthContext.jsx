import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  API_BASE_URL,
} from "./api";


const AuthContext =
  createContext(null);


export const AuthProvider = ({
  children,
}) => {

  // =========================================================
  // AUTH STATES
  // =========================================================

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // =========================================================
  // CHECK EXISTING LOGIN
  //
  // sessionStorage is used instead of localStorage.
  //
  // This means:
  // - refresh in the same tab → remains logged in
  // - separate tabs can use separate accounts
  // - closing the tab ends that tab's stored session
  // =========================================================

  useEffect(() => {

    const checkAuthentication =
      async () => {

        const token =
          sessionStorage.getItem(
            "manoraToken"
          );


        // -----------------------------------------
        // NO TOKEN
        // -----------------------------------------

        if (!token) {

          setUser(null);

          setLoading(false);

          return;

        }


        try {

          // -----------------------------------------
          // VERIFY TOKEN WITH BACKEND
          // -----------------------------------------

          const response =
            await axios.get(
  `${API_BASE_URL}/api/auth/me`,
              {
                headers: {

                  Authorization:
                    `Bearer ${token}`,

                },
              }
            );


          // -----------------------------------------
          // RESTORE USER
          // -----------------------------------------

          setUser(
            response.data.user
          );


          // Keep the stored user information
          // synchronized with the backend response.

          sessionStorage.setItem(
            "manoraUser",
            JSON.stringify(
              response.data.user
            )
          );

        } catch (error) {

          console.error(
            "Authentication check failed:",
            error
          );


          // -----------------------------------------
          // INVALID / EXPIRED SESSION
          // -----------------------------------------

          sessionStorage.removeItem(
            "manoraToken"
          );

          sessionStorage.removeItem(
            "manoraUser"
          );


          setUser(null);

        } finally {

          setLoading(false);

        }

      };


    checkAuthentication();

  }, []);


  // =========================================================
  // LOGIN
  // =========================================================

  const login = (
    token,
    loggedInUser
  ) => {

    // -----------------------------------------
    // SAVE TOKEN FOR THIS TAB
    // -----------------------------------------

    sessionStorage.setItem(
      "manoraToken",
      token
    );


    // -----------------------------------------
    // SAVE USER FOR THIS TAB
    // -----------------------------------------

    sessionStorage.setItem(
      "manoraUser",
      JSON.stringify(
        loggedInUser
      )
    );


    // -----------------------------------------
    // UPDATE REACT STATE
    // -----------------------------------------

    setUser(
      loggedInUser
    );

  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {

    // Only clear Manora authentication data
    // from this browser tab.

    sessionStorage.removeItem(
      "manoraToken"
    );

    sessionStorage.removeItem(
      "manoraUser"
    );


    setUser(null);

  };


  // =========================================================
  // CONTEXT VALUE
  // =========================================================

  const value = {

    user,

    isAuthenticated:
      Boolean(user),

    loading,

    login,

    logout,

  };


  // =========================================================
  // PROVIDER
  // =========================================================

  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>

  );

};


// =========================================================
// AUTH HOOK
// =========================================================

export const useAuth = () => {

  return useContext(
    AuthContext
  );

};


export default AuthContext;