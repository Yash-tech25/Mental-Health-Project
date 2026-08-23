import { useState } from "react";
import { Link } from "react-router-dom";

const Ocd = () => {

  const [activeFeeling, setActiveFeeling] = useState("obsessions");
  const [revealedMyths, setRevealedMyths] = useState({});
  const [scenarioAnswer, setScenarioAnswer] = useState(null);


  // =========================================================
  // OCD EXPERIENCE
  // =========================================================

  const feelingData = {

    obsessions: [
      {
        icon: "🦠",
        title: "Contamination fears",
        text:
          "Some people experience persistent fears about germs, illness, contamination, or accidentally spreading something harmful."
      },

      {
        icon: "⚠️",
        title: "Fear of causing harm",
        text:
          "Intrusive thoughts may involve worries about accidentally hurting someone or being responsible for something terrible happening."
      },

      {
        icon: "📐",
        title: "Need for symmetry",
        text:
          "Some people experience intense discomfort when objects, actions, numbers, or sensations do not feel 'just right.'"
      },

      {
        icon: "💭",
        title: "Unwanted intrusive thoughts",
        text:
          "OCD can involve distressing thoughts, images, or urges that feel unwanted and inconsistent with the person's values."
      }
    ],

    compulsions: [
      {
        icon: "🧼",
        title: "Washing or cleaning",
        text:
          "Repeated washing or cleaning may be used to reduce fear about contamination."
      },

      {
        icon: "🔐",
        title: "Repeated checking",
        text:
          "A person may repeatedly check locks, appliances, messages, or other things even after already checking them."
      },

      {
        icon: "🔢",
        title: "Counting or repeating",
        text:
          "Certain actions, phrases, numbers, or routines may be repeated until they feel safe or complete."
      },

      {
        icon: "🧠",
        title: "Mental rituals",
        text:
          "Compulsions are not always visible. Some involve silently reviewing memories, repeating words, or mentally checking whether something is safe."
      }
    ],

    impact: [
      {
        icon: "⏳",
        title: "Losing time",
        text:
          "Obsessions and rituals can consume significant time and make everyday activities take much longer."
      },

      {
        icon: "😣",
        title: "Constant uncertainty",
        text:
          "OCD often creates a strong desire for certainty, even when complete certainty is impossible."
      },

      {
        icon: "🚪",
        title: "Avoidance",
        text:
          "People may avoid situations that trigger obsessions or make compulsions harder to resist."
      },

      {
        icon: "🤐",
        title: "Keeping it hidden",
        text:
          "Some people hide symptoms because intrusive thoughts can feel embarrassing or difficult to explain."
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
        "OCD just means being very clean or organized.",
      answer:
        "Myth",
      explanation:
        "OCD can involve many different obsessions and compulsions. Cleanliness and organization are only some possible themes."
    },

    {
      id: 2,
      statement:
        "Intrusive thoughts do not necessarily reflect what a person wants to do.",
      answer:
        "Reality",
      explanation:
        "OCD thoughts are often unwanted and distressing precisely because they conflict with the person's values or intentions."
    },

    {
      id: 3,
      statement:
        "Compulsions can reduce anxiety temporarily while keeping the OCD cycle going.",
      answer:
        "Reality",
      explanation:
        "Performing a ritual may bring short-term relief, but that relief can reinforce the urge to repeat the ritual the next time anxiety appears."
    }
  ];


  const toggleMyth = (id) => {

    setRevealedMyths((previous) => ({
      ...previous,
      [id]: !previous[id]
    }));

  };


  return (

    <div className="interactive-article-page ocd-article">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="article-hero ocd-hero">

        <div className="article-hero-content">

          <span className="article-category">
            Mental Health Guide
          </span>

          <h1>
            Understanding OCD
          </h1>

          <p className="article-hero-subtitle">
            OCD can feel like being trapped between an
            unwanted thought and an overwhelming need to
            do something that makes the fear feel safer.
          </p>

          <p className="article-reading-time">
            🕒 About 7 minutes · Interactive guide
          </p>

        </div>


        <div className="article-hero-visual">

          <div className="ocd-loop-visual">

            <div className="ocd-loop-center">
              🔁
            </div>

            <span className="ocd-loop-step step-one">
              Obsession
            </span>

            <span className="ocd-loop-step step-two">
              Anxiety
            </span>

            <span className="ocd-loop-step step-three">
              Compulsion
            </span>

            <span className="ocd-loop-step step-four">
              Temporary relief
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-heading">

          <span>
            01
          </span>

          <div>

            <h2>
              OCD is more than habits or preferences
            </h2>

            <p>
              Obsessive-compulsive disorder involves
              recurring unwanted thoughts, images, or urges
              called obsessions and repetitive behaviours
              or mental acts called compulsions.
            </p>

            <p>
              These symptoms can cause significant distress
              and interfere with everyday life.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          OBSSESSIONS / COMPULSIONS / IMPACT
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            02
          </span>

          <h2>
            What can OCD look like?
          </h2>

          <p>
            Explore the difference between obsessions,
            compulsions, and the impact they can have on
            everyday life.
          </p>

        </div>


        <div className="feeling-tabs">

          <button
            type="button"
            className={
              activeFeeling === "obsessions"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveFeeling("obsessions")
            }
          >
            💭 Obsessions
          </button>


          <button
            type="button"
            className={
              activeFeeling === "compulsions"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveFeeling("compulsions")
            }
          >
            🔁 Compulsions
          </button>


          <button
            type="button"
            className={
              activeFeeling === "impact"
                ? "feeling-tab active"
                : "feeling-tab"
            }
            onClick={() =>
              setActiveFeeling("impact")
            }
          >
            🧩 Daily Impact
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
          OCD LOOP
      ===================================================== */}

      <section className="article-section ocd-cycle-section">

        <div className="article-section-title">

          <span>
            03
          </span>

          <h2>
            Why can OCD feel like a loop?
          </h2>

          <p>
            Compulsions often bring temporary relief,
            which can make the urge to perform them stronger
            the next time an obsession appears.
          </p>

        </div>


        <div className="ocd-cycle">

          <div className="ocd-cycle-card">
            <span>💭</span>

            <h3>
              Obsession
            </h3>

            <p>
              “What if I left the door unlocked?”
            </p>
          </div>


          <div className="ocd-cycle-arrow">
            →
          </div>


          <div className="ocd-cycle-card">
            <span>😰</span>

            <h3>
              Distress
            </h3>

            <p>
              The uncertainty starts to feel unbearable.
            </p>
          </div>


          <div className="ocd-cycle-arrow">
            →
          </div>


          <div className="ocd-cycle-card">
            <span>🔐</span>

            <h3>
              Compulsion
            </h3>

            <p>
              Check the lock again.
            </p>
          </div>


          <div className="ocd-cycle-arrow">
            →
          </div>


          <div className="ocd-cycle-card">
            <span>😌</span>

            <h3>
              Relief
            </h3>

            <p>
              Anxiety drops — but only temporarily.
            </p>
          </div>

        </div>


        <div className="ocd-cycle-note">
          🔁 The next intrusive thought can restart the cycle.
        </div>

      </section>


      {/* =====================================================
          DAY EXPERIENCE
      ===================================================== */}

      <section className="article-section experience-section">

        <div className="article-section-title">

          <span>
            04
          </span>

          <h2>
            Step into an OCD day
          </h2>

          <p>
            This is only one possible experience.
            OCD can involve many different themes and rituals.
          </p>

        </div>


        <div className="experience-timeline">


          <div className="experience-event">

            <div className="experience-time">
              8:10 AM
            </div>

            <div className="experience-content">

              <h3>
                Leaving home
              </h3>

              <p className="experience-situation">
                You already locked the door.
              </p>

              <div className="experience-thought">
                💭 “But what if I didn't actually lock it?”
              </div>

              <p>
                Even remembering that the door was locked may
                not remove the sense of doubt.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              8:18 AM
            </div>

            <div className="experience-content">

              <h3>
                Walking away
              </h3>

              <p className="experience-situation">
                You have already checked several times.
              </p>

              <div className="experience-thought">
                💭 “One more check and then I'll know for sure.”
              </div>

              <p>
                Checking can briefly reduce anxiety,
                but the uncertainty may quickly return.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              8:35 AM
            </div>

            <div className="experience-content">

              <h3>
                Arriving late
              </h3>

              <p className="experience-situation">
                The repeated checking has taken twenty minutes.
              </p>

              <div className="experience-thought">
                💭 “Why can't I just trust myself?”
              </div>

              <p>
                OCD can be exhausting because the person may
                understand that the ritual is excessive while
                still feeling a powerful urge to perform it.
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
            Imagine someone tells you they have checked the
            door several times but still feel unsure.
          </p>

        </div>


        <div className="scenario-card">

          <div className="scenario-icon">
            🔐
          </div>

          <h3>
            They say:
          </h3>

          <p>
            “I know I checked it, but I still feel like
            something terrible might happen.”
          </p>


          <div className="scenario-options">

            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("dismiss")
              }
            >
              “That's ridiculous. You already checked.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("support")
              }
            >
              “I can see this is really distressing for you.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("reassure")
              }
            >
              “I'll check it for you every time.”
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
                    This validates the person's distress
                    without mocking them or automatically
                    participating in the compulsion.
                  </p>
                </>

              ) : scenarioAnswer === "reassure" ? (

                <>
                  <strong>
                    Support without reinforcing the cycle
                  </strong>

                  <p>
                    Constant reassurance can sometimes become
                    part of the OCD cycle. Compassion and
                    appropriate professional guidance can be
                    more helpful than repeatedly confirming
                    the feared situation.
                  </p>
                </>

              ) : (

                <>
                  <strong>
                    Try another perspective
                  </strong>

                  <p>
                    The person may already know logically that
                    the fear seems excessive. The difficulty
                    lies in the intense uncertainty and
                    distress, not simply a lack of common sense.
                  </p>
                </>

              )}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          COMMON THEMES
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            06
          </span>

          <h2>
            OCD is not only about cleanliness
          </h2>

          <p>
            Obsessions and compulsions can involve many
            different themes.
          </p>

        </div>


        <div className="anxiety-types-grid">


          <div className="anxiety-type-card">

            <span>
              🦠
            </span>

            <h3>
              Contamination
            </h3>

            <p>
              Fear involving germs, illness, chemicals,
              dirt, or contamination.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              🔐
            </span>

            <h3>
              Checking
            </h3>

            <p>
              Repeatedly checking doors, appliances,
              messages, memories, or other situations.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              📐
            </span>

            <h3>
              Symmetry and “just right”
            </h3>

            <p>
              Strong discomfort when things do not feel
              symmetrical, complete, or exactly right.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              💭
            </span>

            <h3>
              Intrusive thoughts
            </h3>

            <p>
              Distressing unwanted thoughts or images
              involving themes that may feel frightening
              or deeply inconsistent with personal values.
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
            Supporting someone with OCD
          </h2>

          <p>
            Understanding the difference between supporting
            the person and participating in the OCD cycle
            can be important.
          </p>

        </div>


        <div className="empathy-comparison">

          <div className="empathy-card avoid-response">

            <span className="empathy-label">
              Instead of
            </span>

            <p>
              “You know that doesn't make sense.
              Just stop doing it.”
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
              “I know this feels really difficult.
              How can I support you without making
              the OCD stronger?”
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
            OCD can be treated
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
              ERP therapy
            </h3>

            <p>
              Exposure and Response Prevention is a
              specialized form of CBT. People gradually
              face triggers while practising not performing
              the usual compulsion.
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
              SSRIs are commonly used medications for OCD
              and may be recommended alone or alongside
              psychotherapy.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              🤝
            </span>

            <h3>
              Specialist support
            </h3>

            <p>
              Working with a clinician who understands OCD
              and ERP can help ensure that treatment targets
              both obsessions and compulsions appropriately.
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
            Take a small next step
          </h2>

          <p>
            These tools can support reflection and awareness,
            but they do not replace professional treatment.
          </p>

        </div>


        <div className="article-tool-links">

          <Link to="/ocd-quiz">
            📝 OCD Self-Check
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


          <Link to="/relax">
            🌿 Take a Quiet Moment
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
          and cannot diagnose OCD. If intrusive thoughts,
          rituals, or repeated behaviours are causing
          distress or interfering with everyday life,
          consider speaking with a qualified mental health
          professional.
        </p>

      </div>


    </div>
  );
};

export default Ocd;