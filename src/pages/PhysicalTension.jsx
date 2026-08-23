import {
    useEffect,
    useState
} from "react";


// =========================================================
// RELAXATION STEPS
// =========================================================

const steps = [

    {
        body:
            "Hands",

        icon:
            "🤲",

        instruction:
            "Gently make your hands into fists. Hold the tension softly.",

        release:
            "Now slowly release your hands. Feel your fingers become loose and warm."
    },

    {
        body:
            "Shoulders",

        icon:
            "🧘",

        instruction:
            "Gently raise your shoulders toward your ears. Don't strain.",

        release:
            "Now slowly let your shoulders fall. Feel the tension leave your body."
    },

    {
        body:
            "Face",

        icon:
            "😌",

        instruction:
            "Gently tighten the muscles around your face. Keep it comfortable.",

        release:
            "Now soften your forehead, your jaw, and your entire face."
    },

    {
        body:
            "Legs",

        icon:
            "🦵",

        instruction:
            "Gently tighten your legs and feet. Hold the tension softly.",

        release:
            "Now let your legs become heavy. Allow them to completely relax."
    },

    {
        body:
            "Whole Body",

        icon:
            "🌿",

        instruction:
            "Gently tense your whole body. Just enough to notice the difference.",

        release:
            "Now let everything go. Allow your entire body to become soft and heavy."
    }

];


// =========================================================
// TIMING
// =========================================================

const TENSION_DURATION =
    8;

const RELEASE_DURATION =
    12;


