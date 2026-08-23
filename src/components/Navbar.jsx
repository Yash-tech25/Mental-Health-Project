import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import MenuItems from "./MenuItems";

import getMenuItems from "../menuItems";

import {
  useAuth,
} from "./AuthContext";

import "../App.css";


const Navbar = () => {

  const menuItems =
    getMenuItems();


  const navigate =
    useNavigate();


  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();


  // =========================================================
  // ACCOUNT DROPDOWN STATE
  // =========================================================

  const [
    showAccountMenu,
    setShowAccountMenu
  ] = useState(false);


  // =========================================================
  // DROPDOWN REF
  // =========================================================

  const accountMenuRef =
    useRef(null);


  // =========================================================
  // FIRST NAME
  // =========================================================

  const firstName =
    user?.name
      ? user.name.split(" ")[0]
      : "";


  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogOutClick = () => {

    setShowAccountMenu(false);

    logout();

    navigate("/");

  };


  // =========================================================
  // TOGGLE ACCOUNT MENU
  // =========================================================

  const toggleAccountMenu = () => {

    setShowAccountMenu(
      (previous) =>
        !previous
    );

  };


  // =========================================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {

    const handleOutsideClick =
      (event) => {

        if (
          accountMenuRef.current &&
          !accountMenuRef.current.contains(
            event.target
          )
        ) {

          setShowAccountMenu(
            false
          );

        }

      };


    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

    };

  }, []);


  // =========================================================
  // CLOSE DROPDOWN WITH ESCAPE KEY
  // =========================================================

  useEffect(() => {

    const handleKeyDown =
      (event) => {

        if (
          event.key === "Escape"
        ) {

          setShowAccountMenu(
            false
          );

        }

      };


    document.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, []);


  // =========================================================
  // JSX
  // =========================================================

  return (

    <nav>


      {/* =====================================================
          MAIN MENU
      ===================================================== */}

      <ul className="menus">

        {menuItems.map(
          (menu, index) => {

            const depthLevel = 0;


            return (

              <MenuItems
                items={
                  menu
                }
                key={
                  index
                }
                depthLevel={
                  depthLevel
                }
              />

            );

          }
        )}

      </ul>


      {/* =====================================================
          AUTH SECTION
      ===================================================== */}

      <div className="menu-items navbar-auth-section">


        {/* ===================================================
            LOGGED OUT
        =================================================== */}

        {!isAuthenticated ? (

          <div className="navbar-guest-links">

            <Link
              to="/login"
              className="navbar-login-link"
            >
              Login
            </Link>


            <Link
              to="/sign-up"
              className="navbar-signup-link"
            >
              Sign Up
            </Link>

          </div>

        ) : (

          /* =================================================
              LOGGED IN
          ================================================= */

          <div
            className="auth-links"
            ref={
              accountMenuRef
            }
          >


            {/* ===============================================
                USER BUTTON
            =============================================== */}

            <button
              type="button"
              className="navbar-user"
              onClick={
                toggleAccountMenu
              }
              aria-expanded={
                showAccountMenu
              }
              aria-haspopup="true"
            >


              {/* AVATAR */}

              <span className="navbar-user-avatar">

                {firstName
                  ? firstName
                      .charAt(0)
                      .toUpperCase()
                  : "U"}

              </span>


              {/* NAME */}

              <span className="navbar-user-name">

                {firstName ||
                  "User"}

              </span>


              {/* ARROW */}

              <span
                className={
                  `navbar-user-arrow ${
                    showAccountMenu
                      ? "open"
                      : ""
                  }`
                }
              >
                ▼
              </span>

            </button>


            {/* ===============================================
                ACCOUNT DROPDOWN
            =============================================== */}

            {showAccountMenu && (

              <div className="navbar-account-dropdown">


                {/* ===========================================
                    ACCOUNT INFO
                =========================================== */}

                <div className="navbar-account-info">

                  <strong>

                    {user?.name ||
                      "Manora User"}

                  </strong>


                  <span>

                    {user?.email ||
                      ""}

                  </span>

                </div>


                {/* ===========================================
                    LOGOUT
                =========================================== */}

                <button
                  type="button"
                  className="LogOut-Button"
                  onClick={
                    handleLogOutClick
                  }
                >

                  <span>
                    Logout
                  </span>

                  <span>
                    →
                  </span>

                </button>

              </div>

            )}

          </div>

        )}

      </div>

    </nav>

  );

};


export default Navbar;