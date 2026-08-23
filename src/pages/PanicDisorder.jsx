import { useState } from "react";
import { Link } from "react-router-dom";

const PanicDisorder = () => {
  const [activeFeeling, setActiveFeeling] = useState("body");
  const [revealedMyths, setRevealedMyths] = useState({});
  const [scenarioAnswer, setScenarioAnswer] = useState(null);

  const feelingData = {
    body: [
      {
        icon: "💓",
        title: "Racing heartbeat",
        text:
          "A panic attack can make the heart suddenly pound or race, which may feel frightening even when there is no immediate danger."
      },
      {
        icon: "🌬️",
        title: "Breathlessness",
        text:
          "Breathing may feel fast, shallow, or difficult, sometimes creating the sensation that enough air is not getting in."
      },
      {
        icon: "🫨",
        title: "Shaking or trembling",
        text:
          "The body's alarm response can cause trembling, sweating, chills, or sudden sensations of heat."
      },
      {
        icon: "🌀",
        title: "Dizziness",
        text:
          "Some people feel light-headed, unsteady, disconnected, or as though they might faint."
      }
    ],

    mind: [
      {
        icon: "⚠️",
        title: "Sense of danger",
        text:
          "The brain may suddenly signal that something terrible is happening, even when the surroundings appear safe."
      },
      {
        icon: "❤️‍🩹",
        title: "Fear of a medical emergency",
        text:
          "Strong physical symptoms can lead someone to fear that they are having a heart attack, fainting, or losing control."
      },
      {
        icon: "🔁",
        title: "Fear of another attack",
        text:
          "After experiencing panic, a person may begin worrying about when the next attack will happen."
      },
      {
        icon: "🌫️",
        title: "Feeling unreal",
        text:
          "Some people describe feeling detached from themselves or as though the world around them does not feel completely real."
      }
    ],

    behaviour: [
      {
        icon: "🚪",
        title: "Avoiding places",
        text:
          "A person may avoid locations where a previous panic attack happened because they fear another one occurring there."
      },
      {
        icon: "🚌",
        title: "Changing routines",
        text:
          "Travel, crowded places, exercise, or being far from home may become difficult if they are associated with panic."
      },
      {
        icon: "👀",
        title: "Monitoring the body",
        text:
          "Someone may repeatedly check their heartbeat, breathing, dizziness, or other sensations for signs that another attack is beginning."
      },
      {
        icon: "🤝",
        title: "Needing a safe person",
        text:
          "Some people feel safer only when accompanied by someone they trust, especially in situations associated with previous attacks."
      }
    ]
  };

  const myths = [
    {
      id: 1,
      statement:
        "A panic attack is dangerous just because it feels dangerous.",
      answer:
        "Myth",
      explanation:
        "Panic attacks can feel extremely intense, but the sensations themselves are usually part of the body's alarm response rather than proof that a catastrophe is occurring."
    },
    {
      id: 2,
      statement:
        "People with panic disorder may begin fearing the possibility of another panic attack.",
      answer:
        "Reality",
      explanation:
        "Persistent concern about future panic attacks and changing behaviour because of that fear are important features of panic disorder."
    },
    {
      id: 3,
      statement:
        "Telling someone to 'just calm down' usually stops a panic attack.",
      answer:
        "Myth",
      explanation:
        "During panic, the person's fear and physical sensations can feel overwhelming. Calm support and grounding are usually more helpful than dismissing the experience."
    }
  ];

  const toggleMyth = (id) => {
    setRevealedMyths((previous) => ({
      ...previous,
      [id]: !previous[id]
    }));
  };

  return (
    <div className="interactive-article-page panic-article">

      {/* HERO */}
      <section className="article-hero panic-hero">

        <div className="article-hero-content">
          <span className="article-category">
            Mental Health Guide
          </span>

          <h1>
            Understanding Panic Disorder
          </h1>

          <p className="article-hero-subtitle">
            A panic attack can feel like the body's emergency
            alarm has suddenly switched on at full volume —
            even when no immediate danger is present.
          </p>

          <p className="article-reading-time">
            🕒 About 7 minutes · Interactive guide
          </p>
        </div>

        <div className="article-hero-visual">
          <div className="panic-pulse-visual">

            <div className="panic-pulse-ring panic-ring-one"></div>
            <div className="panic-pulse-ring panic-ring-two"></div>
            <div className="panic-pulse-ring panic-ring-three"></div>

            <div className="panic-pulse-center">
              💓
            </div>

            <span className="panic-thought panic-thought-one">
              “Why is my heart racing?”
            </span>

            <span className="panic-thought panic-thought-two">
              “Something is wrong.”
            </span>

            <span className="panic-thought panic-thought-three">
              “What if it happens again?”
            </span>

          </div>
        </div>

      </section>


      {/* INTRO */}
      <section className="article-section">

        <div className="article-section-heading">

          <span>01</span>

          <div>
            <h2>
              A panic attack is more than feeling nervous
            </h2>

            <p>
              Panic attacks are sudden episodes of intense
              fear or discomfort that can produce strong
              physical and emotional symptoms.
            </p>

            <p>
              Panic disorder involves recurrent unexpected
              panic attacks along with ongoing concern about
              future attacks or changes in behaviour because
              of them.
            </p>
          </div>

        </div>

      </section>


      {/* FEELINGS */}
      <section className="article-section">

        <div className="article-section-title">
          <span>02</span>

          <h2>
            What can panic feel like?
          </h2>

          <p>
            Panic can affect the body, thoughts, and behaviour
            at the same time.
          </p>
        </div>

        <div className="feeling-tabs">

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

          {feelingData[activeFeeling].map((item, index) => (
            <div
              className="feeling-card"
              key={item.title}
            >
              <div className="feeling-card-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </div>
          ))}

        </div>

      </section>


      {/* PANIC ATTACK SEQUENCE */}
      <section className="article-section panic-sequence-section">

        <div className="article-section-title">
          <span>03</span>

          <h2>
            What can happen during a panic attack?
          </h2>

          <p>
            The experience can build very quickly.
            This is one simplified example.
          </p>
        </div>

        <div className="panic-sequence">

          <div className="panic-sequence-card">
            <span>01</span>
            <div className="panic-sequence-icon">💓</div>

            <h3>
              A sensation appears
            </h3>

            <p>
              The heart suddenly starts beating faster.
            </p>
          </div>

          <div className="panic-sequence-arrow">
            →
          </div>

          <div className="panic-sequence-card">
            <span>02</span>
            <div className="panic-sequence-icon">⚠️</div>

            <h3>
              The sensation feels dangerous
            </h3>

            <p>
              “Why is this happening? Something must be wrong.”
            </p>
          </div>

          <div className="panic-sequence-arrow">
            →
          </div>

          <div className="panic-sequence-card">
            <span>03</span>
            <div className="panic-sequence-icon">🌪️</div>

            <h3>
              Fear increases
            </h3>

            <p>
              Breathing, dizziness, shaking, and fear may intensify.
            </p>
          </div>

          <div className="panic-sequence-arrow">
            →
          </div>

          <div className="panic-sequence-card">
            <span>04</span>
            <div className="panic-sequence-icon">🔁</div>

            <h3>
              Fear of panic develops
            </h3>

            <p>
              Afterward, the person may become afraid of experiencing it again.
            </p>
          </div>

        </div>

      </section>


      {/* EXPERIENCE */}
      <section className="article-section experience-section">

        <div className="article-section-title">
          <span>04</span>

          <h2>
            Step into the moment
          </h2>

          <p>
            Imagine experiencing a panic attack somewhere
            completely ordinary.
          </p>
        </div>

        <div className="experience-timeline">

          <div className="experience-event">

            <div className="experience-time">
              4:10 PM
            </div>

            <div className="experience-content">
              <h3>
                Sitting on a bus
              </h3>

              <p className="experience-situation">
                Nothing unusual appears to be happening.
              </p>

              <div className="experience-thought">
                💭 “Why is my heart suddenly beating so fast?”
              </div>

              <p>
                Panic attacks can sometimes begin suddenly,
                without an obvious external threat.
              </p>
            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              4:12 PM
            </div>

            <div className="experience-content">
              <h3>
                The sensations intensify
              </h3>

              <p className="experience-situation">
                Breathing feels difficult and the bus feels crowded.
              </p>

              <div className="experience-thought">
                💭 “I need to get out. What if I collapse?”
              </div>

              <p>
                Physical sensations can themselves become
                frightening, which may increase the panic.
              </p>
            </div>

          </div>


          <div className="experience-event">

            <div className="experience-time">
              Next day
            </div>

            <div className="experience-content">
              <h3>
                Thinking about taking the bus again
              </h3>

              <p className="experience-situation">
                Nothing dangerous happened yesterday.
              </p>

              <div className="experience-thought">
                💭 “What if I have another attack there?”
              </div>

              <p>
                Fear of future panic can begin changing
                everyday decisions and routines.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* SCENARIO */}
      <section className="article-section">

        <div className="article-section-title">
          <span>05</span>

          <h2>
            What would you do?
          </h2>

          <p>
            Imagine someone beside you suddenly says they
            think they are having a panic attack.
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
            “My heart is racing. I can't breathe properly.
            I feel like something terrible is happening.”
          </p>

          <div className="scenario-options">

            <button
              type="button"
              onClick={() => setScenarioAnswer("dismiss")}
            >
              “There's nothing wrong. Stop panicking.”
            </button>

            <button
              type="button"
              onClick={() => setScenarioAnswer("support")}
            >
              “I'm here with you. Let's stay somewhere calm
              and take this one moment at a time.”
            </button>

            <button
              type="button"
              onClick={() => setScenarioAnswer("leave")}
            >
              “You probably just need some time alone.”
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
                    Staying calm, acknowledging the fear,
                    and remaining present can help the person
                    feel less alone while the episode passes.
                  </p>
                </>
              ) : (
                <>
                  <strong>
                    Try another approach
                  </strong>

                  <p>
                    The experience can feel extremely real
                    and frightening. Dismissing or abandoning
                    the person may increase distress.
                  </p>
                </>
              )}

            </div>
          )}

        </div>

      </section>


      {/* ANTICIPATORY FEAR */}
      <section className="article-section panic-fear-section">

        <div className="article-section-title">
          <span>06</span>

          <h2>
            Sometimes the fear becomes fear itself
          </h2>

          <p>
            Panic disorder can begin affecting life between
            panic attacks, not only during them.
          </p>
        </div>

        <div className="panic-fear-grid">

          <div className="panic-fear-card">
            <span>🚌</span>
            <h3>A bus</h3>
            <p>
              “What if I panic and can't get off?”
            </p>
          </div>

          <div className="panic-fear-card">
            <span>🏬</span>
            <h3>A crowded shop</h3>
            <p>
              “What if I feel trapped?”
            </p>
          </div>

          <div className="panic-fear-card">
            <span>🏃</span>
            <h3>Exercise</h3>
            <p>
              “What if my faster heartbeat triggers another attack?”
            </p>
          </div>

          <div className="panic-fear-card">
            <span>🛌</span>
            <h3>Going to sleep</h3>
            <p>
              “What if it happens again tonight?”
            </p>
          </div>

        </div>

      </section>


      {/* MYTHS */}
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
              onClick={() => toggleMyth(myth.id)}
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


      {/* EMPATHY */}
      <section className="article-section empathy-section">

        <div className="article-section-title">
          <span>08</span>

          <h2>
            Supporting someone experiencing panic
          </h2>

          <p>
            A calm response can help someone feel safer
            during an intensely frightening moment.
          </p>
        </div>

        <div className="empathy-comparison">

          <div className="empathy-card avoid-response">

            <span className="empathy-label">
              Instead of
            </span>

            <p>
              “Nothing is happening. You're being dramatic.”
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
              “I can see this feels frightening.
              I'm staying here with you.”
            </p>
          </div>

        </div>

      </section>


      {/* TREATMENT */}
      <section className="article-section">

        <div className="article-section-title">
          <span>09</span>

          <h2>
            Panic disorder can be treated
          </h2>

          <p>
            Treatment depends on the individual and should
            be guided by a qualified healthcare professional.
          </p>
        </div>

        <div className="support-option-grid">

          <div className="support-option-card">
            <span>🧠</span>

            <h3>
              Cognitive behavioral therapy
            </h3>

            <p>
              CBT can help people understand how thoughts,
              physical sensations, and avoidance interact
              during panic.
            </p>
          </div>

          <div className="support-option-card">
            <span>🩺</span>

            <h3>
              Medication
            </h3>

            <p>
              Antidepressant medications such as SSRIs or
              SNRIs may be recommended by a healthcare
              professional for some people.
            </p>
          </div>

          <div className="support-option-card">
            <span>🌿</span>

            <h3>
              Coping skills
            </h3>

            <p>
              Breathing, grounding, sleep, exercise,
              stress management, and other skills may
              complement professional treatment.
            </p>
          </div>

        </div>

      </section>


      {/* MANORA TOOLS */}
      <section className="article-tools-section">

        <div>
          <span className="article-tools-label">
            Continue with Manora
          </span>

          <h2>
            Give your body a calmer moment
          </h2>

          <p>
            These tools can support reflection and
            everyday emotional regulation.
          </p>
        </div>

        <div className="article-tool-links">

          <Link to="/relax">
            🌬️ Try a Breathing Exercise
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

          <Link to="/anxiety-quiz">
            📝 Anxiety Self-Check
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* DISCLAIMER */}
      <div className="article-disclaimer">

        <span>
          ℹ️
        </span>

        <p>
          This guide is for education and self-awareness
          and cannot diagnose panic disorder. New, severe,
          or unexplained physical symptoms should not
          automatically be assumed to be panic; appropriate
          medical evaluation may be important.
        </p>

      </div>

    </div>
  );
};

export default PanicDisorder;