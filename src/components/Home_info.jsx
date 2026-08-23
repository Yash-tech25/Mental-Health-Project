import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import image1 from "../images/homeimg1.png";
import image2 from "../images/homeimg2.png";
import image3 from "../images/home3-min.jpeg";


const contentData = [
  {
    imageSrc: image1,

    title: "A Space Built Around You",

    text:
      "Learn more about Manora and why we created a simple space for reflection, emotional awareness, relaxation, and everyday mental well-being.",

    link: "/about",

    linkText: "About Manora",
  },

  {
    imageSrc: image2,

    title: "Understand Yourself Better",

    text:
      "Explore self-reflection quizzes designed to help you notice emotional and behavioral patterns and become more aware of how you have been feeling.",

    link: "/quiz",

    linkText: "Explore Quizzes",
  },

  {
    imageSrc: image3,

    title: "Learn About Mental Health",

    text:
      "Explore clear and accessible information about mental health conditions, their symptoms, possible treatments, and ways to seek appropriate support.",

    link: "/articles",

    linkText: "Read Articles",
  },
];


// =========================================================
// SCROLL ANIMATION WRAPPER
// =========================================================

function TextWrapper({ children }) {

  const elementRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: elementRef,

    offset: [
      "start 90%",
      "end 20%",
    ],
  });


  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    [0.3, 1, 1]
  );


  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [35, 0, 0]
  );


  return (

    <motion.div
      ref={elementRef}
      className="text-section"
      style={{
        opacity,
        y,
      }}
    >

      {children}

    </motion.div>
  );
}


// =========================================================
// HOME INFORMATION
// =========================================================

function Home_info() {

  return (

    <section className="home-info-section">


      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="home-info-heading">

        <span className="home-info-eyebrow">
          🌿 Explore Manora
        </span>

        <h2>
          Your well-being, one step at a time
        </h2>

        <p>
          Whether you want to understand how you're feeling,
          learn something new, or simply slow down for a moment,
          Manora gives you a place to begin.
        </p>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="container-home">

        {contentData.map(
          (content, index) => (

            <article
              className={`image-container-home ${
                index % 2 !== 0
                  ? "home-info-reverse"
                  : ""
              }`}
              key={content.title}
            >


              {/* IMAGE */}

              <div className="home-info-image-side">

                <TextWrapper>

                  <img
                    src={content.imageSrc}
                    alt={content.title}
                    className="image-home"
                    loading="lazy"
                  />

                </TextWrapper>

              </div>


              {/* CONTENT */}

              <div className="text-container-home">

                <TextWrapper>

                  <div className="text-box-home">

                    


                    <h3>
                      {content.title}
                    </h3>


                    <p>
                      {content.text}
                    </p>


                    <Link
                      to={content.link}
                      className="home-info-link"
                    >

                      {content.linkText}

                      <span>
                        →
                      </span>

                    </Link>

                  </div>

                </TextWrapper>

              </div>

            </article>

          )
        )}

      </div>

    </section>
  );
}

export default Home_info;