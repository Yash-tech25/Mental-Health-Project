import {
    useState,
    useEffect
} from "react";

import api from "./api";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


const WellnessTracker = () => {

    // ==========================================
    // FORM STATES
    // ==========================================

    const [sleep, setSleep] =
        useState("");

    const [water, setWater] =
        useState(0);

    const [exercise, setExercise] =
        useState(0);

    const [meditation, setMeditation] =
        useState(0);

    const [energy, setEnergy] =
        useState("");

    const [stress, setStress] =
        useState("");


    // ==========================================
    // WELLNESS STATES
    // ==========================================

    const [todayEntry, setTodayEntry] =
        useState(null);

    const [
        wellnessHistory,
        setWellnessHistory
    ] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);


    // ==========================================
    // GET TODAY'S DATE
    // ==========================================

    const getTodayDate = () => {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const day =
            String(
                today.getDate()
            ).padStart(
                2,
                "0"
            );


        return `${year}-${month}-${day}`;

    };


    // ==========================================
    // FETCH WELLNESS HISTORY
    // ==========================================

    const fetchWellnessHistory =
        async () => {

            try {

                const response =
                    await api.get(
                        "/api/wellness"
                    );


                const history =
                    Array.isArray(
                        response.data
                    )
                        ? response.data
                        : [];


                setWellnessHistory(
                    history
                );


                // ----------------------------------
                // CHECK TODAY'S ENTRY
                // ----------------------------------

                const today =
                    getTodayDate();


                const existingEntry =
                    history.find(
                        (entry) =>
                            entry.date ===
                            today
                    );


                if (existingEntry) {

                    setTodayEntry(
                        existingEntry
                    );

                } else {

                    setTodayEntry(
                        null
                    );

                }


                console.log(
                    "Wellness history:",
                    history
                );

            } catch (error) {

                console.error(
                    "Error fetching wellness history:",
                    error
                );


                console.error(
                    "Backend response:",
                    error.response?.data
                );

            } finally {

                setLoading(
                    false
                );

            }

        };


    // ==========================================
    // LOAD DATA WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        fetchWellnessHistory();

    }, []);


    // ==========================================
    // CALCULATE WELLNESS SCORE
    // ==========================================

    const calculateWellnessScore =
        () => {

            let score = 0;


            // ----------------------------------
            // SLEEP - 20 POINTS
            // ----------------------------------

            if (
                sleep === "Poor"
            ) {
                score += 5;
            }

            if (
                sleep === "Okay"
            ) {
                score += 10;
            }

            if (
                sleep === "Good"
            ) {
                score += 15;
            }

            if (
                sleep === "Excellent"
            ) {
                score += 20;
            }


            // ----------------------------------
            // WATER - 20 POINTS
            // ----------------------------------

            score += Math.min(
                (water / 8) * 20,
                20
            );


            // ----------------------------------
            // EXERCISE - 20 POINTS
            // ----------------------------------

            score += Math.min(
                (exercise / 60) * 20,
                20
            );


            // ----------------------------------
            // MEDITATION - 15 POINTS
            // ----------------------------------

            score += Math.min(
                (meditation / 30) * 15,
                15
            );


            // ----------------------------------
            // ENERGY - 15 POINTS
            // ----------------------------------

            if (
                energy === "Low"
            ) {
                score += 5;
            }

            if (
                energy === "Medium"
            ) {
                score += 10;
            }

            if (
                energy === "High"
            ) {
                score += 15;
            }


            // ----------------------------------
            // STRESS - 10 POINTS
            // ----------------------------------

            if (
                stress === "Low"
            ) {
                score += 10;
            }

            if (
                stress === "Medium"
            ) {
                score += 6;
            }

            if (
                stress === "High"
            ) {
                score += 2;
            }


            return Math.round(
                score
            );

        };


    // ==========================================
    // SAVE WELLNESS
    // ==========================================

    const saveWellness =
        async () => {

            if (saving) {
                return;
            }


            try {

                // ----------------------------------
                // VALIDATION
                // ----------------------------------

                if (
                    !sleep ||
                    !energy ||
                    !stress
                ) {

                    alert(
                        "Please complete all sections before saving your check-in. 🌿"
                    );

                    return;

                }


                setSaving(
                    true
                );


                // ----------------------------------
                // CALCULATE SCORE
                // ----------------------------------

                const score =
                    calculateWellnessScore();


                // ----------------------------------
                // CREATE WELLNESS DATA
                // ----------------------------------

                const wellnessData = {

                    date:
                        getTodayDate(),

                    sleep:
                        sleep,

                    water:
                        water,

                    exercise:
                        exercise,

                    meditation:
                        meditation,

                    energy:
                        energy,

                    stress:
                        stress,

                    score:
                        score

                };


                // ----------------------------------
                // SAVE TO BACKEND
                //
                // api.js automatically attaches
                // the JWT for this tab.
                // ----------------------------------

                const response =
                    await api.post(
                        "/api/wellness",
                        wellnessData
                    );


                console.log(
                    "Wellness data saved:",
                    response.data
                );


                // ----------------------------------
                // UPDATE TODAY'S ENTRY
                // ----------------------------------

                setTodayEntry(
                    response.data.wellness
                );


                // ----------------------------------
                // REFRESH HISTORY
                // ----------------------------------

                await fetchWellnessHistory();


            } catch (error) {

                console.error(
                    "Error saving wellness data:",
                    error
                );


                console.error(
                    "Backend response:",
                    error.response?.data
                );


                if (
                    error.response?.status === 409
                ) {

                    alert(
                        "You have already completed today's wellness check-in. 🌿"
                    );


                    await fetchWellnessHistory();

                } else if (
                    error.response?.status !== 401
                ) {

                    alert(
                        error.response
                            ?.data
                            ?.message ||
                        "Failed to save wellness check-in."
                    );

                }

            } finally {

                setSaving(
                    false
                );

            }

        };


    // ==========================================
    // SCORE MESSAGE
    // ==========================================

    const getScoreMessage =
        (score) => {

            if (
                score >= 80
            ) {

                return "Amazing! You're taking great care of yourself. 💚";

            }


            if (
                score >= 60
            ) {

                return "Good job! Keep taking care of yourself. 🌱";

            }


            if (
                score >= 40
            ) {

                return "You're doing okay. There's always room for improvement. 🌿";

            }


            return "Every small step counts. Take care of yourself today. 💙";

        };


    // ==========================================
    // PREPARE LINE CHART DATA
    // ==========================================

    const lineChartData =
        (() => {

            // --------------------------------------
            // CREATE ONE ENTRY PER DATE
            // --------------------------------------

            const dailyData =
                {};


            wellnessHistory.forEach(
                (entry) => {

                    const date =
                        entry.date;


                    dailyData[date] = {

                        date:
                            date,

                        score:
                            Number(
                                entry.score
                            )

                    };

                }
            );


            // --------------------------------------
            // CONVERT OBJECT BACK INTO ARRAY
            // --------------------------------------

            return Object
                .values(
                    dailyData
                )
                .sort(
                    (a, b) =>
                        new Date(
                            a.date
                        ) -
                        new Date(
                            b.date
                        )
                );

        })();


    // ==========================================
    // PREPARE BAR CHART DATA
    // ==========================================

    const barChartData =
        todayEntry
            ? [

                {
                    activity:
                        "Water",

                    value:
                        Number(
                            todayEntry.water
                        )
                },

                {
                    activity:
                        "Exercise",

                    value:
                        Number(
                            todayEntry.exercise
                        )
                },

                {
                    activity:
                        "Meditation",

                    value:
                        Number(
                            todayEntry.meditation
                        )
                }

            ]
            : [];


    // ==========================================
    // CUSTOM LINE CHART TOOLTIP
    // ==========================================

    const CustomLineTooltip = ({
        active,
        payload,
        label
    }) => {

        if (
            active &&
            payload &&
            payload.length
        ) {

            return (

                <div
                    style={{
                        background:
                            "white",

                        padding:
                            "10px 14px",

                        border:
                            "1px solid #ddd",

                        borderRadius:
                            "8px",

                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                >

                    <p
                        style={{
                            margin:
                                0,

                            marginBottom:
                                "5px",

                            fontWeight:
                                "600"
                        }}
                    >
                        {label}
                    </p>


                    <p
                        style={{
                            margin:
                                0
                        }}
                    >

                        Score:{" "}

                        <strong>
                            {payload[0].value}
                        </strong>{" "}

                        / 100

                    </p>

                </div>

            );

        }


        return null;

    };


    // ==========================================
    // LOADING SCREEN
    // ==========================================

    if (loading) {

        return (

            <div className="wellness-page">

                <div className="wellness-container">

                    <h2>
                        🌿 Checking your wellness...
                    </h2>

                </div>

            </div>

        );

    }


    // ==========================================
    // TODAY ALREADY COMPLETED
    // ==========================================

    if (todayEntry) {

        return (

            <div className="wellness-page">

                <div className="wellness-container">


                    {/* HEADER */}

                    <h1>
                        🌿 Daily Wellness Check-in
                    </h1>


                    <p className="wellness-subtitle">

                        You've already completed
                        today's wellness check-in.

                    </p>


                    {/* ==================================
                        TODAY'S SCORE
                    ================================== */}

                    <div className="wellness-score-card">

                        <div className="score-icon">
                            🌿
                        </div>


                        <h2>
                            Today's Wellness Score
                        </h2>


                        <div className="wellness-score">

                            {todayEntry.score} / 100

                        </div>


                        {/* SCORE BAR */}

                        <div className="score-bar">

                            <div
                                className="score-progress"
                                style={{
                                    width:
                                        `${todayEntry.score}%`
                                }}
                            >
                            </div>

                        </div>


                        {/* SCORE MESSAGE */}

                        <p className="score-message">

                            {getScoreMessage(
                                todayEntry.score
                            )}

                        </p>


                        {/* COMPLETION MESSAGE */}

                        <div className="wellness-complete-message">

                            <span>
                                ✅
                            </span>

                            <p>

                                You've completed
                                today's check-in.

                            </p>

                        </div>


                        <p className="next-checkin-message">

                            Come back tomorrow for
                            your next wellness check-in 🌱

                        </p>

                    </div>


                    {/* ==================================
                        WELLNESS SCORE HISTORY
                    ================================== */}

                    <div className="wellness-history-card">

                        <div className="history-icon">
                            📈
                        </div>


                        <h2>
                            Your Wellness Journey
                        </h2>


                        <p className="history-subtitle">

                            See how your wellness score
                            has changed over time.

                        </p>


                        <div
                            style={{
                                width:
                                    "100%",

                                height:
                                    "300px"
                            }}
                        >

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={
                                        lineChartData
                                    }
                                    margin={{
                                        top:
                                            20,

                                        right:
                                            20,

                                        left:
                                            0,

                                        bottom:
                                            10
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />


                                    <XAxis
                                        dataKey="date"
                                    />


                                    <YAxis
                                        domain={[
                                            0,
                                            100
                                        ]}
                                    />


                                    <Tooltip
                                        content={
                                            <CustomLineTooltip />
                                        }
                                    />


                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#4caf50"
                                        strokeWidth={3}
                                        dot={{
                                            r:
                                                5
                                        }}
                                        activeDot={{
                                            r:
                                                7
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                    {/* ==================================
                        TODAY'S ACTIVITIES
                    ================================== */}

                    <div className="wellness-history-card">

                        <div className="history-icon">
                            📊
                        </div>


                        <h2>
                            Today's Wellness Activities
                        </h2>


                        <p className="history-subtitle">

                            Here's how you spent your
                            time taking care of yourself today.

                        </p>


                        <div
                            style={{
                                width:
                                    "100%",

                                height:
                                    "300px"
                            }}
                        >

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={
                                        barChartData
                                    }
                                    margin={{
                                        top:
                                            20,

                                        right:
                                            20,

                                        left:
                                            0,

                                        bottom:
                                            10
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />


                                    <XAxis
                                        dataKey="activity"
                                    />


                                    <YAxis />


                                    <Tooltip />


                                    <Bar
                                        dataKey="value"
                                        fill="#66bb6a"
                                        radius={[
                                            8,
                                            8,
                                            0,
                                            0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // WELLNESS FORM
    // ==========================================

    return (

        <div className="wellness-page">

            <div className="wellness-container">


                {/* HEADER */}

                <h1>
                    🌿 Daily Wellness Check-in
                </h1>


                <p className="wellness-subtitle">

                    Take a few minutes to
                    check in with yourself today.

                </p>


                {/* ==================================
                    SLEEP
                ================================== */}

                <div className="wellness-card">

                    <div className="wellness-icon">
                        😴
                    </div>


                    <h2>
                        How did you sleep?
                    </h2>


                    <div className="wellness-options">

                        <button
                            type="button"
                            className={
                                sleep === "Poor"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setSleep(
                                    "Poor"
                                )
                            }
                        >

                            😞

                            <span>
                                Poor
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                sleep === "Okay"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setSleep(
                                    "Okay"
                                )
                            }
                        >

                            😐

                            <span>
                                Okay
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                sleep === "Good"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setSleep(
                                    "Good"
                                )
                            }
                        >

                            🙂

                            <span>
                                Good
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                sleep === "Excellent"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setSleep(
                                    "Excellent"
                                )
                            }
                        >

                            😴

                            <span>
                                Excellent
                            </span>

                        </button>

                    </div>

                </div>


                {/* ==================================
                    WATER
                ================================== */}

                <div className="wellness-card">

                    <div className="wellness-icon">
                        💧
                    </div>


                    <h2>
                        How much water did you drink?
                    </h2>


                    <p className="wellness-value">

                        {water} / 8 glasses

                    </p>


                    <div className="water-glasses">

                        {[
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8
                        ].map(
                            (glass) => (

                                <button
                                    type="button"
                                    key={
                                        glass
                                    }
                                    className={
                                        water >= glass
                                            ? "water-filled"
                                            : ""
                                    }
                                    onClick={() =>
                                        setWater(
                                            glass
                                        )
                                    }
                                >

                                    💧

                                </button>

                            )
                        )}

                    </div>

                </div>


                {/* ==================================
                    EXERCISE
                ================================== */}

                <div className="wellness-card">

                    <div className="wellness-icon">
                        🏃
                    </div>


                    <h2>
                        How much did you exercise?
                    </h2>


                    <p className="wellness-value">

                        {exercise} minutes

                    </p>


                    <input
                        type="range"
                        min="0"
                        max="120"
                        step="5"
                        value={
                            exercise
                        }
                        onChange={(event) =>
                            setExercise(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    />

                </div>


                {/* ==================================
                    MEDITATION
                ================================== */}

                <div className="wellness-card">

                    <div className="wellness-icon">
                        🧘
                    </div>


                    <h2>
                        How long did you meditate?
                    </h2>


                    <p className="wellness-value">

                        {meditation} minutes

                    </p>


                    <input
                        type="range"
                        min="0"
                        max="60"
                        step="5"
                        value={
                            meditation
                        }
                        onChange={(event) =>
                            setMeditation(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    />

                </div>


                {/* ==================================
                    ENERGY
                ================================== */}

                <div className="wellness-card">

                    <div className="wellness-icon">
                        ⚡
                    </div>


                    <h2>
                        How is your energy today?
                    </h2>


                    <div className="wellness-options">

                        <button
                            type="button"
                            className={
                                energy === "Low"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setEnergy(
                                    "Low"
                                )
                            }
                        >

                            🪫

                            <span>
                                Low
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                energy === "Medium"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setEnergy(
                                    "Medium"
                                )
                            }
                        >

                            🔋

                            <span>
                                Medium
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                energy === "High"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setEnergy(
                                    "High"
                                )
                            }
                        >

                            ⚡

                            <span>
                                High
                            </span>

                        </button>

                    </div>

                </div>


                {/* ==================================
                    STRESS
                ================================== */}

                <div className="wellness-card">

                    <div className="wellness-icon">
                        🌊
                    </div>


                    <h2>
                        How stressed are you?
                    </h2>


                    <div className="wellness-options">

                        <button
                            type="button"
                            className={
                                stress === "Low"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setStress(
                                    "Low"
                                )
                            }
                        >

                            😌

                            <span>
                                Low
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                stress === "Medium"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setStress(
                                    "Medium"
                                )
                            }
                        >

                            😐

                            <span>
                                Moderate
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                stress === "High"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                setStress(
                                    "High"
                                )
                            }
                        >

                            😰

                            <span>
                                High
                            </span>

                        </button>

                    </div>

                </div>


                {/* ==================================
                    LIVE WELLNESS SCORE
                ================================== */}

                <div className="wellness-score-card">

                    <div className="score-icon">
                        🌿
                    </div>


                    <h2>
                        Your Wellness Score
                    </h2>


                    <div className="wellness-score">

                        {calculateWellnessScore()} / 100

                    </div>


                    <div className="score-bar">

                        <div
                            className="score-progress"
                            style={{
                                width:
                                    `${calculateWellnessScore()}%`
                            }}
                        >
                        </div>

                    </div>


                    <p className="score-message">

                        {getScoreMessage(
                            calculateWellnessScore()
                        )}

                    </p>

                </div>


                {/* ==================================
                    SAVE BUTTON
                ================================== */}

                <button
                    type="button"
                    className="save-wellness-button"
                    onClick={
                        saveWellness
                    }
                    disabled={
                        saving
                    }
                >

                    {saving
                        ? "🌿 Saving your check-in..."
                        : "🌿 Complete Today's Check-in"
                    }

                </button>

            </div>

        </div>

    );

};


export default WellnessTracker;