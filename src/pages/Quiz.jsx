import { Link } from "react-router-dom";

import quiz1Image from "../images/anxietyquiz.jpg";
import quiz2Image from "../images/depressionquiz.webp";
import quiz3Image from "../images/ocdquiz.webp";
import quiz4Image from "../images/adhdquiz.webp";
import quiz5Image from "../images/ptsdquiz.png";
import quiz6Image from "../images/socialquiz.jpeg";


const quizzes = [
  {
    title: "Anxiety Self-Check",
    tag: "Anxiety",
    image: quiz1Image,
    description:
      "Reflect on common experiences associated with anxiety, worry, tension, and everyday stress.",
    link: "/anxiety-quiz",
    time: "2–3 min",
  },

  {
    title: "Depression Self-Check",
    tag: "Mood",
    image: quiz2Image,
    description:
      "Reflect on changes in mood, motivation, interest, energy, and other experiences commonly associated with depression.",
    link: "/depression-quiz",
    time: "2–3 min",
  },

  {
    title: "OCD Self-Check",
    tag: "Thoughts & Behaviours",
    image: quiz3Image,
    description:
      "Explore experiences involving intrusive thoughts, repetitive behaviours, checking, and compulsive patterns.",
    link: "/ocd-quiz",
    time: "2–3 min",
  },

  {
    title: "ADHD Self-Check",
    tag: "Attention",
    image: quiz4Image,
    description:
      "Reflect on experiences related to attention, impulsivity, organisation, restlessness, and everyday concentration.",
    link: "/adhd-quiz",
    time: "2–3 min",
  },

  {
    title: "PTSD Self-Check",
    tag: "Trauma",
    image: quiz5Image,
    description:
      "Reflect on experiences that may occur after trauma, including avoidance, intrusive memories, alertness, and distress.",
    link: "/ptsd-quiz",
    time: "2–3 min",
  },

  {
    title: "Social Anxiety Self-Check",
    tag: "Social Situations",
    image: quiz6Image,
    description:
      "Reflect on fear, discomfort, self-consciousness, and worry that may arise in social situations.",
    link: "/social-anxiety-quiz",
    time: "2–3 min",
  },
];

const Quiz = () => {
  return (
    <div className="Quiz">

      <div className="quiz-page-container">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="quiz-menu-hero">

          <span className="quiz-menu-eyebrow">
            SELF-REFLECTION TOOLS
          </span>

          <h1>
            Take a Mental Health Self-Check
          </h1>

          <p>
            These short questionnaires can help you reflect on
            thoughts, feelings, and experiences you may have noticed
            recently.
          </p>

          <div className="quiz-hero-note">
            <span>🌿</span>

            <p>
              There are no “good” or “bad” answers. Choose the response
              that feels most accurate to your experience.
            </p>
          </div>

        </section>


        {/* =====================================================
            QUIZ INTRO
        ===================================================== */}

        <div className="quiz-section-heading">

          <div>
            <span className="quiz-section-label">
              CHOOSE A SELF-CHECK
            </span>

            <h2>
              What would you like to reflect on?
            </h2>

            <p>
              Select a topic below. Your answers are intended for
              self-awareness and should not be treated as a diagnosis.
            </p>
          </div>

        </div>


        {/* =====================================================
            QUIZ CARDS
        ===================================================== */}

        <div className="quiz-grid">

          {quizzes.map((quiz) => (

            <article
              className="quiz-menu-card"
              key={quiz.title}
            >

              <div className="quiz-menu-card-image">

                <img
                  src={quiz.image}
                  alt={`${quiz.title} illustration`}
                  loading="lazy"
                />

                <span className="quiz-card-tag">
                  {quiz.tag}
                </span>

              </div>


              <div className="quiz-menu-card-content">

                <div className="quiz-card-meta">
                  <span>🕒 {quiz.time}</span>
                 
                </div>

                <h3>
                  {quiz.title}
                </h3>

                <p>
                  {quiz.description}
                </p>

                <Link
                  to={quiz.link}
                  className="quiz-start-link"
                >
                  Start self-check

                  <span aria-hidden="true">
                    →
                  </span>
                </Link>

              </div>

            </article>

          ))}

        </div>


        {/* =====================================================
            DISCLAIMER
        ===================================================== */}

        <div className="quiz-menu-disclaimer">

          <div className="quiz-disclaimer-icon">
            ℹ️
          </div>

          <div>

            <h3>
              A self-check is not a diagnosis
            </h3>

            <p>
              These quizzes are intended for education and
              self-reflection. Results should not replace assessment,
              diagnosis, or treatment from a qualified mental health
              professional.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Quiz;