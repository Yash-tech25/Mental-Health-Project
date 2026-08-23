import { useState } from "react";
import api from "./api";
import "../App.css";

const DailyJournal = () => {

  // =========================================================
  // EDITOR STATES
  // =========================================================

  const [journalText, setJournalText] =
    useState("");

  const [font, setFont] =
    useState("Verdana");

  const [textColor, setTextColor] =
    useState("#333333");

  const [backgroundColor, setBackgroundColor] =
    useState("#fffdf7");


  // =========================================================
  // HISTORY STATES
  // =========================================================

  const [showHistory, setShowHistory] =
    useState(false);

  const [history, setHistory] =
    useState([]);

  const [loadingHistory, setLoadingHistory] =
    useState(false);


  // =========================================================
  // SAVE STATE
  // =========================================================

  const [saving, setSaving] =
    useState(false);


  // =========================================================
  // AI ANALYSIS STATES
  // =========================================================

  const [tone, setTone] =
    useState("");

  const [emotions, setEmotions] =
    useState([]);

  const [reflection, setReflection] =
    useState("");


  // =========================================================
  // EXPANDED HISTORY ENTRIES
  // =========================================================

  const [expandedEntries, setExpandedEntries] =
    useState([]);


  // =========================================================
  // LOAD JOURNAL HISTORY
  // =========================================================

  const fetchJournalHistory = async () => {

    try {

      const response =
        await api.get(
          "/api/journals"
        );

      setHistory(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(
        "Failed to load journal history:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

    }

  };


  // =========================================================
  // SAVE JOURNAL
  // =========================================================

  const handleSaveJournal = async () => {

    // ---------------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------------

    if (!journalText.trim()) {

      alert(
        "Please write something in your journal first."
      );

      return;

    }


    setSaving(true);


    try {

      // -------------------------------------------------------
      // SAVE JOURNAL
      //
      // api.js automatically attaches:
      // Authorization: Bearer <token>
      // -------------------------------------------------------

      const response =
        await api.post(
          "/api/journals",
          {

            text:
              journalText,

            font:
              font,

            textColor:
              textColor,

            backgroundColor:
              backgroundColor

          }
        );


      const savedJournal =
        response.data.journal;


      // -------------------------------------------------------
      // SHOW AI RESULT IMMEDIATELY
      // -------------------------------------------------------

      setTone(
        savedJournal?.tone ||
        "Neutral"
      );


      setEmotions(
        Array.isArray(
          savedJournal?.emotions
        )
          ? savedJournal.emotions
          : []
      );


      setReflection(
        savedJournal?.reflection ||
        ""
      );


      // -------------------------------------------------------
      // CLEAR EDITOR
      // -------------------------------------------------------

      setJournalText("");


      // -------------------------------------------------------
      // REFRESH HISTORY IF IT IS CURRENTLY OPEN
      // -------------------------------------------------------

      if (showHistory) {

        await fetchJournalHistory();

      }


      alert(
        "Journal entry saved successfully!"
      );

    } catch (error) {

      console.error(
        "Failed to save journal:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );


      /*
        IMPORTANT:

        api.js handles authentication errors.

        If the token is invalid or expired,
        api.js clears the authentication data
        and redirects the user to /login.

        Therefore we do not manually handle
        401 errors here.
      */

      if (
        error.response?.status !== 401
      ) {

        alert(
          error.response?.data?.message ||
          "Failed to save journal. Please check that your backend is running."
        );

      }

    } finally {

      setSaving(false);

    }

  };


  // =========================================================
  // SHOW / HIDE JOURNAL HISTORY
  // =========================================================

  const handleHistoryClick = async () => {

    const newState =
      !showHistory;


    setShowHistory(
      newState
    );


    // If the user is closing history,
    // there is nothing else to load.

    if (!newState) {

      return;

    }


    setLoadingHistory(true);


    try {

      await fetchJournalHistory();

    } finally {

      setLoadingHistory(false);

    }

  };


  // =========================================================
  // EXPAND / COLLAPSE HISTORY ENTRY
  // =========================================================

  const toggleEntry = (
    entryId
  ) => {

    setExpandedEntries(
      (previous) => {

        if (
          previous.includes(
            entryId
          )
        ) {

          return previous.filter(
            (id) =>
              id !== entryId
          );

        }


        return [
          ...previous,
          entryId
        ];

      }
    );

  };


  // =========================================================
  // JSX
  // =========================================================

  return (

    <div className="daily-journal-page">

      <div className="journal-container">


        {/* =====================================================
            HEADER
        ===================================================== */}

        <h1>
          📝 Daily Journal
        </h1>


        <p className="journal-subtitle">

          Take a moment to reflect, express yourself,
          and clear your mind.

        </p>


        {/* =====================================================
            WRITING SECTION
        ===================================================== */}

        <div
          className="journal-editor"
          style={{
            backgroundColor:
              backgroundColor,

            color:
              textColor,

            fontFamily:
              font
          }}
        >


          {/* ===================================================
              TOOLBAR
          =================================================== */}

          <div className="journal-toolbar">


            {/* FONT */}

            <div>

              <label>
                Font
              </label>


              <select
                value={font}
                onChange={(event) =>
                  setFont(
                    event.target.value
                  )
                }
              >

                <option value="Verdana">
                  Verdana
                </option>

                <option value="Arial">
                  Arial
                </option>

                <option value="Georgia">
                  Georgia
                </option>

                <option value="Courier New">
                  Courier New
                </option>

                <option value="Trebuchet MS">
                  Trebuchet MS
                </option>

              </select>

            </div>


            {/* TEXT COLOR */}

            <div>

              <label>
                Text Color
              </label>


              <input
                type="color"
                value={
                  textColor
                }
                onChange={(event) =>
                  setTextColor(
                    event.target.value
                  )
                }
              />

            </div>


            {/* PAGE COLOR */}

            <div>

              <label>
                Page Color
              </label>


              <input
                type="color"
                value={
                  backgroundColor
                }
                onChange={(event) =>
                  setBackgroundColor(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* ===================================================
              JOURNAL TEXT
          =================================================== */}

          <textarea
            value={
              journalText
            }
            onChange={(event) =>
              setJournalText(
                event.target.value
              )
            }
            placeholder="Write about your day, your thoughts, your feelings, or anything that's on your mind..."
            style={{
              fontFamily:
                font,

              color:
                textColor
            }}
          />

        </div>


        {/* =====================================================
            SAVE BUTTON
        ===================================================== */}

        <div className="journal-actions">

          <button
            className="save-journal-button"
            onClick={
              handleSaveJournal
            }
            disabled={
              saving
            }
          >

            {saving
              ? "⏳ Analyzing & Saving..."
              : "💾 Save Entry"}

          </button>

        </div>


        {/* =====================================================
            AI REFLECTION
        ===================================================== */}

        <div className="journal-analysis">

          <h2>
            🌿 Your Reflection
          </h2>


          {!tone ? (

            <div className="analysis-placeholder">

              <span className="analysis-emoji">
                💭
              </span>


              <p>

                Write something in your journal and
                we'll provide a supportive reflection
                based on the tone of your writing.

              </p>

            </div>

          ) : (

            <div className="analysis-result">


              <h3>
                Detected Tone: {tone}
              </h3>


              {emotions.length > 0 && (

                <p>

                  <strong>
                    Emotions:
                  </strong>{" "}

                  {emotions.join(", ")}

                </p>

              )}


              <div className="journal-reflection">

                <strong>
                  💭 Reflection
                </strong>


                <p>
                  {reflection}
                </p>

              </div>

            </div>

          )}

        </div>


        {/* =====================================================
            JOURNAL HISTORY
        ===================================================== */}

        <div className="journal-history">


          {/* ===================================================
              HISTORY HEADER
          =================================================== */}

          <button
            className="history-toggle"
            onClick={
              handleHistoryClick
            }
          >

            <span>
              📖 Previous Entries
            </span>


            <span>

              {showHistory
                ? "▲ Hide"
                : "▼ View"}

            </span>

          </button>


          {showHistory && (

            <div className="history-content">


              {/* =================================================
                  LOADING
              ================================================= */}

              {loadingHistory && (

                <p className="no-entries">

                  Loading your previous entries...

                </p>

              )}


              {/* =================================================
                  NO ENTRIES
              ================================================= */}

              {!loadingHistory &&
                history.length === 0 && (

                  <p className="no-entries">

                    You don't have any previous
                    journal entries yet.

                  </p>

                )}


              {/* =================================================
                  JOURNAL CARDS
              ================================================= */}

              {!loadingHistory &&
                history.length > 0 && (

                  <div className="journal-history-list">

                    {history.map(
                      (entry) => {


                        const isExpanded =
                          expandedEntries.includes(
                            entry._id
                          );


                        return (

                          <div
                            className="journal-history-entry"
                            key={
                              entry._id
                            }
                          >


                            {/* =================================
                                DATE
                            ================================= */}

                            <div className="journal-entry-date">

                              {new Date(
                                entry.createdAt
                              ).toLocaleString(
                                [],
                                {
                                  day:
                                    "2-digit",

                                  month:
                                    "short",

                                  year:
                                    "numeric",

                                  hour:
                                    "2-digit",

                                  minute:
                                    "2-digit"
                                }
                              )}

                            </div>


                            {/* =================================
                                TONE + EMOTIONS
                            ================================= */}

                            <div className="journal-entry-meta">


                              <span className="journal-tone">

                                🌿{" "}

                                {entry.tone ||
                                  "Neutral"}

                              </span>


                              {entry.emotions &&
                                entry.emotions.length > 0 && (

                                  <span className="journal-emotions">

                                    •{" "}

                                    {entry.emotions.join(
                                      ", "
                                    )}

                                  </span>

                                )}

                            </div>


                            {/* =================================
                                PREVIEW TEXT
                            ================================= */}

                            <p
                              className={
                                isExpanded
                                  ? "journal-entry-text expanded"
                                  : "journal-entry-text preview"
                              }
                            >

                              {entry.text}

                            </p>


                            {/* =================================
                                EXPAND BUTTON
                            ================================= */}

                            <button
                              className="read-entry-button"
                              onClick={() =>
                                toggleEntry(
                                  entry._id
                                )
                              }
                            >

                              {isExpanded
                                ? "Hide entry ↑"
                                : "Read entry →"}

                            </button>


                            {/* =================================
                                FULL ENTRY
                            ================================= */}

                            {isExpanded && (

                              <div className="journal-entry-details">


                                {/* =============================
                                    REFLECTION
                                ============================= */}

                                {entry.reflection && (

                                  <div className="journal-entry-reflection">

                                    <strong>
                                      💭 Reflection
                                    </strong>


                                    <p>
                                      {entry.reflection}
                                    </p>

                                  </div>

                                )}

                              </div>

                            )}

                          </div>

                        );

                      }
                    )}

                  </div>

                )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

};


export default DailyJournal;