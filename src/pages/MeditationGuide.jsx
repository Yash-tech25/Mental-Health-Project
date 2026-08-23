import {
    useEffect,
    useState
} from "react";


// ==========================================
// CALM MEDITATION STEPS
// ==========================================

const meditationSteps = [

    {
        title:
            "Settle In",

        text:
            "Find a comfortable position. Let your body become still and allow yourself to arrive in this moment.",

        duration:
            15
    },

    {
        title:
            "Relax Your Body",

        text:
            "Notice your shoulders. If they feel tense, let them soften. Allow your jaw and hands to relax.",

        duration:
            15
    },

    {
        title:
            "Notice Your Breathing",

        text:
            "Bring your attention to your natural breathing. You don't need to change it. Just notice it.",

        duration:
            20
    },

    {
        title:
            "Release Tension",

        text:
            "With every gentle exhale, imagine letting go of a little tension you have been carrying.",

        duration:
            20
    },

    {
        title:
            "Let Thoughts Pass",

        text:
            "Thoughts may appear. That's okay. You don't need to follow them. Let them pass and gently return to this moment.",

        duration:
            20
    },

    {
        title:
            "Simply Be",

        text:
            "For these final moments, there is nothing you need to accomplish. Simply sit, breathe, and be here.",

        duration:
            20
    }

];


const MeditationGuide = () => {

    // ==========================================
    // STATES
    // ==========================================

    const [
        currentStep,
        setCurrentStep
    ] = useState(0);


    const [
        isRunning,
        setIsRunning
    ] = useState(false);


    const [
        completed,
        setCompleted
    ] = useState(false);


    const [
        stepSeconds,
        setStepSeconds
    ] = useState(0);


    // ==========================================
    // CURRENT STEP
    // ==========================================

    const currentMeditationStep =
        meditationSteps[
            currentStep
        ];


    // ==========================================
    // AUTOMATIC STEP PROGRESSION
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

                    setStepSeconds(
                        (previousSeconds) => {

                            const nextSeconds =
                                previousSeconds + 1;


                            if (
                                nextSeconds >=
                                currentMeditationStep.duration
                            ) {

                                if (
                                    currentStep <
                                    meditationSteps.length - 1
                                ) {

                                    setCurrentStep(
                                        (previousStep) =>
                                            previousStep + 1
                                    );


                                    return 0;

                                }


                                setIsRunning(
                                    false
                                );


                                setCompleted(
                                    true
                                );


                                return 0;

                            }


                            return nextSeconds;

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
        currentStep,
        currentMeditationStep.duration
    ]);


    // ==========================================
    // START MEDITATION
    // ==========================================

    const startMeditation = () => {

        setCurrentStep(
            0
        );


        setStepSeconds(
            0
        );


        setCompleted(
            false
        );


        setIsRunning(
            true
        );

    };


    // ==========================================
    // NEXT STEP
    // ==========================================

    const nextStep = () => {

        if (
            currentStep <
            meditationSteps.length - 1
        ) {

            setCurrentStep(
                (previousStep) =>
                    previousStep + 1
            );


            setStepSeconds(
                0
            );


            return;

        }


        setIsRunning(
            false
        );


        setCompleted(
            true
        );

    };


    // ==========================================
    // STOP MEDITATION
    // ==========================================

    const stopMeditation = () => {

        setIsRunning(
            false
        );


        setCurrentStep(
            0
        );


        setStepSeconds(
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

        startMeditation();

    };


    // ==========================================
    // PROGRESS
    // ==========================================

    const stepProgress =
        Math.min(
            (
                stepSeconds /
                currentMeditationStep.duration
            ) * 100,
            100
        );


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="meditation-guide">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="meditation-header">

                <div className="meditation-icon">
                    🧘
                </div>

                <h2>
                    Meditation Guide
                </h2>

                <p>
                    Take a quiet moment to slow down,
                    breathe, and reconnect with yourself.
                </p>

            </div>


            {/* ==================================
                INTRO / START SCREEN
            ================================== */}

            {!isRunning &&
            !completed && (

                <div className="meditation-start">

                    <div className="meditation-start-icon">
                        🌿
                    </div>

                    <h3>
                        Calm Your Mind
                    </h3>

                    <p>
                        Follow a gentle guided meditation
                        designed to help you slow down,
                        release tension, and find a little
                        peace.
                    </p>

                    <button
                        type="button"
                        className="meditation-start-button"
                        onClick={
                            startMeditation
                        }
                    >
                        🧘 Begin Meditation
                    </button>

                </div>

            )}


            {/* ==================================
                ACTIVE MEDITATION
            ================================== */}

            {isRunning && (

                <div className="meditation-session">


                    <div className="meditation-animation">

                        <div className="meditation-orb">

                            <div className="meditation-orb-inner">

                                <span>
                                    🌿
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="meditation-step-info">

                        <span>
                            Step {currentStep + 1}
                            {" "}
                            of
                            {" "}
                            {meditationSteps.length}
                        </span>

                        <h3>
                            {currentMeditationStep.title}
                        </h3>

                        <p>
                            {currentMeditationStep.text}
                        </p>

                    </div>


                    <div className="meditation-step-progress">

                        <div
                            className="meditation-step-progress-bar"
                            style={{
                                width:
                                    `${stepProgress}%`
                            }}
                        />

                    </div>


                    <div className="meditation-controls">

                        <button
                            type="button"
                            className="meditation-next-button"
                            onClick={
                                nextStep
                            }
                        >

                            {currentStep ===
                            meditationSteps.length - 1
                                ? "Finish"
                                : "Next →"}

                        </button>


                        <button
                            type="button"
                            className="meditation-stop-button"
                            onClick={
                                stopMeditation
                            }
                        >
                            ✕ End Session
                        </button>

                    </div>

                </div>

            )}


            {/* ==================================
                COMPLETION
            ================================== */}

            {completed && (

                <div className="meditation-victory">

                    <div className="victory-particle particle-one">
                        ✦
                    </div>

                    <div className="victory-particle particle-two">
                        ✧
                    </div>

                    <div className="victory-particle particle-three">
                        ✦
                    </div>

                    <div className="victory-particle particle-four">
                        ✧
                    </div>


                    <div className="victory-orb">

                        <div className="victory-orb-inner">
                            🌱
                        </div>

                    </div>


                    <h3>
                        You made space for yourself.
                    </h3>

                    <p>
                        You completed your meditation.
                        Take a moment to notice how
                        your mind and body feel.
                    </p>


                    <div className="victory-message">
                        ✨ Well done. You showed up
                        for yourself.
                    </div>


                    <button
                        type="button"
                        className="meditation-start-button"
                        onClick={
                            startAgain
                        }
                    >
                        🔄 Meditate Again
                    </button>

                </div>

            )}

        </div>

    );

};


export default MeditationGuide;