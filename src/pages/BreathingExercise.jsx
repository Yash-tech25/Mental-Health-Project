import {
    useEffect,
    useState
} from "react";


// =========================================================
// SESSION DURATIONS
// =========================================================

const sessionOptions = [

    {
        label:
            "1 min",

        value:
            60
    },

    {
        label:
            "2 min",

        value:
            120
    },

    {
        label:
            "5 min",

        value:
            300
    }

];


const BreathingExercise = () => {

    // ==========================================
    // SESSION SETTINGS
    // ==========================================

    const [
        sessionDuration,
        setSessionDuration
    ] = useState(
        60
    );


    // ==========================================
    // EXERCISE STATES
    // ==========================================

    const [
        isRunning,
        setIsRunning
    ] = useState(
        false
    );


    const [
        phase,
        setPhase
    ] = useState(
        "Ready"
    );


    const [
        seconds,
        setSeconds
    ] = useState(
        0
    );


    const [
        completed,
        setCompleted
    ] = useState(
        false
    );


    // ==========================================
    // GET CURRENT BREATHING PHASE
    // ==========================================

    const getBreathingPhase = (
        currentSecond
    ) => {

        const cycleSecond =
            currentSecond % 12;


        if (
            cycleSecond < 4
        ) {

            return "Breathe In";

        }


        if (
            cycleSecond < 8
        ) {

            return "Hold";

        }


        return "Breathe Out";

    };


    // ==========================================
    // BREATHING TIMER
    // ==========================================

    useEffect(() => {

        if (
            !isRunning
        ) {

            return;

        }


        const interval =
            setInterval(
                () => {

                    setSeconds(
                        (previousSeconds) => {

                            const nextSeconds =
                                previousSeconds + 1;


                            // ----------------------------------
                            // SESSION COMPLETE
                            // ----------------------------------

                            if (
                                nextSeconds >=
                                sessionDuration
                            ) {

                                setIsRunning(
                                    false
                                );


                                setPhase(
                                    "Complete"
                                );


                                setCompleted(
                                    true
                                );


                                return (
                                    sessionDuration
                                );

                            }


                            // ----------------------------------
                            // UPDATE PHASE
                            // ----------------------------------

                            setPhase(
                                getBreathingPhase(
                                    nextSeconds
                                )
                            );


                            return (
                                nextSeconds
                            );

                        }
                    );

                },
                1000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, [
        isRunning,
        sessionDuration
    ]);


    // ==========================================
    // START EXERCISE
    // ==========================================

    const startExercise = () => {

        setSeconds(
            0
        );


        setPhase(
            "Breathe In"
        );


        setCompleted(
            false
        );


        setIsRunning(
            true
        );

    };


    // ==========================================
    // STOP EXERCISE
    // ==========================================

    const stopExercise = () => {

        setIsRunning(
            false
        );


        setPhase(
            "Ready"
        );


        setSeconds(
            0
        );


        setCompleted(
            false
        );

    };


    // ==========================================
    // START AGAIN
    // ==========================================

    const startAgain = () => {

        startExercise();

    };


    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (
        totalSeconds
    ) => {

        const minutes =
            Math.floor(
                totalSeconds / 60
            );


        const secondsRemaining =
            totalSeconds % 60;


        return (
            `${minutes}:${String(
                secondsRemaining
            ).padStart(
                2,
                "0"
            )}`
        );

    };


    // ==========================================
    // PROGRESS
    // ==========================================

    const progress =
        Math.min(
            (
                seconds /
                sessionDuration
            ) * 100,
            100
        );


    // ==========================================
    // PHASE INSTRUCTION
    // ==========================================

    const getInstruction = () => {

        if (
            phase ===
            "Breathe In"
        ) {

            return (
                "Slowly breathe in through your nose 🌿"
            );

        }


        if (
            phase ===
            "Hold"
        ) {

            return (
                "Hold your breath gently..."
            );

        }


        if (
            phase ===
            "Breathe Out"
        ) {

            return (
                "Slowly breathe out and relax 😌"
            );

        }


        if (
            phase ===
            "Complete"
        ) {

            return (
                "Wonderful! Take a moment to notice how you feel. 💚"
            );

        }


        return (
            "Ready to begin?"
        );

    };


    // ==========================================
    // CIRCLE CLASS
    // ==========================================

    const getCircleClass = () => {

        if (
            completed
        ) {

            return (
                "breathing-circle breathing-complete"
            );

        }


        if (
            !isRunning
        ) {

            return (
                "breathing-circle"
            );

        }


        return (
            "breathing-circle breathing-active"
        );

    };


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="breathing-exercise">


            {/* ==================================
                ICON
            ================================== */}

            <div className="breathing-icon">
                🫁
            </div>


            {/* ==================================
                TITLE
            ================================== */}

            <h2>
                Guided Breathing
            </h2>


            <p className="breathing-subtitle">

                Take a moment to slow down, breathe
                deeply, and relax your mind.

            </p>


            {/* ==================================
                SESSION DURATION
            ================================== */}

            {!isRunning &&
            !completed && (

                <div className="breathing-duration">

                    <p>
                        Choose your session
                    </p>


                    <div className="breathing-duration-options">

                        {sessionOptions.map(
                            (option) => (

                                <button
                                    type="button"
                                    key={
                                        option.value
                                    }
                                    className={
                                        sessionDuration ===
                                        option.value
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        setSessionDuration(
                                            option.value
                                        )
                                    }
                                >
                                    {option.label}
                                </button>

                            )
                        )}

                    </div>

                </div>

            )}


            {/* ==================================
                BREATHING CIRCLE
            ================================== */}

            <div className={getCircleClass()}>

                <div className="breathing-circle-inner">

                    <span>
                        {phase}
                    </span>

                </div>

            </div>


            {/* ==================================
                INSTRUCTION
            ================================== */}

            <div className="breathing-instruction">

                <p>
                    {getInstruction()}
                </p>

            </div>


            {/* ==================================
                TIMER
            ================================== */}

            {(isRunning ||
            completed) && (

                <p className="breathing-timer">

                    {formatTime(
                        seconds
                    )}

                    {" / "}

                    {formatTime(
                        sessionDuration
                    )}

                </p>

            )}


            {/* ==================================
                PROGRESS BAR
            ================================== */}

            {(isRunning ||
            completed) && (

                <div className="breathing-progress">

                    <div
                        className="breathing-progress-bar"
                        style={{
                            width:
                                `${progress}%`
                        }}
                    />

                </div>

            )}


            {/* ==================================
                START BUTTON
            ================================== */}

            {!isRunning &&
            !completed && (

                <button
                    type="button"
                    className="breathing-start-button"
                    onClick={
                        startExercise
                    }
                >
                    🧘 Start Breathing
                </button>

            )}


            {/* ==================================
                STOP BUTTON
            ================================== */}

            {isRunning && (

                <button
                    type="button"
                    className="breathing-stop-button"
                    onClick={
                        stopExercise
                    }
                >
                    Stop Exercise
                </button>

            )}


            {/* ==================================
                START AGAIN
            ================================== */}

            {completed && (

                <button
                    type="button"
                    className="breathing-start-button"
                    onClick={
                        startAgain
                    }
                >
                    🔄 Start Again
                </button>

            )}

        </div>

    );

};


export default BreathingExercise;