import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import axios from "axios";

import Home_info from "../components/Home_info";
import InvisibleBackpack from "../components/InvisibleBackpack";

import img1 from "../images/manora.png";


const Home = () => {

  // =========================================================
  // JOKE STATE
  // =========================================================

  const [
    joke,
    setJoke
  ] = useState("");


  const [
    loadingJoke,
    setLoadingJoke
  ] = useState(false);


  // =========================================================
  // ACTIVE JOKE REQUEST
  // =========================================================

  const jokeRequestRef =
    useRef(null);


  // =========================================================
  // FETCH RANDOM JOKE
  // =========================================================

  const fetchJoke =
    useCallback(
      async () => {

        /*
          Cancel a previous unfinished request
          before starting a new one.
        */

        if (
          jokeRequestRef.current
        ) {

          jokeRequestRef.current.abort();

        }


        const controller =
          new AbortController();


        jokeRequestRef.current =
          controller;


        setLoadingJoke(
          true
        );


        try {

          const response =
            await axios.get(
              "https://official-joke-api.appspot.com/random_joke",
              {
                signal:
                  controller.signal
              }
            );


          const setup =
            response.data?.setup;


          const punchline =
            response.data?.punchline;


          if (
            setup &&
            punchline
          ) {

            setJoke(
              `${setup} ${punchline}`
            );

          } else {

            throw new Error(
              "Invalid joke response"
            );

          }

        } catch (error) {

          /*
            Axios uses ERR_CANCELED when
            AbortController cancels a request.
          */

          if (
            error.code ===
            "ERR_CANCELED"
          ) {

            return;

          }


          console.error(
            "Error fetching joke:",
            error
          );


          setJoke(
            "Why did the computer go to therapy? It had too many bytes from the past."
          );

        } finally {

          if (
            jokeRequestRef.current ===
            controller
          ) {

            jokeRequestRef.current =
              null;


            setLoadingJoke(
              false
            );

          }

        }

      },
      []
    );


  // =========================================================
  // LOAD INITIAL JOKE
  // =========================================================

  useEffect(() => {

    fetchJoke();


    return () => {

      if (
        jokeRequestRef.current
      ) {

        jokeRequestRef.current.abort();

      }

    };

  }, [
    fetchJoke
  ]);


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="home-page">


      {/* =====================================================
          MOVING HELPLINE BANNER
      ===================================================== */}

      <div className="home-helpline">

        <div className="home-helpline-marquee">

          <a
            href="tel:14416"
            className="home-helpline-link"
          >
            ☎️ Tele-MANAS Mental Health Helpline:
            14416
          </a>


          <span className="home-helpline-divider">
            •
          </span>


          <a
            href="tel:18008914416"
            className="home-helpline-link"
          >
            📞 1-800-891-4416
          </a>


          <span className="home-helpline-message">

            — Support is available when you need someone to talk to.

          </span>

        </div>

      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-hero">

        <div className="home-hero-content">


          <span className="home-hero-badge">
            🌿 Welcome to Manora
          </span>


          <h1>

            Understand your mind.

            <br />

            Care for your well-being.

          </h1>


          <p>

            Manora is a space for reflection,
            emotional awareness, relaxation,
            and everyday mental wellness.

          </p>


          <div className="home-hero-actions">

            <Link
              to="/mood-tracker"
              className="home-primary-button"
            >

              Check In With Yourself

              <span>
                →
              </span>

            </Link>


            <Link
              to="/relax"
              className="home-secondary-button"
            >
              Take a Moment to Relax
            </Link>

          </div>

        </div>


        <div className="home-hero-image">

          <img
            src={
              img1
            }
            alt="Manora mental wellness"
          />

        </div>

      </section>


      {/* =====================================================
          PLAYFUL RANDOM JOKE
      ===================================================== */}

      <section className="home-joke-section">

        <div className="home-joke-icon">
          😄
        </div>


        <div className="home-joke-content">

          <span className="home-joke-label">
            A little smile break
          </span>


          <h2>

            {joke ||
              "Finding something to make you smile..."}

          </h2>


          <p>

            Sometimes a small laugh is all you need
            to make the moment feel a little lighter.

          </p>


          <button
            type="button"
            className="home-joke-button"
            onClick={
              fetchJoke
            }
            disabled={
              loadingJoke
            }
          >

            {loadingJoke
              ? "Finding another..."
              : "Tell me another"
            }


            {!loadingJoke && (

              <span>
                ↻
              </span>

            )}

          </button>

        </div>

      </section>


      {/* =====================================================
          QUICK ACCESS
      ===================================================== */}

      <section className="home-quick-section">

        <div className="home-section-heading">

          <span>
            ✨ Start where you are
          </span>


          <h2>
            What do you need today?
          </h2>


          <p>

            Choose a simple way to check in,
            reflect, or take a moment for yourself.

          </p>

        </div>


        <div className="home-quick-grid">


          {/* MOOD TRACKER */}

          <Link
            to="/mood-tracker"
            className="home-quick-card"
          >

            <div className="home-quick-icon">
              😊
            </div>


            <h3>
              Mood Tracker
            </h3>


            <p>

              Record how you're feeling and notice
              emotional patterns over time.

            </p>

          </Link>


          {/* JOURNAL */}

          <Link
            to="/daily-journal"
            className="home-quick-card"
          >

            <div className="home-quick-icon">
              📖
            </div>


            <h3>
              Journal
            </h3>


            <p>

              Put your thoughts into words and reflect
              on what you're feeling.

            </p>

          </Link>


          {/* WELLNESS TRACKER */}

          <Link
            to="/wellness-tracker"
            className="home-quick-card"
          >

            <div className="home-quick-icon">
              📊
            </div>


            <h3>
              Wellness Tracker
            </h3>


            <p>

              Check in with your sleep, habits,
              energy, and everyday well-being.

            </p>

          </Link>


          {/* RELAX */}

          <Link
            to="/relax"
            className="home-quick-card"
          >

            <div className="home-quick-icon">
              🌿
            </div>


            <h3>
              Relax
            </h3>


            <p>

              Try breathing, grounding, meditation,
              ambient sounds, and stress relief.

            </p>

          </Link>

        </div>

      </section>


      {/* =====================================================
          HOME INFO
      ===================================================== */}

      <Home_info />


      {/* =====================================================
          INVISIBLE BACKPACK
      ===================================================== */}

      <InvisibleBackpack />

    </div>

  );

};


export default Home;