import { useState } from "react";
import { Link } from "react-router-dom";

const Psychosis = () => {

  const [activeSymptoms, setActiveSymptoms] = useState("perception");
  const [revealedMyths, setRevealedMyths] = useState({});
  const [scenarioAnswer, setScenarioAnswer] = useState(null);


  // =========================================================
  // SYMPTOM GROUPS
  // =========================================================

  const symptomData = {

    perception: [
      {
        icon: "👂",
        title: "Hearing things others do not",
        text:
          "A person may hear voices, sounds, or other experiences that feel real even though others do not perceive them."
      },

      {
        icon: "👁️",
        title: "Seeing or sensing things",
        text:
          "Hallucinations can involve sight, touch, smell, taste, or other sensory experiences."
      },

      {
        icon: "🌫️",
        title: "Reality may feel altered",
        text:
          "The environment may feel unusual, threatening, or difficult to interpret."
      },

      {
        icon: "⚠️",
        title: "Strong sense of threat",
        text:
          "Someone may feel unsafe or watched even when people around them do not see an obvious danger."
      }
    ],

    beliefs: [
      {
        icon: "👀",
        title: "Feeling watched",
        text:
          "A person may strongly believe they are being monitored, followed, or targeted."
      },

      {
        icon: "📺",
        title: "Personal meaning in events",
        text:
          "Ordinary events, media, or conversations may seem to contain special messages directed specifically at them."
      },

      {
        icon: "🧠",
        title: "Unusual beliefs",
        text:
          "Beliefs can feel completely convincing even when other people do not share them."
      },

      {
        icon: "🔒",
        title: "Difficulty reconsidering",
        text:
          "Contradictory evidence may not immediately change the belief because the experience feels very real."
      }
    ],

    thinking: [
      {
        icon: "🧩",
        title: "Disorganized thoughts",
        text:
          "Thoughts may become difficult to organize or connect in a clear sequence."
      },

      {
        icon: "🗣️",
        title: "Speech may be hard to follow",
        text:
          "Conversation can jump between ideas or become confusing to listeners."
      },

      {
        icon: "🎯",
        title: "Difficulty concentrating",
        text:
          "Keeping attention on one task or conversation may become much harder."
      },

      {
        icon: "🧭",
        title: "Difficulty making sense of situations",
        text:
          "Everyday events may become harder to interpret accurately."
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
        "Psychosis automatically means someone has schizophrenia.",
      answer:
        "Myth",
      explanation:
        "Psychosis can occur in several mental health conditions, substance-related states, and some medical conditions. Schizophrenia is only one possible cause."
    },

    {
      id: 2,
      statement:
        "A person experiencing psychosis may genuinely believe what they are experiencing is real.",
      answer:
        "Reality",
      explanation:
        "Reduced insight can make hallucinations or delusional beliefs feel completely real. The person is not necessarily pretending or choosing the experience."
    },

    {
      id: 3,
      statement:
        "Arguing aggressively is the best way to convince someone that their experience is not real.",
      answer:
        "Myth",
      explanation:
        "Confrontation can increase fear or mistrust. Calm communication, respect, and professional support are generally more helpful."
    }
  ];


  const toggleMyth = (id) => {

    setRevealedMyths((previous) => ({
      ...previous,
      [id]: !previous[id]
    }));

  };


  return (

    <div className="interactive-article-page psychosis-article">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="article-hero psychosis-hero">

        <div className="article-hero-content">

          <span className="article-category">
            Mental Health Guide
          </span>

          <h1>
            Understanding Psychosis
          </h1>

          <p className="article-hero-subtitle">
            Psychosis can affect the way a person perceives,
            interprets, and understands reality — making
            experiences feel convincing even when others
            see the situation differently.
          </p>

          <p className="article-reading-time">
            🕒 About 7 minutes · Interactive guide
          </p>

        </div>


        <div className="article-hero-visual">

          <div className="psychosis-visual">

            <div className="psychosis-center">
              reality
            </div>

            <span className="psychosis-layer layer-one">
              perception
            </span>

            <span className="psychosis-layer layer-two">
              belief
            </span>

            <span className="psychosis-layer layer-three">
              interpretation
            </span>

            <span className="psychosis-layer layer-four">
              thoughts
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-heading">

          <span>01</span>

          <div>

            <h2>
              Psychosis is an experience, not one single diagnosis
            </h2>

            <p>
              Psychosis refers to a group of symptoms that
              affect how a person interprets reality.
              It can include hallucinations, delusions,
              disorganized thinking, and changes in behaviour.
            </p>

            <p>
              Psychosis can occur in several psychiatric
              conditions and may also be related to substance
              use or certain medical conditions.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SYMPTOMS
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>02</span>

          <h2>
            What can psychosis affect?
          </h2>

          <p>
            Explore how perception, beliefs, and thinking
            may change.
          </p>

        </div>


        <div className="feeling-tabs">

          <button
            type="button"
            className={
              activeSymptoms === "perception"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("perception")
            }
          >
            👁️ Perception
          </button>


          <button
            type="button"
            className={
              activeSymptoms === "beliefs"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("beliefs")
            }
          >
            💭 Beliefs
          </button>


          <button
            type="button"
            className={
              activeSymptoms === "thinking"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("thinking")
            }
          >
            🧩 Thinking
          </button>

        </div>


        <div className="feeling-card-grid">

          {symptomData[activeSymptoms].map(
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
          REALITY INTERPRETATION
      ===================================================== */}

      <section className="article-section psychosis-reality-section">

        <div className="article-section-title">

          <span>03</span>

          <h2>
            The same situation can feel very different
          </h2>

          <p>
            Psychosis can change how ordinary events are interpreted.
          </p>

        </div>


        <div className="psychosis-perspective-grid">

          <div className="psychosis-perspective-card">

            <span className="perspective-label">
              What others see
            </span>

            <div className="perspective-icon">
              📺
            </div>

            <h3>
              A television programme
            </h3>

            <p>
              Other people see an ordinary news broadcast.
            </p>

          </div>


          <div className="perspective-divider">
            ≠
          </div>


          <div className="psychosis-perspective-card experience">

            <span className="perspective-label">
              What the person may experience
            </span>

            <div className="perspective-icon">
              💭
            </div>

            <h3>
              “They're talking about me.”
            </h3>

            <p>
              The person may interpret the broadcast as
              containing a personal message specifically
              directed toward them.
            </p>

          </div>

        </div>


        <div className="psychosis-perspective-note">

          <span>
            💡
          </span>

          <p>
            The experience may feel completely convincing.
            Understanding that helps explain why simply saying
            “that's not real” may not immediately change how
            the person feels.
          </p>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE TIMELINE
      ===================================================== */}

      <section className="article-section experience-section">

        <div className="article-section-title">

          <span>04</span>

          <h2>
            Step into an uncertain day
          </h2>

          <p>
            This is only a simplified example and does not
            represent every experience of psychosis.
          </p>

        </div>


        <div className="experience-timeline">


          <div className="experience-event">

            <div className="experience-time">
              10:00 AM
            </div>

            <div className="experience-content">

              <h3>
                Walking through campus
              </h3>

              <p className="experience-situation">
                Two people nearby start laughing.
              </p>

              <div className="experience-thought">
                💭 “They're laughing because they know
                something about me.”
              </div>

              <p>
                An ordinary social cue may take on personal
                or threatening meaning.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              1:00 PM
            </div>

            <div className="experience-content">

              <h3>
                Concentrating becomes difficult
              </h3>

              <p className="experience-situation">
                Several thoughts feel equally important.
              </p>

              <div className="experience-thought">
                💭 “Everything seems connected somehow.”
              </div>

              <p>
                Organizing thoughts and deciding what
                information matters may become difficult.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              8:00 PM
            </div>

            <div className="experience-content">

              <h3>
                Feeling unsafe
              </h3>

              <p className="experience-situation">
                Family members do not see any immediate danger.
              </p>

              <div className="experience-thought">
                💭 “Why doesn't anyone believe me?”
              </div>

              <p>
                The difference between what the person
                experiences and what others perceive can
                feel frightening and isolating.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT CAN CAUSE PSYCHOSIS
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>05</span>

          <h2>
            Psychosis can have different causes
          </h2>

          <p>
            Experiencing psychosis does not automatically
            mean that someone has schizophrenia.
          </p>

        </div>


        <div className="anxiety-types-grid">

          <div className="anxiety-type-card">

            <span>🧠</span>

            <h3>
              Schizophrenia spectrum disorders
            </h3>

            <p>
              Psychotic symptoms can occur as part of
              schizophrenia and related disorders.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>⚡</span>

            <h3>
              Mood disorders
            </h3>

            <p>
              Severe mood episodes in bipolar disorder or
              major depression can sometimes include
              psychotic symptoms.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>🧪</span>

            <h3>
              Substance-related causes
            </h3>

            <p>
              Certain substances or withdrawal states may
              trigger psychotic symptoms.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>🩺</span>

            <h3>
              Medical causes
            </h3>

            <p>
              Some neurological, metabolic, infectious,
              or other medical conditions can produce
              symptoms that resemble psychosis.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SCENARIO
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>06</span>

          <h2>
            What would you say?
          </h2>

          <p>
            Imagine a friend seems frightened by something
            you cannot see.
          </p>

        </div>


        <div className="scenario-card">

          <div className="scenario-icon">
            🤝
          </div>

          <h3>
            They say:
          </h3>

          <p>
            “Someone is sending me messages through the TV.
            I know they're trying to warn me.”
          </p>


          <div className="scenario-options">

            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("confirm")
              }
            >
              “Yes, you're probably right.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("support")
              }
            >
              “I don't experience the TV that way,
              but I can see that this feels very real
              and frightening to you.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("dismiss")
              }
            >
              “That's ridiculous. Stop making things up.”
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
                    This acknowledges the person's distress
                    without confirming something you do not
                    believe is happening.
                  </p>
                </>

              ) : scenarioAnswer === "confirm" ? (

                <>
                  <strong>
                    Validate the emotion, not the belief
                  </strong>

                  <p>
                    Confirming a frightening belief can
                    reinforce it. You can remain honest
                    about what you observe while still
                    showing compassion.
                  </p>
                </>

              ) : (

                <>
                  <strong>
                    Avoid ridicule
                  </strong>

                  <p>
                    The experience may feel completely real
                    to the person. Mocking or confronting
                    them aggressively can increase fear,
                    mistrust, and isolation.
                  </p>
                </>

              )}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          MYTHS
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>07</span>

          <h2>
            Myth or reality?
          </h2>

          <p>
            Tap each statement to reveal the explanation.
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

          <span>08</span>

          <h2>
            Supporting someone experiencing psychosis
          </h2>

          <p>
            Calmness, respect, and safety are more helpful
            than ridicule or confrontation.
          </p>

        </div>


        <div className="empathy-comparison">

          <div className="empathy-card avoid-response">

            <span className="empathy-label">
              Instead of
            </span>

            <p>
              “You're imagining everything.
              None of this makes sense.”
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
              “I can see that you're frightened.
              I may experience this differently,
              but I'm here with you.”
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROFESSIONAL HELP
      ===================================================== */}

      <section className="article-section psychosis-help-section">

        <div className="article-section-title">

          <span>09</span>

          <h2>
            Early professional help matters
          </h2>

          <p>
            New or worsening psychotic symptoms should be
            assessed by a qualified healthcare professional.
          </p>

        </div>


        <div className="support-option-grid">

          <div className="support-option-card">

            <span>💊</span>

            <h3>
              Medication
            </h3>

            <p>
              Antipsychotic medication may be used depending
              on the cause and severity of the symptoms.
            </p>

          </div>


          <div className="support-option-card">

            <span>💬</span>

            <h3>
              Psychological support
            </h3>

            <p>
              Therapy and psychosocial support can help
              with coping, functioning, relationships,
              and recovery.
            </p>

          </div>


          <div className="support-option-card">

            <span>🤝</span>

            <h3>
              Family and community support
            </h3>

            <p>
              Supportive relationships and coordinated
              care can play an important role in recovery.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          URGENT SUPPORT
      ===================================================== */}

      <section className="article-section psychosis-urgent-section">

        <div className="psychosis-urgent-icon">
          ⚠️
        </div>

        <div>

          <h2>
            When urgent help may be needed
          </h2>

          <p>
            Seek urgent professional help if someone
            experiencing psychosis is at immediate risk of
            harming themselves or another person, is unable
            to care for basic needs, is extremely confused,
            or appears medically unwell.
          </p>

          <p>
            Stay calm, prioritize immediate safety, and
            involve appropriate emergency or healthcare
            services when necessary.
          </p>

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
            Support everyday well-being
          </h2>

          <p>
            Manora's tools may support reflection and
            relaxation, but psychosis requires professional
            assessment and treatment.
          </p>

        </div>


        <div className="article-tool-links">

          <Link to="/daily-journal">
            📖 Open Journal
            <span>→</span>
          </Link>


          <Link to="/mood-tracker">
            😊 Track Your Mood
            <span>→</span>
          </Link>


          <Link to="/relax">
            🌿 Relaxation Tools
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
          This guide is for education and awareness and
          cannot identify the cause of psychotic symptoms.
          Psychosis can have psychiatric, substance-related,
          neurological, or other medical causes and should
          be assessed by a qualified healthcare professional.
        </p>

      </div>


    </div>
  );
};

export default Psychosis;