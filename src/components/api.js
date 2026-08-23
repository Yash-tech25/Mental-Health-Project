import axios from "axios";


// =========================================================
// BACKEND BASE URL
// =========================================================

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


// =========================================================
// API INSTANCE
// =========================================================

const api =
  axios.create({

    baseURL:
      API_BASE_URL,

  });


// =========================================================
// ADD JWT TO AUTHENTICATED REQUESTS
// =========================================================

api.interceptors.request.use(

  (config) => {

    const token =
      sessionStorage.getItem(
        "manoraToken"
      );


    if (
      token
    ) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },


  (error) => {

    return Promise.reject(
      error
    );

  }

);


// =========================================================
// HANDLE EXPIRED / INVALID TOKEN
// =========================================================

api.interceptors.response.use(

  (response) => {

    return response;

  },


  (error) => {

    if (
      error.response?.status ===
      401
    ) {

      // -----------------------------------------
      // CLEAR THIS TAB'S SESSION
      // -----------------------------------------

      sessionStorage.removeItem(
        "manoraToken"
      );

      sessionStorage.removeItem(
        "manoraUser"
      );


      // -----------------------------------------
      // REDIRECT TO LOGIN
      // -----------------------------------------

      if (
        window.location.pathname !==
        "/login"
      ) {

        window.location.href =
          "/login";

      }

    }


    return Promise.reject(
      error
    );

  }

);


export default api;