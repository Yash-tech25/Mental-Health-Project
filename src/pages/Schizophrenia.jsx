import { useState } from "react";
import { Link } from "react-router-dom";

const Schizophrenia = () => {

  const [activeSymptoms, setActiveSymptoms] = useState("positive");
  const [revealedMyths, setRevealedMyths] = useState({});
  const [scenarioAnswer, setScenarioAnswer] = useState(null);


  // =========================================================
  // SYMPTOM GROUPS
  // =========================================================

  const symptomData = {

    positive: [
      {
        icon: "👂",
        title: "Hallucinations",
        text:
          "A person may hear, see, smell, taste, or feel things that others do not. Hearing voices is one possible experience."
      },

      {
        icon: "💭",
        title: "Delusions",
        text:
          "A person may hold strong beliefs that are not supported by evidence, such as believing they are being watched or targeted."
      },

      {
        icon: "🗣️",
        title: "Disorganized speech",
        text:
          "Thoughts and speech may become difficult for other people to follow or may move between ideas in unusual ways."
      },

      {
        icon: "🧩",
        title: "Disorganized behaviour",
        text:
          "Behaviour may become unusual or make everyday activities and routines more difficult."
      }
    ],

    negative: [
      {
        icon: "😶",
        title: "Reduced emotional expression",
        text:
          "Facial expressions, voice, or gestures may become less expressive even though the person still experiences emotions."
      },

      {
        icon: "🔋",
        title: "Low motivation",
        text:
          "Starting or continuing everyday activities can become extremely difficult."
      },

      {
        icon: "🚪",
        title: "Social withdrawal",
        text:
          "Someone may interact less with friends, family, classmates, or coworkers."
      },

      {
        icon: "💬",
        title: "Reduced speech",
        text:
          "A person may speak less frequently or give shorter responses than they previously did."
      }
    ],

    cognitive: [
      {
        icon: "🎯",
        title: "Difficulty concentrating",
        text:
          "Following conversations, reading, studying, or staying focused on a task may become difficult."
      },

      {
        icon: "🧠",
        title: "Working memory difficulties",
        text:
          "Holding information in mind long enough to use it can sometimes become challenging."
      },

      {
        icon: "🗂️",
        title: "Planning difficulties",
        text:
          "Organizing tasks, making decisions, and completing several steps in sequence may require much more effort."
      },

      {
        icon: "🔄",
        title: "Processing information",
        text:
          "Understanding and responding to new information may sometimes take longer."
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
        "Schizophrenia means having multiple personalities.",

      answer:
        "Myth",

      explanation:
        "Schizophrenia and dissociative identity disorder are different conditions. Schizophrenia does not mean that a person has multiple personalities."
    },

    {
      id: 2,

      statement:
        "People with schizophrenia can study, work, maintain relationships, and live meaningful lives.",

      answer:
        "Reality",

      explanation:
        "Schizophrenia can be a serious condition, but treatment and appropriate support can help many people manage symptoms and pursue meaningful goals."
    },

    {
      id: 3,

      statement:
        "Schizophrenia involves much more than hallucinations.",

      answer:
        "Reality",

      explanation:
        "Symptoms can also affect motivation, emotional expression, concentration, memory, thinking, communication, and everyday functioning."
    }

  ];


  const toggleMyth = (id) => {

    setRevealedMyths((previous) => ({
      ...previous,
      [id]: !previous[id]
    }));

  };


  return (

    <div className="interactive-article-page schizophrenia-article">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="article-hero schizophrenia-hero">

        <div className="article-hero-content">

          <span className="article-category">
            Mental Health Guide
          </span>

          <h1>
            Understanding Schizophrenia
          </h1>

          <p className="article-hero-subtitle">
            Schizophrenia can affect how a person perceives
            reality, organizes thoughts, expresses emotions,
            concentrates, and connects with everyday life.
          </p>

          <p className="article-reading-time">
            🕒 About 8 minutes · Interactive guide
          </p>

        </div>


        <div className="article-hero-visual">

          <div className="schizo-visual">

            <div className="schizo-center">
              🧠
            </div>

            <span className="schizo-fragment fragment-one">
              perception
            </span>

            <span className="schizo-fragment fragment-two">
              thoughts
            </span>

            <span className="schizo-fragment fragment-three">
              focus
            </span>

            <span className="schizo-fragment fragment-four">
              motivation
            </span>

            <span className="schizo-fragment fragment-five">
              emotions
            </span>

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
              More than what movies often show
            </h2>

            <p>
              Schizophrenia is a complex mental health
              disorder that can affect the way a person
              thinks, feels, behaves, and interprets
              experiences.
            </p>

            <p>
              Hallucinations and delusions are well-known
              symptoms, but they are only part of the
              condition. Motivation, concentration,
              communication, and emotional expression
              can also be affected.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SYMPTOMS
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            02
          </span>

          <h2>
            Schizophrenia can affect people in different ways
          </h2>

          <p>
            Explore three broad groups of symptoms.
          </p>

        </div>


        <div className="feeling-tabs">

          <button
            type="button"
            className={
              activeSymptoms === "positive"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("positive")
            }
          >
            ✦ Positive Symptoms
          </button>


          <button
            type="button"
            className={
              activeSymptoms === "negative"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("negative")
            }
          >
            ◯ Negative Symptoms
          </button>


          <button
            type="button"
            className={
              activeSymptoms === "cognitive"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("cognitive")
            }
          >
            🧠 Cognitive Symptoms
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
          POSITIVE / NEGATIVE EXPLANATION
      ===================================================== */}

      <section className="article-section schizophrenia-terms-section">

        <div className="article-section-title">

          <span>
            03
          </span>

          <h2>
            What do “positive” and “negative” mean?
          </h2>

          <p>
            These clinical terms do not mean good and bad.
          </p>

        </div>


        <div className="schizo-term-grid">


          <div className="schizo-term-card positive-term">

            <div className="schizo-term-symbol">
              +
            </div>

            <h3>
              Positive symptoms
            </h3>

            <p>
              “Positive” refers to experiences that are
              <strong> added </strong>
              to a person's usual functioning.
            </p>

            <div className="schizo-term-examples">
              Hallucinations · Delusions · Disorganized thinking
            </div>

          </div>


          <div className="schizo-term-card negative-term">

            <div className="schizo-term-symbol">
              −
            </div>

            <h3>
              Negative symptoms
            </h3>

            <p>
              “Negative” refers to abilities or behaviours
              that become
              <strong> reduced </strong>
              compared with previous functioning.
            </p>

            <div className="schizo-term-examples">
              Motivation · Expression · Speech · Social engagement
            </div>

          </div>


          <div className="schizo-term-card cognitive-term">

            <div className="schizo-term-symbol">
              ◇
            </div>

            <h3>
              Cognitive symptoms
            </h3>

            <p>
              These involve difficulties with
              <strong> thinking and processing information.</strong>
            </p>

            <div className="schizo-term-examples">
              Attention · Memory · Planning · Decision-making
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
            What everyday difficulty can look like
          </h2>

          <p>
            This is a simplified example, not a simulation.
            Experiences vary greatly between individuals.
          </p>

        </div>


        <div className="experience-timeline">


          <div className="experience-event">

            <div className="experience-time">
              9:00 AM
            </div>

            <div className="experience-content">

              <h3>
                Trying to study
              </h3>

              <p className="experience-situation">
                The same paragraph has been read several times.
              </p>

              <div className="experience-thought">
                💭 “I know I just read this. Why can't I
                hold onto it?”
              </div>

              <p>
                Difficulties with attention and working
                memory can make ordinary cognitive tasks
                surprisingly exhausting.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              1:30 PM
            </div>

            <div className="experience-content">

              <h3>
                A conversation becomes difficult
              </h3>

              <p className="experience-situation">
                Several people are speaking nearby.
              </p>

              <div className="experience-thought">
                💭 “There is too much happening. I can't
                follow what everyone is saying.”
              </div>

              <p>
                Organizing and filtering information can
                sometimes become difficult.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              7:00 PM
            </div>

            <div className="experience-content">

              <h3>
                Friends invite you out
              </h3>

              <p className="experience-situation">
                You care about them, but starting anything
                feels overwhelmingly difficult.
              </p>

              <div className="experience-thought">
                💭 “I want to respond... I just can't seem
                to make myself do it.”
              </div>

              <p>
                Reduced motivation can sometimes be mistaken
                for laziness or a lack of caring.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          IMPORTANT DISTINCTION
      ===================================================== */}

      <section className="article-section schizophrenia-reality-section">

        <div className="article-section-title">

          <span>
            05
          </span>

          <h2>
            When perception and reality don't agree
          </h2>

          <p>
            Psychotic symptoms can be deeply convincing
            and frightening to the person experiencing them.
          </p>

        </div>


        <div className="reality-experience-card">

          <div className="reality-side">

            <span className="reality-label">
              What others may see
            </span>

            <div className="reality-icon">
              🚪
            </div>

            <h3>
              An ordinary hallway
            </h3>

            <p>
              Nothing appears unusual to the people nearby.
            </p>

          </div>


          <div className="reality-divider">
            ≠
          </div>


          <div className="experience-side">

            <span className="reality-label">
              What the person may experience
            </span>

            <div className="reality-icon">
              👂
            </div>

            <h3>
              Something feels wrong
            </h3>

            <p>
              They may hear something or interpret the
              situation in a way that feels completely
              real and frightening to them.
            </p>

          </div>

        </div>


        <div className="reality-note">

          <span>
            💡
          </span>

          <p>
            Understanding this difference can help us respond
            with empathy. A person experiencing psychosis
            is not necessarily “making it up” or choosing
            to experience reality differently.
          </p>

        </div>

      </section>


      {/* =====================================================
          SCENARIO
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            06
          </span>

          <h2>
            What would you say?
          </h2>

          <p>
            Imagine someone you trust seems frightened by
            something that you do not perceive.
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
            “I think someone is watching me.
            I don't feel safe.”
          </p>


          <div className="scenario-options">

            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("agree")
              }
            >
              “You're right. Someone probably is watching you.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("support")
              }
            >
              “I don't see anyone watching us, but I can
              tell this feels frightening to you.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("dismiss")
              }
            >
              “That's ridiculous. You're imagining things.”
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
                    You can acknowledge the person's fear
                    without confirming something you do not
                    believe is happening. Calmness and
                    respect can help preserve trust.
                  </p>
                </>

              ) : scenarioAnswer === "agree" ? (

                <>
                  <strong>
                    Validate the emotion, not the belief
                  </strong>

                  <p>
                    Agreeing that the feared situation is
                    definitely real may reinforce the belief.
                    Instead, acknowledge that the person
                    feels frightened while remaining honest
                    about what you observe.
                  </p>
                </>

              ) : (

                <>
                  <strong>
                    Avoid ridicule or confrontation
                  </strong>

                  <p>
                    The experience may feel completely real
                    to them. Mocking or aggressively arguing
                    about it can increase distress and damage
                    trust.
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

          <span>
            07
          </span>

          <h2>
            Myth or reality?
          </h2>

          <p>
            Schizophrenia is surrounded by misconceptions.
            Tap each statement to reveal the answer.
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
            See the person, not the diagnosis
          </h2>

          <p>
            Schizophrenia is something a person experiences.
            It is not their entire identity.
          </p>

        </div>


        <div className="empathy-comparison">

          <div className="empathy-card avoid-response">

            <span className="empathy-label">
              Instead of
            </span>

            <p>
              “They're schizophrenic. Don't take anything
              they say seriously.”
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
              “They're a person living with schizophrenia.
              Let's listen and understand what they need.”
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
            Treatment and recovery
          </h2>

          <p>
            Treatment is individualized and usually combines
            several forms of professional and social support.
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
              Antipsychotic medications are commonly used
              to reduce psychotic symptoms. Treatment should
              be monitored by a qualified healthcare
              professional.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              💬
            </span>

            <h3>
              Psychological support
            </h3>

            <p>
              Psychosocial treatments can help people
              understand symptoms, develop coping skills,
              manage everyday challenges, and work toward
              personal goals.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              🤝
            </span>

            <h3>
              Family & community support
            </h3>

            <p>
              Family education, social support, rehabilitation,
              supported employment, and other services can
              play an important role in recovery.
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
            Support your everyday well-being
          </h2>

          <p>
            Manora's tools can support reflection and
            emotional well-being, but they do not replace
            professional treatment for schizophrenia.
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
          cannot diagnose schizophrenia. Symptoms that may
          involve psychosis require assessment by a qualified
          healthcare professional.
        </p>

      </div>


    </div>

  );
};

export default Schizophrenia;