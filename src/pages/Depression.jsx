import { useState } from "react";
import { Link } from "react-router-dom";

const Depression = () => {

  const [activeFeeling, setActiveFeeling] = useState("mind");
  const [revealedMyths, setRevealedMyths] = useState({});
  const [scenarioAnswer, setScenarioAnswer] = useState(null);


  // =========================================================
  // HOW DEPRESSION MAY SHOW UP
  // =========================================================

  const feelingData = {

    mind: [
      {
        icon: "🌫️",
        title: "Persistent low mood",
        text:
          "Some people experience ongoing sadness, emptiness, irritability, or a sense that things feel emotionally flat."
      },

      {
        icon: "🕯️",
        title: "Loss of interest",
        text:
          "Activities that once felt enjoyable may stop feeling rewarding or may require far more effort than before."
      },

      {
        icon: "🪞",
        title: "Harsh self-judgment",
        text:
          "Depression can involve feelings of worthlessness, guilt, hopelessness, or believing that you are a burden."
      },

      {
        icon: "🧩",
        title: "Difficulty thinking",
        text:
          "Concentration, memory, decision-making, and organizing thoughts may become more difficult."
      }
    ],

    body: [
      {
        icon: "🔋",
        title: "Low energy",
        text:
          "Ordinary activities such as getting dressed, cooking, studying, or replying to messages may feel exhausting."
      },

      {
        icon: "🌙",
        title: "Sleep changes",
        text:
          "Some people struggle to sleep, wake frequently, or wake too early, while others may sleep much more than usual."
      },

      {
        icon: "🍽️",
        title: "Appetite changes",
        text:
          "Depression may be associated with eating significantly more or less than usual and changes in weight."
      },

      {
        icon: "🐢",
        title: "Feeling slowed down",
        text:
          "Movement, speech, or thinking may feel unusually slow. Others may instead experience restlessness."
      }
    ],

    behaviour: [
      {
        icon: "🚪",
        title: "Withdrawing",
        text:
          "A person may stop replying to messages, avoid plans, or spend more time alone even when they care about others."
      },

      {
        icon: "📚",
        title: "Falling behind",
        text:
          "Tasks may accumulate because concentration, motivation, and energy have become harder to access."
      },

      {
        icon: "🎭",
        title: "Hiding how they feel",
        text:
          "Some people continue smiling, studying, working, or socializing while experiencing significant depression internally."
      },

      {
        icon: "🛏️",
        title: "Difficulty starting",
        text:
          "Even knowing what needs to be done does not always translate into having the energy or motivation to begin."
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
        "Depression is just feeling sad.",

      answer:
        "Myth",

      explanation:
        "Depression can affect mood, interest, energy, sleep, appetite, concentration, movement, self-worth, and everyday functioning. Some people describe emptiness or numbness rather than sadness."
    },

    {
      id: 2,

      statement:
        "Someone can laugh and still be experiencing depression.",

      answer:
        "Reality",

      explanation:
        "A person's outward behaviour does not always show what they are experiencing internally. Depression can exist even when someone appears functional or cheerful."
    },

    {
      id: 3,

      statement:
        "Telling someone to think positively is enough to overcome depression.",

      answer:
        "Myth",

      explanation:
        "Depression is a health condition, not simply a negative attitude. Support can help, but persistent symptoms may require professional treatment."
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

    <div className="interactive-article-page depression-article">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="article-hero depression-hero">

        <div className="article-hero-content">

          <span className="article-category">
            Mental Health Guide
          </span>

          <h1>
            Understanding Depression
          </h1>

          <p className="article-hero-subtitle">
            Depression can make the world feel quieter,
            heavier, and harder to engage with — even when
            nothing appears different from the outside.
          </p>

          <p className="article-reading-time">
            🕒 About 7 minutes · Interactive guide
          </p>

        </div>


        <div className="article-hero-visual">

          <div className="depression-visual">

            <span className="depression-thought depression-thought-one">
              “I don't have the energy.”
            </span>

            <span className="depression-thought depression-thought-two">
              “Why doesn't anything feel enjoyable?”
            </span>

            <span className="depression-thought depression-thought-three">
              “I'll reply later.”
            </span>

            <div className="depression-center">
              🌧️
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
              Depression is more than having a bad day
            </h2>

            <p>
              Everyone experiences sadness at times.
              Depression is different because symptoms can
              persist and begin affecting how a person feels,
              thinks, sleeps, works, studies, connects with
              others, and manages everyday life.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT CAN FEEL
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            02
          </span>

          <h2>
            What can depression feel like?
          </h2>

          <p>
            Depression can affect far more than mood.
            Explore how it may appear in thoughts, the body,
            and everyday behaviour.
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
            🫀 Body
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
          EXPERIENCE TIMELINE
      ===================================================== */}

      <section className="article-section experience-section">

        <div className="article-section-title">

          <span>
            03
          </span>

          <h2>
            Step into a difficult day
          </h2>

          <p>
            This is one possible experience of depression.
            No single story represents everyone who lives
            with it.
          </p>

        </div>


        <div className="experience-timeline">


          <div className="experience-event">

            <div className="experience-time">
              8:00 AM
            </div>

            <div className="experience-content">

              <h3>
                The alarm rings
              </h3>

              <p className="experience-situation">
                There is a class at 9 AM.
              </p>

              <div className="experience-thought">
                💭 “I know I should get up. Why does getting
                out of bed feel this difficult?”
              </div>

              <p>
                What appears to be laziness from the outside
                may sometimes be severe fatigue, low
                motivation, or difficulty initiating tasks.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              2:00 PM
            </div>

            <div className="experience-content">

              <h3>
                Friends send a message
              </h3>

              <p className="experience-situation">
                They invite you to meet them.
              </p>

              <div className="experience-thought">
                💭 “I care about them, but I don't have the
                energy to talk to anyone.”
              </div>

              <p>
                Withdrawal does not necessarily mean that a
                person has stopped caring about friends or
                relationships.
              </p>

            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              10:30 PM
            </div>

            <div className="experience-content">

              <h3>
                The day ends
              </h3>

              <p className="experience-situation">
                Several tasks remain unfinished.
              </p>

              <div className="experience-thought">
                💭 “Everyone else seems to manage life.
                Why can't I?”
              </div>

              <p>
                Falling behind can create guilt and
                self-criticism, which may make beginning the
                next task feel even harder.
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
            04
          </span>

          <h2>
            What would you say?
          </h2>

          <p>
            Imagine a friend has stopped joining activities
            and tells you that everything feels exhausting.
          </p>

        </div>


        <div className="scenario-card">

          <div className="scenario-icon">
            💬
          </div>

          <h3>
            Your friend says:
          </h3>

          <p>
            “I don't really feel like doing anything anymore.
            Even simple things feel tiring.”
          </p>


          <div className="scenario-options">

            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("dismiss")
              }
            >
              “You need to stop being negative.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("support")
              }
            >
              “That sounds really difficult. I'm here with you.”
            </button>


            <button
              type="button"
              onClick={() =>
                setScenarioAnswer("pressure")
              }
            >
              “You just need to force yourself to go out.”
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
                    This acknowledges what the person is
                    experiencing without judging them or
                    immediately demanding that they change
                    how they feel.
                  </p>
                </>

              ) : (

                <>
                  <strong>
                    Try another perspective
                  </strong>

                  <p>
                    Depression can affect motivation,
                    energy, concentration, and the ability
                    to experience pleasure. What looks simple
                    from the outside may feel genuinely
                    difficult to the person experiencing it.
                  </p>
                </>

              )}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          FOR PEOPLE WHO DON'T HAVE DEPRESSION
      ===================================================== */}

      <section className="article-section depression-weight-section">

        <div className="article-section-title">

          <span>
            05
          </span>

          <h2>
            Imagine carrying invisible weight
          </h2>

          <p>
            One way to understand depression is to imagine
            ordinary activities requiring much more effort
            than they normally would.
          </p>

        </div>


        <div className="effort-grid">


          <div className="effort-card">

            <span>
              🚿
            </span>

            <div>

              <h3>
                Taking a shower
              </h3>

              <p>
                Usually automatic.
              </p>

            </div>

            <div className="effort-indicator">
              Feels harder
            </div>

          </div>


          <div className="effort-card">

            <span>
              📱
            </span>

            <div>

              <h3>
                Replying to a friend
              </h3>

              <p>
                A message may sit unanswered for hours
                or days.
              </p>

            </div>

            <div className="effort-indicator">
              Feels harder
            </div>

          </div>


          <div className="effort-card">

            <span>
              📚
            </span>

            <div>

              <h3>
                Studying
              </h3>

              <p>
                Reading the same paragraph repeatedly
                may still not make it stick.
              </p>

            </div>

            <div className="effort-indicator">
              Feels harder
            </div>

          </div>


          <div className="effort-card">

            <span>
              🎮
            </span>

            <div>

              <h3>
                Doing something enjoyable
              </h3>

              <p>
                Something once loved may suddenly feel
                empty or uninteresting.
              </p>

            </div>

            <div className="effort-indicator">
              Feels different
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TYPES / PRESENTATIONS
      ===================================================== */}

      <section className="article-section">

        <div className="article-section-title">

          <span>
            06
          </span>

          <h2>
            Depression can take different forms
          </h2>

        </div>


        <div className="anxiety-types-grid">


          <div className="anxiety-type-card">

            <span>
              🌧️
            </span>

            <h3>
              Major Depression
            </h3>

            <p>
              Significant depressive symptoms that persist
              and interfere with everyday activities.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              🕰️
            </span>

            <h3>
              Persistent Depressive Disorder
            </h3>

            <p>
              Depression symptoms that are typically less
              severe but continue for a much longer period.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              ❄️
            </span>

            <h3>
              Seasonal Affective Disorder
            </h3>

            <p>
              Depression that follows a recurring seasonal
              pattern, commonly beginning during particular
              times of the year.
            </p>

          </div>


          <div className="anxiety-type-card">

            <span>
              🤱
            </span>

            <h3>
              Perinatal Depression
            </h3>

            <p>
              Depression that can occur during pregnancy
              or following childbirth.
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
          SUPPORTING SOMEONE
      ===================================================== */}

      <section className="article-section empathy-section">

        <div className="article-section-title">

          <span>
            08
          </span>

          <h2>
            Supporting someone with depression
          </h2>

          <p>
            You don't need to solve everything.
            Being present and responding without judgment
            can matter.
          </p>

        </div>


        <div className="empathy-comparison">

          <div className="empathy-card avoid-response">

            <span className="empathy-label">
              Instead of
            </span>

            <p>
              “You have so much to be grateful for.
              Just try to be positive.”
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
              “You don't have to pretend you're okay with me.
              I'm here, and we can take things one step at a
              time.”
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
            09
          </span>

          <h2>
            Depression can be treated
          </h2>

          <p>
            Treatment is individual. A qualified healthcare
            professional can help determine what approach
            is appropriate.
          </p>

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
              Evidence-based forms of psychotherapy can help
              people understand patterns in thoughts,
              emotions, relationships, and behaviour.
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
              Antidepressant medication may be recommended
              by a healthcare professional depending on the
              person's symptoms and circumstances.
            </p>

          </div>


          <div className="support-option-card">

            <span>
              🌱
            </span>

            <h3>
              Everyday support
            </h3>

            <p>
              Sleep, movement, routines, social connection,
              and other healthy habits may complement
              professional treatment.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          IMPORTANT SAFETY SECTION
      ===================================================== */}

      <section className="article-section depression-safety-section">

        <div className="safety-icon">
          🤝
        </div>

        <div>

          <h2>
            When extra support is especially important
          </h2>

          <p>
            Depression can sometimes involve thoughts about
            death, self-harm, or suicide. These thoughts
            should be taken seriously.
          </p>

          <p>
            If you or someone else may be in immediate danger,
            seek urgent help from local emergency services or
            a trusted person who can stay with you while you
            access professional support.
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
            Take a small next step
          </h2>

          <p>
            These tools can help with reflection and
            everyday emotional awareness.
          </p>

        </div>


        <div className="article-tool-links">

          <Link to="/depression-quiz">

            📝 Depression Self-Check

            <span>
              →
            </span>

          </Link>


          <Link to="/daily-journal">

            📖 Write in Journal

            <span>
              →
            </span>

          </Link>


          <Link to="/mood-tracker">

            😊 Record Your Mood

            <span>
              →
            </span>

          </Link>


          <Link to="/relax">

            🌿 Take a Quiet Moment

            <span>
              →
            </span>

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
          and cannot diagnose depression. Persistent or
          worsening symptoms should be discussed with a
          qualified mental health professional.
        </p>

      </div>


    </div>
  );
};

export default Depression;