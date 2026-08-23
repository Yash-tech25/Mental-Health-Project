import { useEffect, useState } from "react";
import api from "./api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const MoodTracker = () => {

  // ========================================
  // STATES
  // ========================================

  const [moodHistory, setMoodHistory] =
    useState([]);

  const [showHistory, setShowHistory] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [savingMood, setSavingMood] =
    useState(false);


  // ========================================
  // MOODS
  // ========================================

  const moods = [
    {
      name: "happy",
      emoji: "😊",
      label: "Happy",
    },
    {
      name: "sad",
      emoji: "😢",
      label: "Sad",
    },
    {
      name: "angry",
      emoji: "😠",
      label: "Angry",
    },
    {
      name: "anxious",
      emoji: "😰",
      label: "Anxious",
    },
  ];


  const COLORS = [
    "#FFD166",
    "#74B9FF",
    "#FF7675",
    "#A29BFE",
  ];


  // ========================================
  // CREATE SAFE LOCAL DATE
  // Example: 2026-08-22
  // ========================================

  const getLocalDateKey = (
    date = new Date()
  ) => {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");


    return `${year}-${month}-${day}`;

  };


  // ========================================
  // GET DATE KEY FROM DATABASE DATA
  // ========================================

  const getMoodDateKey = (item) => {

    if (!item) {
      return null;
    }


    // NEW FORMAT: YYYY-MM-DD

    if (
      item.date &&
      /^\d{4}-\d{2}-\d{2}$/.test(
        item.date
      )
    ) {

      return item.date;

    }


    // FALLBACK TO CREATED DATE

    if (item.createdAt) {

      const createdDate =
        new Date(
          item.createdAt
        );


      if (
        !Number.isNaN(
          createdDate.getTime()
        )
      ) {

        return getLocalDateKey(
          createdDate
        );

      }

    }


    // LAST FALLBACK

    if (item.date) {

      const parsedDate =
        new Date(
          item.date
        );


      if (
        !Number.isNaN(
          parsedDate.getTime()
        )
      ) {

        return getLocalDateKey(
          parsedDate
        );

      }

    }


    return null;

  };


  // ========================================
  // DISPLAY DATE SAFELY
  // ========================================

  const formatMoodDate = (item) => {

    if (!item) {

      return "Date unavailable";

    }


    // YYYY-MM-DD

    if (
      item.date &&
      /^\d{4}-\d{2}-\d{2}$/.test(
        item.date
      )
    ) {

      const [
        year,
        month,
        day,
      ] = item.date
        .split("-")
        .map(Number);


      const safeDate =
        new Date(
          year,
          month - 1,
          day
        );


      return safeDate
        .toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        );

    }


    // CREATED AT FALLBACK

    if (item.createdAt) {

      const createdDate =
        new Date(
          item.createdAt
        );


      if (
        !Number.isNaN(
          createdDate.getTime()
        )
      ) {

        return createdDate
          .toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          );

      }

    }


    if (
      item.date &&
      item.date !== "Invalid Date"
    ) {

      return item.date;

    }


    return "Date unavailable";

  };


  // ========================================
  // GET MOOD HISTORY
  // ========================================

  const fetchMoodHistory =
    async () => {

      try {

        setLoading(true);


        const response =
          await api.get(
            "/api/moods"
          );


        /*
          Backend returns:
          newest → oldest
        */

        setMoodHistory(
          Array.isArray(
            response.data
          )
            ? response.data
            : []
        );

      } catch (error) {

        console.error(
          "Error fetching mood history:",
          error
        );


        console.error(
          "Backend response:",
          error.response?.data
        );

      } finally {

        setLoading(false);

      }

    };


  // ========================================
  // FETCH ON PAGE LOAD
  // ========================================

  useEffect(() => {

    fetchMoodHistory();

  }, []);


  // ========================================
  // SAVE MOOD
  // ========================================

  const selectMood =
    async (mood) => {

      if (savingMood) {
        return;
      }


      try {

        setSavingMood(true);


        await api.post(
          "/api/moods",
          {
            mood:
              mood,

            date:
              getLocalDateKey(),
          }
        );


        /*
          Refresh immediately so:
          - today's card updates
          - chart updates
          - history updates
        */

        await fetchMoodHistory();

      } catch (error) {

        console.error(
          "Error saving mood:",
          error
        );


        console.error(
          "Backend response:",
          error.response?.data
        );


        if (
          error.response?.status !== 401
        ) {

          alert(
            error.response
              ?.data
              ?.message ||
            "Failed to save mood."
          );

        }

      } finally {

        setSavingMood(false);

      }

    };


  // ========================================
  // MOOD COUNTS
  // ========================================

  const moodCounts =
    moods.map(
      (mood) => ({

        name:
          mood.label,

        value:
          moodHistory.filter(
            (item) =>
              item.mood ===
              mood.name
          ).length,

      })
    );


  // ========================================
  // DOMINANT MOOD
  // ========================================

  const getDominantMood = () => {

    if (
      moodHistory.length === 0
    ) {

      return null;

    }


    const counts = {
      happy: 0,
      sad: 0,
      angry: 0,
      anxious: 0,
    };


    moodHistory.forEach(
      (item) => {

        if (
          counts[
            item.mood
          ] !== undefined
        ) {

          counts[
            item.mood
          ]++;

        }

      }
    );


    let dominantMood = null;

    let highestCount = 0;


    Object.keys(
      counts
    ).forEach(
      (mood) => {

        if (
          counts[mood] >
          highestCount
        ) {

          highestCount =
            counts[mood];

          dominantMood =
            mood;

        }

      }
    );


    return dominantMood;

  };


  const dominantMood =
    getDominantMood();


  // ========================================
  // DYNAMIC MESSAGE
  // ========================================

  const getMoodMessage = () => {

    if (!dominantMood) {

      return {
        className:
          "mood-message neutral",

        emoji:
          "🌱",

        title:
          "Start tracking your mood",

        message:
          "Take a moment to check in with yourself today. Your feelings matter.",
      };

    }


    switch (
      dominantMood
    ) {

      case "happy":

        return {
          className:
            "mood-message happy-message",

          emoji:
            "🌟",

          title:
            "You're doing great!",

          message:
            "It looks like you've been feeling happy lately. Keep enjoying the little moments and spreading that positivity!",
        };


      case "sad":

        return {
          className:
            "mood-message sad-message",

          emoji:
            "💙",

          title:
            "It's okay to have difficult days.",

          message:
            "Remember that sadness is a natural part of life. Be gentle with yourself and give yourself time to recover.",
        };


      case "angry":

        return {
          className:
            "mood-message angry-message",

          emoji:
            "🌿",

          title:
            "Take a moment to breathe.",

          message:
            "You've been experiencing some anger lately. Try taking a short break, breathing deeply, and giving yourself some space.",
        };


      case "anxious":

        return {
          className:
            "mood-message anxious-message",

          emoji:
            "🫂",

          title:
            "Take things one step at a time.",

          message:
            "If things feel overwhelming, slow breathing, grounding, or talking to someone you trust may help you feel more settled.",
        };


      default:

        return {
          className:
            "mood-message neutral",

          emoji:
            "🌱",

          title:
            "Keep checking in with yourself.",

          message:
            "Understanding your emotions is an important part of taking care of yourself.",
        };

    }

  };


  const moodMessage =
    getMoodMessage();


  // ========================================
  // GET LAST 7 DAYS
  // ========================================

  const getLast7Days = () => {

    const days = [];


    for (
      let i = 6;
      i >= 0;
      i--
    ) {

      const date =
        new Date();


      date.setHours(
        0,
        0,
        0,
        0
      );


      date.setDate(
        date.getDate() - i
      );


      const dateKey =
        getLocalDateKey(
          date
        );


      const entriesForDay =
        moodHistory.filter(
          (item) => {

            return (
              getMoodDateKey(
                item
              ) ===
              dateKey
            );

          }
        );


      /*
        moodHistory is newest → oldest,
        so index 0 is latest for that day.
      */

      const latestMood =
        entriesForDay.length > 0
          ? entriesForDay[0]
          : null;


      const moodData =
        latestMood
          ? moods.find(
              (mood) =>
                mood.name ===
                latestMood.mood
            )
          : null;


      days.push({

        date:
          date.toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
            }
          ),

        day:
          date.toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          ),

        fullDay:
          date.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
            }
          ),

        mood:
          moodData
            ? moodData.label
            : "No entry",

        emoji:
          moodData
            ? moodData.emoji
            : "—",

        moodName:
          moodData
            ? moodData.name
            : null,

      });

    }


    return days;

  };


  const last7Days =
    getLast7Days();


  // ========================================
  // WEEKLY STATISTICS
  // ========================================

  const daysTracked =
    last7Days.filter(
      (day) =>
        day.moodName !== null
    ).length;


  const happyDays =
    last7Days.filter(
      (day) =>
        day.moodName === "happy"
    ).length;


  // ========================================
  // WEEKLY MESSAGE
  // ========================================

  const getWeeklyMessage = () => {

    if (
      daysTracked === 0
    ) {

      return {
        emoji:
          "🌱",

        title:
          "Your week starts here",

        message:
          "Record your mood each day to understand your emotional patterns.",
      };

    }


    if (
      daysTracked === 7 &&
      happyDays >= 4
    ) {

      return {
        emoji:
          "🌟",

        title:
          "What a positive week!",

        message:
          "You've had several happy days this week. Keep appreciating the little things that make you feel good.",
      };

    }


    if (
      daysTracked >= 4 &&
      happyDays >= 3
    ) {

      return {
        emoji:
          "😊",

        title:
          "You're building a positive pattern!",

        message:
          "Your mood tracker shows several positive days this week. Keep taking care of yourself.",
      };

    }


    if (
      daysTracked >= 4
    ) {

      return {
        emoji:
          "💚",

        title:
          "You're checking in with yourself.",

        message:
          "Tracking your emotions regularly can help you understand yourself better. Keep going.",
      };

    }


    return {
      emoji:
        "🌿",

      title:
        "Keep checking in.",

      message:
        "You don't need to feel a certain way every day. Just noticing how you feel is already a meaningful step.",
    };

  };


  const weeklyMessage =
    getWeeklyMessage();


  // ========================================
  // JSX
  // ========================================

  return (

    <div className="well-being-page">

      <div className="mood-tracker-main">


        {/* ========================================
            HEADER
        ======================================== */}

        <h1>
          🌿 Mood Tracker
        </h1>

        <h2>
          How are you feeling today?
        </h2>


        {/* ========================================
            MOOD OPTIONS
        ======================================== */}

        <div className="mood-options">

          {moods.map(
            (item) => (

              <button
                type="button"
                className="mood-box"
                key={item.name}
                onClick={() =>
                  selectMood(
                    item.name
                  )
                }
                disabled={
                  savingMood
                }
              >

                <div className="mood-emoji">
                  {item.emoji}
                </div>

                <div className="mood-label">
                  {item.label}
                </div>

              </button>

            )
          )}

        </div>


        {/* ========================================
            7 DAY MOOD TRACKER
        ======================================== */}

        <div className="seven-day-section">

          <h2>
            📅 Your Last 7 Days
          </h2>

          <p className="seven-day-subtitle">
            A quick look at how you've been feeling this week.
          </p>


          {loading ? (

            <p className="no-history">
              Loading your mood history...
            </p>

          ) : (

            <>
              {/* WEEKLY STAT */}

              <div className="weekly-stat">

                <span className="weekly-stat-emoji">
                  📈
                </span>

                <div>

                  <strong>
                    {daysTracked}/7 days tracked
                  </strong>

                  <p>

                    {daysTracked === 0
                      ? "Start by recording today's mood."
                      : daysTracked === 7
                      ? "You've checked in every day this week!"
                      : `You've checked in on ${daysTracked} day${
                          daysTracked > 1
                            ? "s"
                            : ""
                        } this week.`
                    }

                  </p>

                </div>

              </div>


              {/* 7 DAY CARDS */}

              <div className="seven-day-container">

                {last7Days.map(
                  (day) => (

                    <div
                      className={`day-card ${
                        day.moodName
                          ? `day-${day.moodName}`
                          : "day-empty"
                      }`}
                      key={`${day.day}-${day.date}`}
                    >

                      <div className="day-name">
                        {day.day}
                      </div>

                      <div className="day-emoji">
                        {day.emoji}
                      </div>

                      <div className="day-mood">
                        {day.mood}
                      </div>

                      <div className="day-date">
                        {day.date}
                      </div>

                    </div>

                  )
                )}

              </div>


              {/* WEEKLY MESSAGE */}

              <div className="weekly-message">

                <div className="weekly-message-emoji">
                  {weeklyMessage.emoji}
                </div>

                <div>

                  <h3>
                    {weeklyMessage.title}
                  </h3>

                  <p>
                    {weeklyMessage.message}
                  </p>

                </div>

              </div>
            </>

          )}

        </div>


        {/* ========================================
            MOOD SUMMARY
        ======================================== */}

        <div className="mood-summary">

          <h2>
            📊 Mood Summary
          </h2>


          {moodHistory.length === 0 ? (

            <p>
              Select a mood to start building your mood summary.
            </p>

          ) : (

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={moodCounts}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={5}
                  label={({
                    name,
                    value,
                  }) =>
                    value > 0
                      ? `${name}: ${value}`
                      : ""
                  }
                >

                  {moodCounts.map(
                    (entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[index]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          )}

        </div>


        {/* ========================================
            DYNAMIC MESSAGE
        ======================================== */}

        <div
          className={
            moodMessage.className
          }
        >

          <div className="message-emoji">
            {moodMessage.emoji}
          </div>

          <div>

            <h3>
              {moodMessage.title}
            </h3>

            <p>
              {moodMessage.message}
            </p>

          </div>

        </div>


        {/* ========================================
            MOOD HISTORY
        ======================================== */}

        <div className="mood-history">

          <button
            type="button"
            className="history-toggle"
            onClick={() =>
              setShowHistory(
                (previous) =>
                  !previous
              )
            }
          >

            <span>
              🕐 Mood History
            </span>

            <span>
              {showHistory
                ? "▲"
                : "▼"
              }
            </span>

          </button>


          {showHistory && (

            <div className="history-content">

              {moodHistory.length === 0 ? (

                <p className="no-history">
                  No mood history yet.
                </p>

              ) : (

                <div className="history-list">

                  {moodHistory.map(
                    (
                      item,
                      index
                    ) => {

                      const moodData =
                        moods.find(
                          (mood) =>
                            mood.name ===
                            item.mood
                        );


                      return (

                        <div
                          className="history-item"
                          key={
                            item._id ||
                            `${item.createdAt}-${index}`
                          }
                        >

                          <span className="history-emoji">

                            {moodData
                              ? moodData.emoji
                              : "🙂"
                            }

                          </span>

                          <div>

                            <strong>

                              {moodData
                                ? moodData.label
                                : item.mood
                              }

                            </strong>

                            <div className="history-date">

                              {formatMoodDate(
                                item
                              )}

                            </div>

                          </div>

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


export default MoodTracker;