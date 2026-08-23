import {
  useState,
} from "react";

import axios from "axios";

import {
  API_BASE_URL,
} from "../components/api";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../components/AuthContext";


const Login = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    login,
  } = useAuth();


  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // =========================================================
  // ORIGINAL DESTINATION
  // =========================================================

  const destination =
    location.state?.from ||
    "/";


  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previousData) => ({
        ...previousData,
        [name]:
          value,
      })
    );


    if (error) {
      setError("");
    }

  };


  // =========================================================
  // LOGIN
  // =========================================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      if (loading) {
        return;
      }


      setLoading(true);

      setError("");


      try {

        const response =
          await axios.post(
            `${API_BASE_URL}/api/auth/login`,
            {
              email:
                formData.email,

              password:
                formData.password,
            }
          );


        login(
          response.data.token,
          response.data.user
        );


        // Return the user to the page
        // they originally wanted to visit.

        navigate(
          destination,
          {
            replace: true,
          }
        );

      } catch (error) {

        console.error(
          "Login failed:",
          error
        );


        setError(
          error.response?.data?.message ||
          "Unable to login. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="auth-page">

      <div className="auth-card">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="auth-header">

          <div className="auth-icon">
            🌿
          </div>

          <span className="auth-eyebrow">
            WELCOME BACK
          </span>

          <h1>
            Sign in to Manora
          </h1>

          <p>
            Continue your personal
            wellness journey.
          </p>

        </div>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (

          <div className="auth-error">

            <span>
              !
            </span>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* ===================================================
            FORM
        =================================================== */}

        <form
          className="auth-form"
          onSubmit={
            handleSubmit
          }
        >


          {/* EMAIL */}

          <div className="auth-form-group">

            <label
              htmlFor="login-email"
            >
              Email
            </label>

            <input
              type="email"
              id="login-email"
              name="email"
              placeholder="you@example.com"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              autoComplete="email"
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="auth-form-group">

            <label
              htmlFor="login-password"
            >
              Password
            </label>

            <div className="auth-password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                id="login-password"
                name="password"
                placeholder="Enter your password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="auth-submit-button"
            disabled={
              loading
            }
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

            {!loading && (
              <span>
                →
              </span>
            )}

          </button>

        </form>


        {/* ===================================================
            REGISTER LINK
        =================================================== */}

        <div className="auth-switch">

          <span>
            Don't have an account?
          </span>

          <Link
            to="/sign-up"
            state={{
              from:
                destination,
            }}
          >
            Create one
          </Link>

        </div>

      </div>

    </div>

  );

};


export default Login;