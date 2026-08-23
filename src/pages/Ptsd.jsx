import { useState } from "react";
import { Link } from "react-router-dom";

const Ptsd = () => {

  const [activeSymptoms, setActiveSymptoms] = useState("intrusion");
  const [revealedMyths, setRevealedMyths] = useState({});
  const [scenarioAnswer, setScenarioAnswer] = useState(null);


  // =========================================================
  // PTSD SYMPTOM GROUPS
  // =========================================================

  const symptomData = {

    intrusion: [
      {
        icon: "💭",
        title: "Intrusive memories",
        text:
          "Memories of the traumatic event may appear unexpectedly and feel difficult to control."
      },

      {
        icon: "🌙",
        title: "Nightmares",
        text:
          "Sleep may be disrupted by distressing dreams related to the trauma or its emotional themes."
      },

      {
        icon: "⚡",
        title: "Flashbacks",
        text:
          "A person may briefly feel as though the traumatic event is happening again rather than simply being remembered."
      },

      {
        icon: "💓",
        title: "Strong reactions to reminders",
        text:
          "Sounds, smells, places, dates, images, or situations connected to the trauma may trigger intense emotional or physical reactions."
      }
    ],

    avoidance: [
      {
        icon: "🚪",
        title: "Avoiding places",
        text:
          "A person may avoid locations or situations that remind them of what happened."
      },

      {
        icon: "💬",
        title: "Avoiding conversations",
        text:
          "Talking about the traumatic experience may feel too overwhelming or distressing."
      },

      {
        icon: "🧠",
        title: "Avoiding memories",
        text:
          "Someone may actively try not to think about the event or anything associated with it."
      },

      {
        icon: "🛣️",
        title: "Changing routines",
        text:
          "Daily habits, travel routes, social activities, or other routines may change to reduce contact with reminders."
      }
    ],

    mood: [
      {
        icon: "🌫️",
        title: "Feeling disconnected",
        text:
          "A person may feel emotionally distant from others or disconnected from activities and relationships."
      },

      {
        icon: "🪞",
        title: "Negative beliefs",
        text:
          "Trauma can affect beliefs about oneself, other people, or the world, such as feeling that nowhere is safe."
      },

      {
        icon: "😔",
        title: "Guilt or shame",
        text:
          "Some people blame themselves for what happened even when they were not responsible."
      },

      {
        icon: "🕯️",
        title: "Difficulty feeling positive emotions",
        text:
          "Joy, closeness, or interest may become harder to experience."
      }
    ],

    arousal: [
      {
        icon: "👀",
        title: "Hypervigilance",
        text:
          "The person may constantly scan their surroundings for possible danger."
      },

      {
        icon: "💥",
        title: "Easily startled",
        text:
          "Sudden sounds or movements may trigger an unusually strong startle response."
      },

      {
        icon: "🌙",
        title: "Sleep difficulties",
        text:
          "Falling asleep or staying asleep may become difficult because the body remains alert."
      },

      {
        icon: "🎯",
        title: "Difficulty concentrating",
        text:
          "When part of the mind is monitoring for danger, focusing on everyday tasks may become harder."
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
        "Only soldiers or people who experience war can develop PTSD.",

      answer:
        "Myth",

      explanation:
        "PTSD can develop after many kinds of traumatic experiences, including violence, assault, serious accidents, disasters, and other events involving actual or threatened death, serious injury, or sexual violence."
    },

    {
      id: 2,

      statement:
        "A reminder of trauma can cause a very real physical stress response.",

      answer:
        "Reality",

      explanation:
        "Trauma reminders can activate the body's threat response, causing symptoms such as a racing heart, sweating, tension, or intense fear even when the present environment is safe."
    },

    {
      id: 3,

      statement:
        "Someone with PTSD should simply avoid every reminder of the trauma.",

      answer:
        "Myth",

      explanation:
        "Avoidance may bring temporary relief but can also keep trauma-related fear strong. Evidence-based treatment can help people process trauma safely with professional support."
    }
  ];


  const toggleMyth = (id) => {

    setRevealedMyths((previous) => ({
      ...previous,
      [id]: !previous[id]
    }));

  };


  return (

    <div className="interactive-article-page ptsd-article">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="article-hero ptsd-hero">

        <div className="article-hero-content">

          <span className="article-category">
            Mental Health Guide
          </span>

          <h1>
            Understanding PTSD
          </h1>

          <p className="article-hero-subtitle">
            Sometimes the danger is over, but the mind and
            body continue responding as though they still
            need to protect you.
          </p>

          <p className="article-reading-time">
            🕒 About 8 minutes · Interactive guide
          </p>

        </div>


        <div className="article-hero-visual">

          <div className="ptsd-alert-visual">

            <div className="ptsd-safe-circle">
              NOW
            </div>

            <div className="ptsd-alert-ring ring-one"></div>
            <div className="ptsd-alert-ring ring-two"></div>

            <span className="ptsd-trigger trigger-one">
              🔊 sound
            </span>

            <span className="ptsd-trigger trigger-two">
              📍 place
            </span>

            <span className="ptsd-trigger trigger-three">
              👃 smell
            </span>

            <span className="ptsd-trigger trigger-four">
              💭 memory
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
              When the past still feels present
            </h2>

            <p>
              Post-traumatic stress disorder can develop
              after experiencing or witnessing a traumatic
              event.
            </p>

            <p>
              After trauma, some stress reactions are normal.
              PTSD involves symptoms that persist and begin
              causing significant distress or difficulty in
              everyday life.
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
            PTSD can show up in different ways
          </h2>

          <p>
            Explore four major areas that may be affected.
          </p>

        </div>


        <div className="feeling-tabs">

          <button
            type="button"
            className={
              activeSymptoms === "intrusion"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("intrusion")
            }
          >
            ⚡ Intrusion
          </button>


          <button
            type="button"
            className={
              activeSymptoms === "avoidance"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("avoidance")
            }
          >
            🚪 Avoidance
          </button>


          <button
            type="button"
            className={
              activeSymptoms === "mood"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("mood")
            }
          >
            🌫️ Mood & Thoughts
          </button>


          <button
            type="button"
            className={
              activeSymptoms === "arousal"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveSymptoms("arousal")
            }
          >
            👀 Alertness
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
          BODY ALARM
      ===================================================== */}

      <section className="article-section ptsd-alarm-section">

        <div className="article-section-title">

          <span>
            03
          </span>

          <h2>
            Why can a reminder feel dangerous?
          </h2>

          <p>
            A trauma reminder can activate the body's threat
            response even when the current situation is safe.
          </p>

        </div>


        <div className="ptsd-alarm-flow">


          <div className="ptsd-alarm-card">

            <span>
              🔊
            </span>

            <h3>
              Trigger
            </h3>

            <p>
              A loud noise resembles something connected
              to the traumatic event.
            </p>

          </div>


          <div className="ptsd-flow-arrow">
            →
          </div>


          <div className="ptsd-alarm-card">

            <span>
              🧠
            </span>

            <h3>
              Brain detects threat
            </h3>

            <p>
              The reminder is associated with past danger.
            </p>

          </div>


          <div className="ptsd-flow-arrow">
            →
          </div>


          <div className="ptsd-alarm-card">

            <span>
              💓
            </span>

            <h3>
              Body reacts
            </h3>

            <p>
              Heart rate, breathing, tension, or fear
              may suddenly increase.
            </p>

          </div>


          <div className="ptsd-flow-arrow">
            →
          </div>


          <div className="ptsd-alarm-card">

            <span>
              👀
            </span>

            <h3>
              Search for danger
            </h3>

            <p>
              The person may become intensely alert even
              though the present situation is safe.
            </p>

          </div>

        </div>


        <div className="ptsd-alarm-note">

          <span>
            💡
          </span>

          <p>
            The reaction is not simply someone “thinking
            too much.” The body can respond automatically
            to reminders associated with trauma.
          </p>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE TIMELINE
      ===================================================== */}

      <section className="article-section experience-section">

        <div className="article-section-title">

          <span>
            04
          </span>

          <h2>
            Step into an ordinary moment
          </h2>

          <p>
            This is only one possible experience.
            PTSD can look very different between people.
          </p>

        </div>


        <div className="experience-timeline">


          <div className="experience-event">

            <div className="experience-time">
              5:15 PM
            </div>

            <div className="experience-content">

              <h3>
                Walking home
              </h3>

              <p className="experience-situation">
                A vehicle suddenly makes a loud sound.
              </p>

              <div className="experience-thought">
                💭 “Get down. Something is wrong.”
              </div>

              <p>
                The body may react before the person has
                time to consciously recognize that they
                are currently safe.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              5:16 PM
            </div>

            <div className="experience-content">

              <h3>
                Looking around
              </h3>

              <p className="experience-situation">
                Everyone else keeps walking normally.
              </p>

              <div className="experience-thought">
                💭 “Why is nobody else reacting?”
              </div>

              <p>
                A trauma response can feel confusing when
                the person's internal alarm is much stronger
                than what others around them seem to feel.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              Next day
            </div>

            <div className="experience-content">

              <h3>
                Choosing another route
              </h3>

              <p className="experience-situation">
                The original route now feels unsafe.
              </p>

              <div className="experience-thought">
                💭 “I'll go the long way so I don't have
                to pass there again.”
              </div>

              <p>
                Avoidance can gradually change routines
                and reduce where someone feels comfortable
                going.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MEMORY VS FLASHBACK
      ===================================================== */}

      <section className="article-section ptsd-memory-section">

        <div className="article-section-title">

          <span>
            05
          </span>

          <h2>
            Remembering vs reliving
          </h2>

          <p>
            A traumatic memory and a flashback can feel
            very different.
          </p>

        </div>


        <div className="ptsd-memory-comparison">


          <div className="ptsd-memory-card">

            <span className="ptsd-memory-label">
              Remembering
            </span>

            <div className="ptsd-memory-icon">
              🧠
            </div>

            <h3>
              “That happened to me.”
            </h3>

            <p>
              The person recognizes the event as something
              that happened in the past.
            </p>

          </div>


          <div className="ptsd-memory-divider">
            VS
          </div>


          <div className="ptsd-memory-card flashback-card">

            <span className="ptsd-memory-label">
              Flashback
            </span>

            <div className="ptsd-memory-icon">
              ⚡
            </div>

            <h3>
              “It feels like it's happening now.”
            </h3>

            <p>
              During a flashback, aspects of the traumatic
              experience may feel intensely present again.
            </p>

          </div>

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
            Imagine someone suddenly becomes frightened
            after hearing a loud sound.
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
            “I know we're safe, but my body doesn't feel
            like we're safe.”
          </p>


          <div className="scenario-options">

            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("dismiss")
              }
            >
              “Nothing happened. Just forget about it.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("support")
              }
            >
              “We're here right now. You're safe with me.
              We can take this slowly.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("question")
              }
            >
              “Tell me exactly what happened during the trauma.”
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
                    Calmly orienting the person toward the
                    present moment while respecting their
                    distress can feel more supportive than
                    dismissing what they are experiencing.
                  </p>
                </>

              ) : scenarioAnswer === "question" ? (

                <>
                  <strong>
                    Don't force the story
                  </strong>

                  <p>
                    Someone does not need to describe their
                    traumatic experience in detail for you
                    to support them. Let them decide what
                    they want to share.
                  </p>
                </>

              ) : (

                <>
                  <strong>
                    Try another perspective
                  </strong>

                  <p>
                    The current environment may be safe,
                    but their nervous system may still be
                    reacting strongly. Dismissing the
                    response does not make that reaction
                    disappear.
                  </p>
                </>

              )}

            </div>

          )}

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
            Supporting someone with PTSD
          </h2>

          <p>
            Safety, patience, choice, and respect can matter
            more than forcing someone to explain their trauma.
          </p>

        </div>


        <div className="empathy-comparison">

          <div className="empathy-card avoid-response">

            <span className="empathy-label">
              Instead of
            </span>

            <p>
              “It happened a long time ago.
              You need to move on.”
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
              “You don't have to explain everything.
              I'm here, and you can tell me what would
              help you feel safer right now.”
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
            PTSD can be treated
          </h2>

          <p>
            Treatment should be individualized and guided
            by a qualified mental health professional.
          </p>

        </div>


        <div className="support-option-grid">


          <div className="support-option-card">

            <span>
              🧠
            </span>

            <h3>
              Trauma-focused psychotherapy
            </h3>

            <p>
              Evidence-based therapies can help people
              process traumatic experiences and gradually
              reduce trauma-related fear and avoidance.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              👁️
            </span>

            <h3>
              EMDR
            </h3>

            <p>
              Eye Movement Desensitization and Reprocessing
              is a structured trauma-focused therapy used
              in the treatment of PTSD.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              🩺
            </span>

            <h3>
              Medication
            </h3>

            <p>
              Some antidepressant medications may be used
              to help manage PTSD symptoms under the care
              of a qualified healthcare professional.
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
            Return attention to the present
          </h2>

          <p>
            These Manora tools can support reflection and
            relaxation, but they do not replace trauma-focused
            professional treatment.
          </p>

        </div>


        <div className="article-tool-links">

          <Link to="/ptsd-quiz">
            📝 PTSD Self-Check
            <span>→</span>
          </Link>


          <Link to="/relax">
            🌬️ Grounding & Relaxation
            <span>→</span>
          </Link>


          <Link to="/daily-journal">
            📖 Open Journal
            <span>→</span>
          </Link>


          <Link to="/mood-tracker">
            😊 Record Your Mood
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
          This guide is for education and self-awareness
          and cannot diagnose PTSD. Trauma-related symptoms
          that persist, worsen, or interfere with everyday
          life should be discussed with a qualified mental
          health professional.
        </p>

      </div>


    </div>

  );
};

export default Ptsd;