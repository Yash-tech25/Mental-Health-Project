import { useState } from "react";
import { Link } from "react-router-dom";

const Anxiety = () => {

  const [activeFeeling, setActiveFeeling] = useState("mind");
  const [revealedMyths, setRevealedMyths] = useState({});
  const [scenarioAnswer, setScenarioAnswer] = useState(null);


  // =========================================================
  // FEELINGS / SYMPTOMS
  // =========================================================

  const feelingData = {

    mind: [
      {
        icon: "💭",
        title: "Persistent worry",
        text:
          "Thoughts may keep returning to school, work, relationships, health, money, or things that might go wrong."
      },

      {
        icon: "🔁",
        title: "Overthinking",
        text:
          "A person may replay situations repeatedly or spend a lot of time imagining possible negative outcomes."
      },

      {
        icon: "🎯",
        title: "Difficulty concentrating",
        text:
          "When the mind stays focused on possible threats, concentrating on ordinary tasks can become difficult."
      },

      {
        icon: "⚠️",
        title: "Feeling on edge",
        text:
          "Even when nothing dangerous is happening, the mind may continue to feel alert or unsettled."
      }
    ],

    body: [
      {
        icon: "💓",
        title: "Racing heartbeat",
        text:
          "Anxiety can activate the body's stress response, which may cause the heart to beat faster."
      },

      {
        icon: "🌬️",
        title: "Shortness of breath",
        text:
          "Some people experience rapid breathing, breathlessness, or a feeling that they cannot take a full breath."
      },

      {
        icon: "💦",
        title: "Sweating or trembling",
        text:
          "Physical anxiety may appear as sweating, shaking, trembling, or feeling light-headed."
      },

      {
        icon: "🪢",
        title: "Muscle tension",
        text:
          "The body may remain tense for long periods, sometimes leading to headaches, aches, or fatigue."
      }
    ],

    behaviour: [
      {
        icon: "🚪",
        title: "Avoiding situations",
        text:
          "A person may begin avoiding places, conversations, activities, or responsibilities that trigger anxiety."
      },

      {
        icon: "✅",
        title: "Repeated reassurance",
        text:
          "They may repeatedly ask whether things are okay because reassurance briefly reduces uncertainty."
      },

      {
        icon: "⏳",
        title: "Putting things off",
        text:
          "Tasks can feel overwhelming when anxiety makes possible mistakes or failure seem especially threatening."
      },

      {
        icon: "🌙",
        title: "Difficulty resting",
        text:
          "An anxious mind may continue working even when the person wants to relax or sleep."
      }
    ]
  };


  // =========================================================
  // MYTHS
  // =========================================================

  const myths = [
    {
      id: 1,
      statement:
        "Anxiety is just worrying too much.",
      answer:
        "Myth",
      explanation:
        "Anxiety disorders can affect thoughts, emotions, behaviour, sleep, concentration, and physical sensations. They can also interfere with everyday life."
    },

    {
      id: 2,
      statement:
        "Someone can look calm and still be experiencing anxiety.",
      answer:
        "Reality",
      explanation:
        "Anxiety is not always visible. A person may appear composed while experiencing intense worry or physical symptoms internally."
    },

    {
      id: 3,
      statement:
        "Avoiding everything that causes anxiety is the best way to recover.",
      answer:
        "Myth",
      explanation:
        "Avoidance can provide short-term relief but may reinforce fear. Evidence-based therapies can help people gradually respond differently to feared situations."
    }
  ];


  // =========================================================
  // MYTH REVEAL
  // =========================================================

  const toggleMyth = (id) => {

    setRevealedMyths((previous) => ({
      ...previous,
      [id]: !previous[id]
    }));

  };


  return (

    <div className="interactive-article-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="article-hero anxiety-hero">

        <div className="article-hero-content">

          <span className="article-category">
            Mental Health Guide
          </span>

          <h1>
            Understanding Anxiety
          </h1>

          <p className="article-hero-subtitle">
            Anxiety can feel like your mind and body are
            preparing for danger even when you wish they
            would simply slow down.
          </p>

          <p className="article-reading-time">
            🕒 About 6 minutes · Interactive guide
          </p>

        </div>


        <div className="article-hero-visual">

          <div className="anxiety-orbit">

            <span className="orbit-thought thought-one">
              What if?
            </span>

            <span className="orbit-thought thought-two">
              Did I forget something?
            </span>

            <span className="orbit-thought thought-three">
              What if it goes wrong?
            </span>

            <div className="orbit-center">
              🧠
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="article-section article-intro-section">

        <div className="article-section-heading">

          <span>
            01
          </span>

          <div>

            <h2>
              Anxiety is more than ordinary worry
            </h2>

            <p>
              Feeling anxious occasionally is a normal part
              of life. Anxiety disorders are different:
              fear or worry can become persistent, difficult
              to control, and disruptive to everyday life.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT IT CAN FEEL LIKE
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            02
          </span>

          <h2>
            What can anxiety feel like?
          </h2>

          <p>
            Anxiety can show up differently in the mind,
            body, and behaviour.
          </p>

        </div>


        <div className="feeling-tabs">

          <button
            type="button"
            className={
              activeFeeling === "mind"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() => setActiveFeeling("mind")}
          >
            🧠 Mind
          </button>


          <button
            type="button"
            className={
              activeFeeling === "body"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() => setActiveFeeling("body")}
          >
            💓 Body
          </button>


          <button
            type="button"
            className={
              activeFeeling === "behaviour"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() => setActiveFeeling("behaviour")}
          >
            🚶 Behaviour
          </button>

        </div>


        <div className="feeling-card-grid">

          {feelingData[activeFeeling].map(
            (item) => (

              <div
                className="feeling-card"
                key={item.title}
              >

                <div className="feeling-card-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </div>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE SECTION
      ===================================================== */}

      <section className="article-section experience-section">

        <div className="article-section-title">

          <span>
            03
          </span>

          <h2>
            Step into an anxious day
          </h2>

          <p>
            This is only one possible experience.
            Anxiety looks different for different people.
          </p>

        </div>


        <div className="experience-timeline">


          <div className="experience-event">

            <div className="experience-time">
              8:00 AM
            </div>

            <div className="experience-content">

              <h3>
                Getting ready for class
              </h3>

              <p className="experience-situation">
                There is a presentation later today.
              </p>

              <div className="experience-thought">
                💭 “What if I forget everything and everyone
                notices?”
              </div>

              <p>
                The presentation is hours away, but the body
                may already feel tense and alert.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              11:30 AM
            </div>

            <div className="experience-content">

              <h3>
                Before the presentation
              </h3>

              <p className="experience-situation">
                Other students appear relaxed.
              </p>

              <div className="experience-thought">
                💭 “Why can't I calm down like everyone else?”
              </div>

              <p>
                Comparing the internal experience with how
                other people appear can add another layer
                of worry.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              7:00 PM
            </div>

            <div className="experience-content">

              <h3>
                The presentation is already over
              </h3>

              <p className="experience-situation">
                Nothing particularly bad happened.
              </p>

              <div className="experience-thought">
                💭 “I shouldn't have said that one sentence.
                Everyone probably noticed.”
              </div>

              <p>
                Anxiety can continue after a stressful
                situation through replaying and analysing
                what happened.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SCENARIO
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            04
          </span>

          <h2>
            What would you notice?
          </h2>

          <p>
            Try looking at the situation from another
            person's perspective.
          </p>

        </div>


        <div className="scenario-card">

          <div className="scenario-icon">
            🎤
          </div>

          <h3>
            Your friend has to speak in front of a group.
          </h3>

          <p>
            They have prepared carefully, but keep saying
            they might embarrass themselves.
          </p>


          <div className="scenario-options">

            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("dismiss")
              }
            >
              “You're overthinking it. Just relax.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("support")
              }
            >
              “I can see you're nervous. Want to practise
              together?”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("avoid")
              }
            >
              “You should skip it if it makes you anxious.”
            </button>

          </div>


          {scenarioAnswer && (

            <div
              className={`scenario-feedback ${
                scenarioAnswer === "support"
                  ? "positive"
                  : "learning"
              }`}
            >

              {scenarioAnswer === "support" ? (

                <>
                  <strong>
                    A supportive response
                  </strong>

                  <p>
                    This acknowledges what the person is
                    experiencing without dismissing the fear,
                    while offering practical support.
                  </p>
                </>

              ) : (

                <>
                  <strong>
                    Consider another approach
                  </strong>

                  <p>
                    Anxiety can feel very real even when the
                    danger seems small from the outside.
                    Validation and gentle support are often
                    more helpful than dismissal or encouraging
                    avoidance.
                  </p>
                </>

              )}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          TYPES OF ANXIETY
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            05
          </span>

          <h2>
            Anxiety can take different forms
          </h2>

        </div>


        <div className="anxiety-types-grid">


          <div className="anxiety-type-card">

            <span>
              🌧️
            </span>

            <h3>
              Generalized Anxiety Disorder
            </h3>

            <p>
              Persistent and difficult-to-control worry
              about different areas of everyday life.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              ⚡
            </span>

            <h3>
              Panic Disorder
            </h3>

            <p>
              Recurrent panic attacks involving sudden
              intense fear and strong physical sensations.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              👥
            </span>

            <h3>
              Social Anxiety Disorder
            </h3>

            <p>
              Strong fear in situations where a person
              expects they may be judged, embarrassed,
              or rejected.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              🕷️
            </span>

            <h3>
              Phobia-related Disorders
            </h3>

            <p>
              Intense fear associated with particular
              objects, situations, or environments.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          MYTH VS REALITY
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            06
          </span>

          <h2>
            Myth or reality?
          </h2>

          <p>
            Tap a statement to reveal the explanation.
          </p>

        </div>


        <div className="myth-grid">

          {myths.map((myth) => (

            <button
              type="button"
              className={`myth-card ${
                revealedMyths[myth.id]
                  ? "revealed"
                  : ""
              }`}
              key={myth.id}
              onClick={() =>
                toggleMyth(myth.id)
              }
            >

              {!revealedMyths[myth.id] ? (

                <>

                  <span className="myth-question-icon">
                    ?
                  </span>

                  <p>
                    {myth.statement}
                  </p>

                  <span className="myth-reveal">
                    Reveal answer
                  </span>

                </>

              ) : (

                <>

                  <span
                    className={`myth-answer ${
                      myth.answer === "Myth"
                        ? "myth"
                        : "reality"
                    }`}
                  >
                    {myth.answer === "Myth"
                      ? "✕ Myth"
                      : "✓ Reality"}
                  </span>

                  <p>
                    {myth.explanation}
                  </p>

                </>

              )}

            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          EMPATHY
      ===================================================== */}

      <section className="article-section empathy-section">

        <div className="article-section-title">

          <span>
            07
          </span>

          <h2>
            Supporting someone with anxiety
          </h2>

          <p>
            Small changes in how we respond can make
            someone feel more understood.
          </p>

        </div>


        <div className="empathy-comparison">


          <div className="empathy-card avoid-response">

            <span className="empathy-label">
              Instead of
            </span>

            <p>
              “There's nothing to worry about.
              Just stop thinking about it.”
            </p>

          </div>


          <div className="empathy-arrow">
            →
          </div>


          <div className="empathy-card supportive-response">

            <span className="empathy-label">
              Try
            </span>

            <p>
              “I can see this feels overwhelming.
              I'm here if you want to talk or need
              some support.”
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT CAN HELP
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            08
          </span>

          <h2>
            What can help?
          </h2>

        </div>


        <div className="support-option-grid">


          <div className="support-option-card">

            <span>
              💬
            </span>

            <h3>
              Psychotherapy
            </h3>

            <p>
              Cognitive behavioral therapy is commonly used
              for anxiety disorders and can help people
              respond differently to anxious thoughts and
              situations.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              🩺
            </span>

            <h3>
              Professional care
            </h3>

            <p>
              A qualified healthcare professional can assess
              symptoms and discuss appropriate treatment,
              including medication when suitable.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              🌿
            </span>

            <h3>
              Stress-management skills
            </h3>

            <p>
              Exercise, mindfulness, meditation, sleep,
              and other healthy routines may support overall
              well-being alongside appropriate care.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          MANORA TOOLS
      ===================================================== */}

      <section className="article-tools-section">

        <div>

          <span className="article-tools-label">
            Continue with Manora
          </span>

          <h2>
            Want to check in with yourself?
          </h2>

          <p>
            Use these tools for reflection and everyday
            wellness support.
          </p>

        </div>


        <div className="article-tool-links">

          <Link to="/anxiety-quiz">
            📝 Anxiety Self-Check
            <span>→</span>
          </Link>


          <Link to="/relax">
            🌬️ Try a Breathing Exercise
            <span>→</span>
          </Link>


          <Link to="/daily-journal">
            📖 Open Journal
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* =====================================================
          DISCLAIMER
      ===================================================== */}

      <div className="article-disclaimer">

        <span>
          ℹ️
        </span>

        <p>
          This page is for education and self-awareness.
          It cannot diagnose an anxiety disorder. If anxiety
          is persistent, difficult to manage, or interfering
          with daily life, consider speaking with a qualified
          mental health professional.
        </p>

      </div>


    </div>
  );
};

export default Anxiety;