const PhysicalTension = () => {

    // =========================================================
    // STATES
    // =========================================================

    const [
        isRunning,
        setIsRunning
    ] = useState(false);


    const [
        currentStep,
        setCurrentStep
    ] = useState(0);


    const [
        phase,
        setPhase
    ] = useState("Ready");


    const [
        timeLeft,
        setTimeLeft
    ] = useState(0);


    const [
        completed,
        setCompleted
    ] = useState(false);


    // =========================================================
    // CURRENT STEP
    // =========================================================

    const currentStepData =
        steps[
            currentStep
        ];


    // =========================================================
    // CURRENT PHASE DURATION
    // =========================================================

    const phaseDuration =
        phase === "Tense"
            ? TENSION_DURATION
            : RELEASE_DURATION;


    // =========================================================
    // TIMER
    // =========================================================

    useEffect(() => {

        if (
            !isRunning
        ) {

            return;

        }


        const interval =
            setInterval(
                () => {

                    setTimeLeft(
                        (previousTime) => {

                            if (
                                previousTime > 1
                            ) {

                                return (
                                    previousTime - 1
                                );

                            }


                            // ==================================
                            // TENSION → RELEASE
                            // ==================================

                            if (
                                phase ===
                                "Tense"
                            ) {

                                setPhase(
                                    "Release"
                                );


                                return (
                                    RELEASE_DURATION
                                );

                            }


                            // ==================================
                            // RELEASE → NEXT STEP
                            // ==================================

                            if (
                                phase ===
                                "Release"
                            ) {

                                if (
                                    currentStep >=
                                    steps.length - 1
                                ) {

                                    setIsRunning(
                                        false
                                    );


                                    setCompleted(
                                        true
                                    );


                                    setPhase(
                                        "Complete"
                                    );


                                    return 0;

                                }


                                setCurrentStep(
                                    (previousStep) =>
                                        previousStep + 1
                                );


                                setPhase(
                                    "Tense"
                                );


                                return (
                                    TENSION_DURATION
                                );

                            }


                            return (
                                previousTime
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
        phase,
        currentStep
    ]);


    // =========================================================
    // START EXERCISE
    // =========================================================

    const startExercise = () => {

        setCurrentStep(
            0
        );


        setPhase(
            "Tense"
        );


        setTimeLeft(
            TENSION_DURATION
        );


        setCompleted(
            false
        );


        setIsRunning(
            true
        );

    };


    // =========================================================
    // END EXERCISE
    // =========================================================

    const endExercise = () => {

        setIsRunning(
            false
        );


        setCurrentStep(
            0
        );


        setPhase(
            "Ready"
        );


        setTimeLeft(
            0
        );


        setCompleted(
            false
        );

    };


    // =========================================================
    // START AGAIN
    // =========================================================

    const startAgain = () => {

        startExercise();

    };


    // =========================================================
    // PHASE PROGRESS
    // =========================================================

    const phaseProgress =
        phase === "Tense" ||
        phase === "Release"

            ? Math.min(
                Math.max(
                    (
                        (
                            phaseDuration -
                            timeLeft
                        ) /
                        phaseDuration
                    ) *
                    100,
                    0
                ),
                100
            )

            : 0;


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="physical-tension">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="physical-header">

                <div className="physical-icon">
                    💪
                </div>


                <h2>
                    Release Physical Tension
                </h2>


                <p>
                    Gently tense and release different
                    parts of your body. There is no need
                    to force anything.
                </p>

            </div>


            {/* =================================================
                START SCREEN
            ================================================= */}

            {!isRunning &&
            !completed && (

                <div className="physical-start">

                    <div className="physical-start-icon">
                        🌿
                    </div>


                    <h3>
                        Let Your Body Unwind
                    </h3>


                    <p>
                        We will slowly move through
                        different parts of your body.
                        Gently create some tension,
                        then let it completely go.
                    </p>


                    <button
                        type="button"
                        className="physical-start-button"
                        onClick={
                            startExercise
                        }
                    >
                        💆 Begin Exercise
                    </button>

                </div>

            )}


            {/* =================================================
                ACTIVE EXERCISE
            ================================================= */}

            {isRunning && (

                <div className="physical-session">


                    {/* =========================================
                        STEP
                    ========================================= */}

                    <div className="physical-progress-info">

                        <span>

                            Step {currentStep + 1}
                            {" "}
                            of
                            {" "}
                            {steps.length}

                        </span>

                    </div>


                    {/* =========================================
                        BODY ICON
                    ========================================= */}

                    <div
                        className={
                            `physical-body-icon ${
                                phase ===
                                "Tense"
                                    ? "physical-tensing"
                                    : "physical-releasing"
                            }`
                        }
                    >

                        {
                            currentStepData.icon
                        }

                    </div>


                    {/* =========================================
                        BODY PART
                    ========================================= */}

                    <h3>
                        {
                            currentStepData.body
                        }
                    </h3>


                    {/* =========================================
                        PHASE
                    ========================================= */}

                    <div className="physical-phase">

                        {phase ===
                        "Tense"
                            ? "Gently Tense"
                            : "Release & Relax"
                        }

                    </div>


                    {/* =========================================
                        INSTRUCTION
                    ========================================= */}

                    <p className="physical-instruction">

                        {phase ===
                        "Tense"

                            ? currentStepData
                                .instruction

                            : currentStepData
                                .release
                        }

                    </p>


                    {/* =========================================
                        VISUAL TIMER
                    ========================================= */}

                    <div className="physical-visual-timer">

                        <div
                            className={
                                `physical-timer-orb ${
                                    phase ===
                                    "Tense"
                                        ? "physical-orb-tense"
                                        : "physical-orb-release"
                                }`
                            }
                            style={{
                                "--phase-progress":
                                    `${phaseProgress}%`
                            }}
                        >

                            <div className="physical-timer-orb-inner">

                                <span>

                                    {phase ===
                                    "Tense"
                                        ? "Tense"
                                        : "Release"
                                    }

                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =========================================
                        PHASE MESSAGE
                    ========================================= */}

                    <p className="physical-phase-message">

                        {phase ===
                        "Tense"
                            ? "Hold gently..."
                            : "Let everything soften..."
                        }

                    </p>


                    {/* =========================================
                        END BUTTON
                    ========================================= */}

                    <button
                        type="button"
                        className="physical-end-button"
                        onClick={
                            endExercise
                        }
                    >
                        ✕ End Exercise
                    </button>

                </div>

            )}


            {/* =================================================
                COMPLETION
            ================================================= */}

            {completed && (

                <div className="physical-complete">

                    <div className="physical-complete-icon">
                        🌿
                    </div>


                    <div className="physical-complete-stars">
                        ✦ ✧ ✦
                    </div>


                    <h3>
                        Your body can relax now.
                    </h3>


                    <p>
                        Notice the difference between
                        tension and relaxation. Take a
                        slow breath and enjoy this moment
                        of calm.
                    </p>


                    <button
                        type="button"
                        className="physical-start-button"
                        onClick={
                            startAgain
                        }
                    >
                        🔄 Do It Again
                    </button>

                </div>

            )}

        </div>

    );

};


export default PhysicalTension;