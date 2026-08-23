import { useState } from "react";
import { Link } from "react-router-dom";

const BipolarArticle = () => {

  const [activeState, setActiveState] = useState("mania");
  const [revealedMyths, setRevealedMyths] = useState({});
  const [scenarioAnswer, setScenarioAnswer] = useState(null);


  // =========================================================
  // MOOD EPISODES
  // =========================================================

  const episodeData = {

    mania: [
      {
        icon: "⚡",
        title: "Unusually high energy",
        text:
          "A person may feel dramatically more energetic, active, restless, or driven than usual."
      },

      {
        icon: "🌙",
        title: "Reduced need for sleep",
        text:
          "Someone may sleep only a few hours yet still feel unusually energetic rather than tired."
      },

      {
        icon: "💨",
        title: "Racing thoughts",
        text:
          "Thoughts may move extremely quickly, making it difficult to stay with one idea or conversation."
      },

      {
        icon: "🎯",
        title: "Impulsive decisions",
        text:
          "Judgment can become impaired, sometimes leading to risky spending, reckless behaviour, or other decisions with serious consequences."
      }
    ],

    depression: [
      {
        icon: "🔋",
        title: "Low energy",
        text:
          "Activities that normally feel manageable may suddenly require enormous effort."
      },

      {
        icon: "🌧️",
        title: "Low or empty mood",
        text:
          "A person may experience persistent sadness, hopelessness, emptiness, or irritability."
      },

      {
        icon: "🕯️",
        title: "Loss of interest",
        text:
          "Activities, relationships, and hobbies that normally matter may stop feeling enjoyable."
      },

      {
        icon: "🧩",
        title: "Difficulty thinking",
        text:
          "Concentration, memory, and decision-making may become much more difficult."
      }
    ],

    hypomania: [
      {
        icon: "✨",
        title: "Noticeable change in energy",
        text:
          "Energy and activity increase noticeably compared with the person's usual behaviour."
      },

      {
        icon: "🗣️",
        title: "More talkative",
        text:
          "Speech may become faster or more frequent, with a stronger urge to keep talking."
      },

      {
        icon: "💡",
        title: "Many ideas",
        text:
          "Thoughts and ideas may come rapidly, sometimes accompanied by increased confidence or productivity."
      },

      {
        icon: "🌙",
        title: "Less sleep",
        text:
          "A person may need considerably less sleep while still feeling energetic."
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
        "Bipolar disorder means someone's mood changes every few minutes.",

      answer:
        "Myth",

      explanation:
        "Bipolar disorder involves distinct mood episodes that generally last for days or longer. Everyday emotional changes are not the same as manic, hypomanic, or depressive episodes."
    },

    {
      id: 2,

      statement:
        "Mania is not simply being extremely happy.",

      answer:
        "Reality",

      explanation:
        "Mania can involve elevated or irritable mood, unusually high energy, reduced need for sleep, racing thoughts, impaired judgment, and behaviour that may seriously disrupt a person's life."
    },

    {
      id: 3,

      statement:
        "People with bipolar disorder can live fulfilling and productive lives.",

      answer:
        "Reality",

      explanation:
        "With appropriate treatment, ongoing monitoring, support, and healthy routines, many people with bipolar disorder manage their symptoms and live fulfilling lives."
    }
  ];


  const toggleMyth = (id) => {

    setRevealedMyths((previous) => ({
      ...previous,
      [id]: !previous[id]
    }));

  };


  return (

    <div className="interactive-article-page bipolar-article">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="article-hero bipolar-hero">

        <div className="article-hero-content">

          <span className="article-category">
            Mental Health Guide
          </span>

          <h1>
            Understanding Bipolar Disorder
          </h1>

          <p className="article-hero-subtitle">
            Bipolar disorder is not simply moving between
            happiness and sadness. Mood episodes can change
            energy, sleep, thinking, judgment, behaviour,
            and everyday functioning.
          </p>

          <p className="article-reading-time">
            🕒 About 8 minutes · Interactive guide
          </p>

        </div>


        <div className="article-hero-visual">

          <div className="bipolar-balance-visual">

            <div className="bipolar-high-side">

              <span className="bipolar-energy-icon">
                ⚡
              </span>

              <span className="bipolar-state-label">
                HIGH ENERGY
              </span>

            </div>


            <div className="bipolar-balance-line"></div>


            <div className="bipolar-low-side">

              <span className="bipolar-energy-icon">
                🌧️
              </span>

              <span className="bipolar-state-label">
                LOW ENERGY
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-heading">

          <span>
            01
          </span>

          <div>

            <h2>
              More than ordinary mood changes
            </h2>

            <p>
              Everyone experiences changes in mood.
              Bipolar disorder is different because it
              involves episodes of unusually elevated,
              irritable, or depressed mood together with
              significant changes in energy and activity.
            </p>

            <p>
              These episodes can affect relationships,
              studies, work, finances, sleep, judgment,
              and everyday functioning.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          EXPLORE EPISODES
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            02
          </span>

          <h2>
            The experience can look very different
          </h2>

          <p>
            Select a mood state to explore some of the
            changes a person may experience.
          </p>

        </div>


        <div className="feeling-tabs">

          <button
            type="button"
            className={
              activeState === "mania"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveState("mania")
            }
          >
            ⚡ Mania
          </button>


          <button
            type="button"
            className={
              activeState === "depression"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveState("depression")
            }
          >
            🌧️ Depression
          </button>


          <button
            type="button"
            className={
              activeState === "hypomania"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveState("hypomania")
            }
          >
            ✨ Hypomania
          </button>

        </div>


        <div className="feeling-card-grid">

          {episodeData[activeState].map(
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
          ENERGY / SLEEP / THINKING COMPARISON
      ===================================================== */}

      <section className="article-section bipolar-spectrum-section">

        <div className="article-section-title">

          <span>
            03
          </span>

          <h2>
            The difference goes beyond mood
          </h2>

          <p>
            Look at how several parts of everyday life may
            change during different episodes.
          </p>

        </div>


        <div className="bipolar-comparison-table">

          <div className="bipolar-comparison-header">

            <div></div>

            <div>
              ⚡ Mania / Hypomania
            </div>

            <div>
              🌧️ Depression
            </div>

          </div>


          <div className="bipolar-comparison-row">

            <div className="comparison-label">
              🔋 Energy
            </div>

            <div>
              Unusually increased
            </div>

            <div>
              Often greatly reduced
            </div>

          </div>


          <div className="bipolar-comparison-row">

            <div className="comparison-label">
              🌙 Sleep
            </div>

            <div>
              May need much less sleep
            </div>

            <div>
              May sleep too little or too much
            </div>

          </div>


          <div className="bipolar-comparison-row">

            <div className="comparison-label">
              💭 Thinking
            </div>

            <div>
              Thoughts may race
            </div>

            <div>
              Thinking may feel slowed or difficult
            </div>

          </div>


          <div className="bipolar-comparison-row">

            <div className="comparison-label">
              🎯 Decisions
            </div>

            <div>
              Judgment may become impulsive
            </div>

            <div>
              Decisions may feel extremely difficult
            </div>

          </div>


          <div className="bipolar-comparison-row">

            <div className="comparison-label">
              🗣️ Speech
            </div>

            <div>
              May become rapid or difficult to interrupt
            </div>

            <div>
              May become quieter or slower
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="article-section experience-section">

        <div className="article-section-title">

          <span>
            04
          </span>

          <h2>
            Step into a manic episode
          </h2>

          <p>
            This is one simplified example. Bipolar
            disorder does not look the same for everyone.
          </p>

        </div>


        <div className="experience-timeline">


          <div className="experience-event">

            <div className="experience-time">
              Monday
            </div>

            <div className="experience-content">

              <h3>
                Three hours of sleep
              </h3>

              <p className="experience-situation">
                You barely slept last night.
              </p>

              <div className="experience-thought">
                💭 “I feel incredible. I don't even need
                sleep right now.”
              </div>

              <p>
                A decreased need for sleep is different
                from simply being unable to sleep — the
                person may still feel unusually energetic.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              Wednesday
            </div>

            <div className="experience-content">

              <h3>
                Everything feels possible
              </h3>

              <p className="experience-situation">
                Several new projects have been started
                within a few days.
              </p>

              <div className="experience-thought">
                💭 “I have so many ideas. I can do all of
                this at once.”
              </div>

              <p>
                Increased activity and confidence can feel
                productive at first, while judgment and
                realistic limits may become harder to assess.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              Friday
            </div>

            <div className="experience-content">

              <h3>
                Decisions become riskier
              </h3>

              <p className="experience-situation">
                Friends become concerned about spending
                and impulsive decisions.
              </p>

              <div className="experience-thought">
                💭 “They're slowing me down. I know exactly
                what I'm doing.”
              </div>

              <p>
                During severe mania, insight and judgment
                may become significantly impaired.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          EMPATHY SCENARIO
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            05
          </span>

          <h2>
            What would you say?
          </h2>

          <p>
            Imagine someone you care about has barely slept
            for several nights, is speaking unusually fast,
            and is making increasingly risky decisions.
          </p>

        </div>


        <div className="scenario-card">

          <div className="scenario-icon">
            💬
          </div>

          <h3>
            They say:
          </h3>

          <p>
            “I've never felt better. I don't need sleep.
            Everyone else just can't keep up with me.”
          </p>


          <div className="scenario-options">

            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("encourage")
              }
            >
              “That's amazing — use the energy while you have it!”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("support")
              }
            >
              “I've noticed you haven't been sleeping and
              things seem very intense. I'm concerned about you.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("judge")
              }
            >
              “You're acting completely irrational.”
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
                    A more supportive response
                  </strong>

                  <p>
                    Calmly describing specific changes you
                    have noticed can express concern without
                    shaming the person or encouraging
                    potentially risky behaviour.
                  </p>
                </>

              ) : (

                <>
                  <strong>
                    Try another perspective
                  </strong>

                  <p>
                    Mania can affect insight and judgment.
                    Encouraging risky behaviour or attacking
                    the person may make it harder to connect
                    them with appropriate support.
                  </p>
                </>

              )}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          BIPOLAR I VS II
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            06
          </span>

          <h2>
            Bipolar I and Bipolar II are not the same
          </h2>

          <p>
            One of the most important differences involves
            mania and hypomania.
          </p>

        </div>


        <div className="bipolar-types-grid">


          <div className="bipolar-type-card">

            <div className="bipolar-type-number">
              I
            </div>

            <span className="bipolar-type-icon">
              ⚡
            </span>

            <h3>
              Bipolar I Disorder
            </h3>

            <p>
              Defined by the occurrence of at least one
              manic episode. Depressive episodes commonly
              occur, but are not required for the diagnosis
              of Bipolar I.
            </p>

          </div>


          <div className="bipolar-type-card">

            <div className="bipolar-type-number">
              II
            </div>

            <span className="bipolar-type-icon">
              ✨
            </span>

            <h3>
              Bipolar II Disorder
            </h3>

            <p>
              Involves depressive episodes and hypomanic
              episodes rather than the full manic episodes
              seen in Bipolar I.
            </p>

          </div>

        </div>


        <div className="bipolar-important-note">

          <span>
            💡
          </span>

          <p>
            <strong>Hypomania does not mean “half as serious.”</strong>
            {" "}
            Bipolar II can still cause substantial impairment,
            particularly because depressive episodes can be
            severe.
          </p>

        </div>

      </section>


      {/* =====================================================
          MYTH VS REALITY
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            07
          </span>

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

          <span>
            08
          </span>

          <h2>
            Supporting someone with bipolar disorder
          </h2>

          <p>
            The person is more than whichever mood episode
            they may currently be experiencing.
          </p>

        </div>


        <div className="empathy-comparison">

          <div className="empathy-card avoid-response">

            <span className="empathy-label">
              Instead of
            </span>

            <p>
              “You're bipolar. You're always changing
              your mind.”
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
              “I've noticed some changes lately.
              How are you doing, and is there anything
              I can do to support you?”
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          TREATMENT
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            09
          </span>

          <h2>
            Bipolar disorder can be managed
          </h2>

          <p>
            Treatment is usually long-term and should be
            individualized with a qualified mental health
            professional.
          </p>

        </div>


        <div className="support-option-grid">


          <div className="support-option-card">

            <span>
              💊
            </span>

            <h3>
              Medication
            </h3>

            <p>
              Mood stabilizers and certain antipsychotic
              medications are commonly used to help manage
              bipolar disorder. Medication decisions should
              be made with a qualified clinician.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              💬
            </span>

            <h3>
              Psychotherapy
            </h3>

            <p>
              Psychotherapy can support coping skills,
              relationships, treatment adherence, and
              recognition of changes in mood.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              🌙
            </span>

            <h3>
              Routines and monitoring
            </h3>

            <p>
              Consistent sleep, healthy routines, stress
              management, and recognizing early warning
              signs can support ongoing treatment.
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
            Notice patterns over time
          </h2>

          <p>
            Manora's tools can help you reflect on emotions
            and routines, but they cannot diagnose bipolar
            disorder.
          </p>

        </div>


        <div className="article-tool-links">

          <Link to="/mood-tracker">
            📊 Track Your Mood
            <span>→</span>
          </Link>


          <Link to="/daily-journal">
            📖 Open Journal
            <span>→</span>
          </Link>


          <Link to="/relax">
            🌿 Relaxation Tools
            <span>→</span>
          </Link>


          {/* <Link to="/contactus">
            🤝 Find Support
            <span>→</span>
          </Link> */}

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
          This guide is for education and self-awareness
          and cannot diagnose bipolar disorder. Diagnosis
          and treatment should be provided by a qualified
          mental health professional.
        </p>

      </div>

    </div>

  );
};

export default BipolarArticle;