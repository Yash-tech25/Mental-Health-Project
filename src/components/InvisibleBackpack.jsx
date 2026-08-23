import { useMemo, useState } from "react";

const InvisibleBackpack = () => {

  // =========================================================
  // MODE
  // =========================================================

  const [mode, setMode] = useState("mine");


  // =========================================================
  // MY BACKPACK DATA
  // =========================================================

  const burdens = [
    { id: "deadlines", label: "Deadlines", icon: "⏱" },
    { id: "expectations", label: "Expectations", icon: "◎" },
    { id: "overthinking", label: "Overthinking", icon: "☁" },
    { id: "relationships", label: "Relationships", icon: "♡" },
    { id: "loneliness", label: "Loneliness", icon: "◌" },
    { id: "comparison", label: "Comparison", icon: "↗" },
    { id: "uncertainty", label: "Uncertainty", icon: "◇" },
    { id: "family", label: "Family", icon: "⌂" },
    { id: "money", label: "Money", icon: "₹" },
    { id: "self-doubt", label: "Self-doubt", icon: "✦" },
  ];


  const [selectedItems, setSelectedItems] = useState([]);
  const [putDownItems, setPutDownItems] = useState([]);


  const isSelected = (id) =>
    selectedItems.some((item) => item.id === id);


  const handleBurdenClick = (burden) => {

    if (isSelected(burden.id)) {

      setSelectedItems((prev) =>
        prev.filter((item) => item.id !== burden.id)
      );

      return;
    }

    setSelectedItems((prev) => [
      ...prev,
      burden
    ]);

    setPutDownItems((prev) =>
      prev.filter((item) => item.id !== burden.id)
    );
  };


  const putSomethingDown = (burden) => {

    setSelectedItems((prev) =>
      prev.filter((item) => item.id !== burden.id)
    );

    setPutDownItems((prev) => {

      if (
        prev.some(
          (item) => item.id === burden.id
        )
      ) {
        return prev;
      }

      return [
        ...prev,
        burden
      ];
    });
  };


  const pickBackUp = (item) => {

    setPutDownItems((prev) =>
      prev.filter(
        (burden) => burden.id !== item.id
      )
    );

    setSelectedItems((prev) => {

      if (
        prev.some(
          (burden) => burden.id === item.id
        )
      ) {
        return prev;
      }

      return [
        ...prev,
        item
      ];
    });
  };


  const clearBackpack = () => {
    setSelectedItems([]);
    setPutDownItems([]);
  };


  // =========================================================
  // REFLECTION
  // =========================================================

  const reflection = useMemo(() => {

    const count = selectedItems.length;

    if (count === 0) {
      return {
        title: "Your backpack is empty here.",
        text:
          "Choose anything that's been taking up some space in your mind.",
      };
    }

    if (count === 1) {
      return {
        title:
          "One thing can still take up a lot of space.",

        text:
          "You don't need to dismiss something just because it seems small.",
      };
    }

    if (count <= 3) {
      return {
        title:
          "There's more than one thing asking for your attention.",

        text:
          "You don't have to work through all of it at once.",
      };
    }

    if (count <= 6) {
      return {
        title:
          "You're carrying quite a few things right now.",

        text:
          "When several worries compete for attention, even ordinary days can feel tiring.",
      };
    }

    return {
      title:
        "That's a lot to hold at the same time.",

      text:
        "Maybe the goal isn't to carry everything better, but to decide what doesn't need to be carried right now.",
    };

  }, [selectedItems]);


  // =========================================================
  // SOMEONE ELSE'S BACKPACK
  // =========================================================

  const [revealed, setRevealed] = useState(false);


  const hiddenExperiences = [
    {
      icon: "🌙",
      visible: "Shows up to class every morning",
      hidden:
        "Has barely slept properly this week.",
    },
    {
      icon: "😄",
      visible: "Laughs and jokes with friends",
      hidden:
        "Sometimes jokes because explaining how overwhelmed they feel seems harder.",
    },
    {
      icon: "📚",
      visible: "Keeps submitting assignments",
      hidden:
        "Feels constantly behind and worries that everyone else is doing better.",
    },
    {
      icon: "💬",
      visible: "Replies with “I'm good”",
      hidden:
        "Doesn't want friends or family to worry.",
    },
    {
      icon: "🏠",
      visible: "Seems normal when they leave home",
      hidden:
        "Their family has been under financial pressure for months.",
    },
    {
      icon: "🎤",
      visible: "Still participates when needed",
      hidden:
        "Feels intensely anxious before speaking in front of other people.",
    },
  ];


  // =========================================================
  // UI
  // =========================================================

  return (
    <section className="invisible-backpack-section">

      <div className="invisible-backpack-inner">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="backpack-heading">

          <span className="backpack-eyebrow">
            A MOMENT OF REFLECTION
          </span>

          <h2>
            The Invisible Backpack
          </h2>

          <p>
            Everyone carries things that aren't immediately
            visible. Take a moment to explore your own backpack,
            or look beyond what you might see in someone else.
          </p>

        </div>


        {/* ===================================================
            MODE SWITCH
        =================================================== */}

        <div className="backpack-mode-switch">

          <button
            type="button"
            className={
              mode === "mine"
                ? "backpack-mode active"
                : "backpack-mode"
            }
            onClick={() => setMode("mine")}
          >
            <span>🎒</span>

            <div>
              <strong>
                My Backpack
              </strong>

              <small>
                What am I carrying?
              </small>
            </div>
          </button>


          <button
            type="button"
            className={
              mode === "others"
                ? "backpack-mode active"
                : "backpack-mode"
            }
            onClick={() => setMode("others")}
          >
            <span>👥</span>

            <div>
              <strong>
                Someone Else's
              </strong>

              <small>
                What might I not see?
              </small>
            </div>

          </button>

        </div>


        {/* ===================================================
            MY BACKPACK
        =================================================== */}

        {mode === "mine" && (

          <div className="backpack-mode-content backpack-mode-enter">


            <div className="backpack-mode-intro">

              <span>
                YOUR TURN
              </span>

              <h3>
                How heavy is your invisible backpack today?
              </h3>

              <p>
                Choose anything that's been taking up
                space in your mind.
              </p>

            </div>


            {/* =================================================
                INTERACTIVE STAGE
            ================================================= */}

            <div className="backpack-stage">


              {/* LEFT ITEMS */}

              <div className="burden-cloud burden-cloud-left">

                {burdens
                  .slice(0, 5)
                  .map((burden) => (

                    <button
                      type="button"
                      key={burden.id}
                      className={`burden-pill ${
                        isSelected(burden.id)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleBurdenClick(burden)
                      }
                    >

                      <span className="burden-icon">
                        {burden.icon}
                      </span>

                      {burden.label}

                      <span className="burden-action">
                        {isSelected(burden.id)
                          ? "✓"
                          : "+"}
                      </span>

                    </button>

                  ))}

              </div>


              {/* =================================================
                  BACKPACK
              ================================================= */}

              <div className="backpack-center">

                <div
                  className={`backpack-illustration backpack-load-${Math.min(
                    selectedItems.length,
                    7
                  )}`}
                >

                  <div className="backpack-handle">
                  </div>


                  <div className="backpack-body">

                    <div className="backpack-flap">
                    </div>


                    <div className="backpack-pocket">

                      <span>
                        {selectedItems.length}
                      </span>

                    </div>


                    <div className="backpack-strap strap-left">
                    </div>

                    <div className="backpack-strap strap-right">
                    </div>

                  </div>


                  <div className="backpack-shadow">
                  </div>

                </div>


                <span className="backpack-caption">
                  YOUR BACKPACK
                </span>

              </div>


              {/* RIGHT ITEMS */}

              <div className="burden-cloud burden-cloud-right">

                {burdens
                  .slice(5)
                  .map((burden) => (

                    <button
                      type="button"
                      key={burden.id}
                      className={`burden-pill ${
                        isSelected(burden.id)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleBurdenClick(burden)
                      }
                    >

                      <span className="burden-icon">
                        {burden.icon}
                      </span>

                      {burden.label}

                      <span className="burden-action">
                        {isSelected(burden.id)
                          ? "✓"
                          : "+"}
                      </span>

                    </button>

                  ))}

              </div>

            </div>


            {/* =================================================
                WHAT YOU'RE CARRYING
            ================================================= */}

            <div className="backpack-carrying-panel">

              <div className="backpack-panel-heading">

                <div>

                  <span>
                    WHAT YOU'RE CARRYING
                  </span>

                  <h3>

                    {selectedItems.length === 0
                      ? "Nothing selected yet"
                      : `${selectedItems.length} ${
                          selectedItems.length === 1
                            ? "thing"
                            : "things"
                        } with you`}

                  </h3>

                </div>


                {selectedItems.length > 0 && (

                  <button
                    type="button"
                    className="backpack-clear-button"
                    onClick={clearBackpack}
                  >
                    Clear backpack
                  </button>

                )}

              </div>


              {selectedItems.length > 0 ? (

                <div className="carrying-items">

                  {selectedItems.map((item) => (

                    <button
                      type="button"
                      key={item.id}
                      className="carrying-item"
                      onClick={() =>
                        putSomethingDown(item)
                      }
                    >

                      <span>
                        {item.icon}
                      </span>

                      {item.label}

                      <strong>
                        ×
                      </strong>

                    </button>

                  ))}

                </div>

              ) : (

                <div className="empty-backpack-message">
                  Click one of the thoughts around
                  the backpack to begin.
                </div>

              )}


              <div className="backpack-reflection">

                <span className="reflection-symbol">
                  ✦
                </span>

                <div>

                  <h3>
                    {reflection.title}
                  </h3>

                  <p>
                    {reflection.text}
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                PUT SOMETHING DOWN
            ================================================= */}

            {selectedItems.length >= 2 && (

              <div className="put-down-section">

                <span className="put-down-eyebrow">
                  PUT SOMETHING DOWN
                </span>

                <h3>
                  If one thing could wait for a little while,
                  what would you choose?
                </h3>

                <p>
                  Putting something down doesn't mean it
                  isn't important. Sometimes it simply means
                  giving yourself a little room.
                </p>


                <div className="put-down-options">

                  {selectedItems.map((item) => (

                    <button
                      type="button"
                      key={item.id}
                      onClick={() =>
                        putSomethingDown(item)
                      }
                    >

                      <span>
                        {item.icon}
                      </span>

                      {item.label}

                      <span className="put-down-arrow">
                        ↓
                      </span>

                    </button>

                  ))}

                </div>

              </div>

            )}


            {/* =================================================
                THINGS PUT DOWN
            ================================================= */}

            {putDownItems.length > 0 && (

              <div className="put-down-history">

                <div className="put-down-history-icon">
                  🌿
                </div>


                <div>

                  <span>
                    THINGS YOU'VE PUT DOWN FOR NOW
                  </span>


                  <div className="put-down-history-list">

                    {putDownItems.map((item) => (

                      <button
                        type="button"
                        key={item.id}
                        onClick={() =>
                          pickBackUp(item)
                        }
                      >

                        {item.label}

                        <small>
                          pick it back up
                        </small>

                      </button>

                    ))}

                  </div>

                </div>

              </div>

            )}


            <div className="backpack-ending">

              <span className="backpack-ending-mark">
                “
              </span>

              <p>
                You don't have to stop caring about
                everything you're carrying. Sometimes
                noticing the weight is already a meaningful
                place to begin.
              </p>

            </div>

          </div>

        )}


        {/* ===================================================
            SOMEONE ELSE'S BACKPACK
        =================================================== */}

        {mode === "others" && (

          <div className="others-backpack backpack-mode-enter">


            <div className="backpack-mode-intro">

              <span>
                LOOKING BEYOND THE SURFACE
              </span>

              <h3>
                What can you really know from the outside?
              </h3>

              <p>
                Imagine someone you see at college,
                work, or in everyday life.
              </p>

            </div>


            {/* =================================================
                PERSON
            ================================================= */}

            <div className="others-person-scene">

              <div className="others-scene-decoration decoration-one">
              </div>

              <div className="others-scene-decoration decoration-two">
              </div>


              <div className="others-person">

                <div className="others-person-head">

                  <div className="others-person-hair">
                  </div>

                </div>

                <div className="others-person-body">
                </div>

              </div>


              <div className="others-visible-label">

                <span className="others-status-dot">
                </span>

                From the outside

              </div>


              <h3>
                They seem to be doing okay.
              </h3>

              <p>
                They show up. They talk to people.
                They get things done. They even laugh.
              </p>

            </div>


            {/* =================================================
                BEFORE REVEAL
            ================================================= */}

            {!revealed && (

              <div className="others-before-reveal">

                <span className="others-question-mark">
                  ?
                </span>

                <h3>
                  But is that the whole picture?
                </h3>

                <p>
                  We often see someone's behaviour without
                  seeing the effort, thoughts, worries or
                  circumstances underneath it.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setRevealed(true)
                  }
                >
                  See what isn't visible

                  <span>
                    ↓
                  </span>
                </button>

              </div>

            )}


            {/* =================================================
                REVEALED EXPERIENCE
            ================================================= */}

            {revealed && (

              <div className="others-reveal-area">


                <div className="others-reveal-heading">

                  <span>
                    BENEATH THE SURFACE
                  </span>

                  <h3>
                    The same person. A fuller picture.
                  </h3>

                  <p>
                    None of these experiences would necessarily
                    be obvious just by looking at someone.
                  </p>

                </div>


                <div className="others-experience-grid">

                  {hiddenExperiences.map(
                    (experience) => (

                      <div
                        className="others-experience-card"
                        key={experience.title}
                      >

                        <div className="others-experience-icon">
                          {experience.icon}
                        </div>


                        <div className="others-visible-side">

                          <span>
                            WHAT YOU SEE
                          </span>

                          <p>
                            {experience.visible}
                          </p>

                        </div>


                        <div className="others-divider">
                        </div>


                        <div className="others-hidden-side">

                          <span>
                            WHAT YOU MIGHT NOT SEE
                          </span>

                          <p>
                            {experience.hidden}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>


                {/* ===============================================
                    FINAL EMPATHY MESSAGE
                =============================================== */}

                <div className="others-final-message">

                  <div className="others-final-icon">
                    ♡
                  </div>

                  <span>
                    THE INVISIBLE PART MATTERS TOO
                  </span>

                  <h3>
                    You couldn't see any of that.
                  </h3>

                  <p>
                    Someone can look productive, cheerful,
                    confident, or calm while carrying things
                    you know nothing about.
                  </p>

                  <strong>
                    Be curious before being certain.
                  </strong>

                </div>


                <button
                  type="button"
                  className="others-reset-button"
                  onClick={() =>
                    setRevealed(false)
                  }
                >
                  Hide what's underneath
                </button>

              </div>

            )}

          </div>

        )}

      </div>

    </section>
  );
};

export default InvisibleBackpack;