import {
  useEffect,
  useState
} from "react";

import api from "../components/api";


// =========================================================
// CARD BACKGROUND COLORS
// =========================================================

const backgroundColors = [
  "#fcf4dd",
  "#ddedea",
  "#e8dff5",
  "#fce1e4",
  "#daeaf6",
];


function Blogs() {

  // =========================================================
  // STATES
  // =========================================================

  const [
    blogs,
    setBlogs
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  // =========================================================
  // FETCH BLOGS
  // =========================================================

  useEffect(() => {

    const controller =
      new AbortController();


    const fetchBlogs =
      async () => {

        try {

          setLoading(
            true
          );


          setError(
            ""
          );


          /*
            api.js automatically:

            1. Reads the authentication token.
            2. Adds the Authorization header.
            3. Handles expired or invalid tokens.
            4. Clears the current session.
            5. Redirects to /login on 401.
          */

          const response =
            await api.get(
              "/api/blogs",
              {
                signal:
                  controller.signal
              }
            );


          const data =
            response.data;


          setBlogs(
            Array.isArray(
              data
            )
              ? data
              : []
          );

        } catch (err) {

          /*
            Ignore requests that were intentionally
            cancelled because the page unmounted.
          */

          if (
            err.code ===
            "ERR_CANCELED"
          ) {

            return;

          }


          console.error(
            "Blog fetch error:",
            err
          );


          console.error(
            "Backend response:",
            err.response?.data
          );


          /*
            401 is already handled centrally
            by api.js.
          */

          if (
            err.response?.status ===
            401
          ) {

            return;

          }


          setError(
            err.response
              ?.data
              ?.message ||
            "Unable to load today's mental health articles."
          );

        } finally {

          if (
            !controller.signal.aborted
          ) {

            setLoading(
              false
            );

          }

        }

      };


    fetchBlogs();


    return () => {

      controller.abort();

    };

  }, []);


  // =========================================================
  // LOADING
  // =========================================================

  if (
    loading
  ) {

    return (

      <div className="blogsPage">

        <div className="blogs-status">

          <div className="blogs-loading-icon">
            🌿
          </div>


          <h2>
            Finding today's reads...
          </h2>


          <p>
            Gathering a few thoughtful mental-health
            articles for you.
          </p>

        </div>

      </div>

    );

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (
    error
  ) {

    return (

      <div className="blogsPage">

        <div className="blogs-status">

          <div className="blogs-loading-icon">
            🌱
          </div>


          <h2>
            Couldn't load today's articles
          </h2>


          <p>
            {error}
          </p>

        </div>

      </div>

    );

  }


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="blogsPage">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="blogs-header">

        <div className="blogs-header-icon">
          📖
        </div>


        <h1>
          Today's Mental Health Reads
        </h1>


        <p>
          Five fresh articles to help you learn,
          reflect, and take better care of your mind.
        </p>

      </div>


      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {blogs.length === 0 && (

        <div className="blogs-status">

          <div className="blogs-loading-icon">
            🌱
          </div>


          <h2>
            No articles available right now
          </h2>


          <p>
            Please check back again later.
          </p>

        </div>

      )}


      {/* =====================================================
          BLOG CARDS
      ===================================================== */}

      <div className="blogs-list">

        {blogs.map(
          (
            blog,
            index
          ) => {

            const backgroundColor =
              backgroundColors[
                index %
                backgroundColors.length
              ];


            return (

              <article
                className="daily-blog-card"
                key={
                  blog.url ||
                  blog.title
                }
                style={{
                  backgroundColor
                }}
              >


                {/* ===========================================
                    IMAGE
                =========================================== */}

                {blog.image && (

                  <div className="daily-blog-image">

                    <img
                      src={
                        blog.image
                      }
                      alt={
                        blog.title ||
                        "Mental health article"
                      }
                      loading="lazy"
                    />

                  </div>

                )}


                {/* ===========================================
                    CONTENT
                =========================================== */}

                <div className="daily-blog-content">


                  {/* =========================================
                      META
                  ========================================= */}

                  <div className="daily-blog-meta">

                    <span>

                      {blog.source ||
                        "Mental Health"}

                    </span>


                    {blog.publishedAt && (

                      <span>

                        {new Date(
                          blog.publishedAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day:
                              "numeric",

                            month:
                              "short",

                            year:
                              "numeric"
                          }
                        )}

                      </span>

                    )}

                  </div>


                  {/* =========================================
                      TITLE
                  ========================================= */}

                  <h2>
                    {blog.title}
                  </h2>


                  {/* =========================================
                      DESCRIPTION
                  ========================================= */}

                  {blog.description && (

                    <p>
                      {blog.description}
                    </p>

                  )}


                  {/* =========================================
                      ARTICLE LINK
                  ========================================= */}

                  <a
                    href={
                      blog.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="daily-blog-link"
                  >
                    Read Full Article →
                  </a>

                </div>

              </article>

            );

          }
        )}

      </div>

    </div>

  );

}


export default Blogs;