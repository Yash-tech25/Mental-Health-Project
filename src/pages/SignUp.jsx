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


const SignUp = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    login,
  } = useAuth();


  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
  // REGISTER
  // =========================================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      if (loading) {
        return;
      }


      if (
        formData.password !==
        formData.confirmPassword
      ) {

        setError(
          "Passwords do not match"
        );

        return;

      }


      if (
        formData.password.length < 8
      ) {

        setError(
          "Password must contain at least 8 characters"
        );

        return;

      }


      setLoading(true);

      setError("");


      try {

        // -----------------------------------------
        // REGISTER
        // -----------------------------------------

        await axios.post(
          `${API_BASE_URL}/api/auth/register`,
          {
            name:
              formData.name,

            email:
              formData.email,

            password:
              formData.password,
          }
        );


        // -----------------------------------------
        // LOGIN IMMEDIATELY AFTER REGISTER
        // -----------------------------------------

        const loginResponse =
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
          loginResponse.data.token,
          loginResponse.data.user
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
          "Registration failed:",
          error
        );


        setError(
          error.response?.data?.message ||
          "Unable to create your account. Please try again."
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
            🌱
          </div>

          <span className="auth-eyebrow">
            JOIN MANORA
          </span>

          <h1>
            Create your account
          </h1>

          <p>
            Your moods, journal entries,
            and wellness check-ins stay
            connected to your account.
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


          {/* NAME */}

          <div className="auth-form-group">

            <label
              htmlFor="signup-name"
            >
              Name
            </label>

            <input
              type="text"
              id="signup-name"
              name="name"
              placeholder="Your name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              autoComplete="name"
              required
            />

          </div>


          {/* EMAIL */}

          <div className="auth-form-group">

            <label
              htmlFor="signup-email"
            >
              Email
            </label>

            <input
              type="email"
              id="signup-email"
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
              htmlFor="signup-password"
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
                id="signup-password"
                name="password"
                placeholder="At least 8 characters"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                autoComplete="new-password"
                minLength="8"
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


          {/* CONFIRM PASSWORD */}

          <div className="auth-form-group">

            <label
              htmlFor="signup-confirm-password"
            >
              Confirm Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              id="signup-confirm-password"
              name="confirmPassword"
              placeholder="Enter your password again"
              value={
                formData.confirmPassword
              }
              onChange={
                handleChange
              }
              autoComplete="new-password"
              required
            />

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
              ? "Creating account..."
              : "Create Account"}

            {!loading && (
              <span>
                →
              </span>
            )}

          </button>

        </form>


        {/* ===================================================
            LOGIN LINK
        =================================================== */}

        <div className="auth-switch">

          <span>
            Already have an account?
          </span>

          <Link
            to="/login"
            state={{
              from:
                destination,
            }}
          >
            Sign in
          </Link>

        </div>

      </div>

    </div>

  );

};


export default SignUp;