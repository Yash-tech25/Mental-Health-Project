import {
    useEffect,
    useRef,
    useState
} from "react";


// =========================================================
// GROUNDING STEPS
// =========================================================

const groundingSteps = [

    {
        number:
            5,

        sense:
            "SEE",

        icon:
            "👀",

        title:
            "Name 5 things you can see",

        description:
            "Look around you slowly. Notice five things that are visible to you right now.",

        placeholder:
            "Example: a window, a plant, a blue wall...",

        animation:
            "see"
    },

    {
        number:
            4,

        sense:
            "FEEL",

        icon:
            "✋",

        title:
            "Notice 4 things you can feel",

        description:
            "Bring your attention to physical sensations around you.",

        placeholder:
            "Example: my feet on the floor, the chair beneath me...",

        animation:
            "feel"
    },

    {
        number:
            3,

        sense:
            "HEAR",

        icon:
            "👂",

        title:
            "Notice 3 things you can hear",

        description:
            "Pause and listen carefully. Notice sounds near and far.",

        placeholder:
            "Example: a fan, birds outside, my breathing...",

        animation:
            "hear"
    },

    {
        number:
            2,

        sense:
            "SMELL",

        icon:
            "👃",

        title:
            "Notice 2 things you can smell",

        description:
            "Take a gentle breath and notice any scents around you.",

        placeholder:
            "Example: fresh air, coffee, soap...",

        animation:
            "smell"
    },

    {
        number:
            1,

        sense:
            "TASTE",

        icon:
            "👅",

        title:
            "Notice 1 thing you can taste",

        description:
            "Bring your attention to your mouth and notice one taste.",

        placeholder:
            "Example: water, mint, the taste of your last meal...",

        animation:
            "taste"
    }

];


const GroundYourself = () => {

    // =========================================================
    // STATES
    // =========================================================

    const [
        started,
        setStarted
    ] = useState(false);


    const [
        step,
        setStep
    ] = useState(0);


    const [
        answer,
        setAnswer
    ] = useState("");


    const [
        answers,
        setAnswers
    ] = useState({});


    const [
        completed,
        setCompleted
    ] = useState(false);


    const [
        isTransitioning,
        setIsTransitioning
    ] = useState(false);


    // =========================================================
    // TRANSITION TIMER
    // =========================================================

    const transitionTimerRef =
        useRef(null);


    // =========================================================
    // CURRENT STEP
    // =========================================================

    const current =
        groundingSteps[
            step
        ];


    // =========================================================
    // CLEAR TRANSITION TIMER
    // =========================================================

    const clearTransitionTimer = () => {

        if (
            transitionTimerRef.current
        ) {

            clearTimeout(
                transitionTimerRef.current
            );


            transitionTimerRef.current =
                null;

        }

    };


    // =========================================================
    // START
    // =========================================================

    const startGrounding = () => {

        clearTransitionTimer();


        setStarted(
            true
        );


        setStep(
            0
        );


        setAnswer(
            ""
        );


        setAnswers(
            {}
        );


        setCompleted(
            false
        );


        setIsTransitioning(
            false
        );

    };


    // =========================================================
    // CONTINUE
    // =========================================================

    const continueStep = () => {

        if (
            !answer.trim() ||
            isTransitioning
        ) {

            return;

        }


        const updatedAnswers = {

            ...answers,

            [current.number]:
                answer.trim()

        };


        setAnswers(
            updatedAnswers
        );


        setIsTransitioning(
            true
        );


        clearTransitionTimer();


        transitionTimerRef.current =
            setTimeout(
                () => {

                    transitionTimerRef.current =
                        null;


                    if (
                        step ===
                        groundingSteps.length - 1
                    ) {

                        setCompleted(
                            true
                        );


                        setIsTransitioning(
                            false
                        );


                        return;

                    }


                    setStep(
                        (previousStep) =>
                            previousStep + 1
                    );


                    setAnswer(
                        ""
                    );


                    setIsTransitioning(
                        false
                    );

                },
                450
            );

    };


    // =========================================================
    // GO BACK
    // =========================================================

    const goBack = () => {

        if (
            step === 0 ||
            isTransitioning
        ) {

            return;

        }


        clearTransitionTimer();


        const previousStep =
            step - 1;


        setStep(
            previousStep
        );


        setAnswer(
            answers[
                groundingSteps[
                    previousStep
                ].number
            ] ||
            ""
        );

    };


    // =========================================================
    // RESET
    // =========================================================

    const resetExercise = () => {

        clearTransitionTimer();


        setStarted(
            false
        );


        setStep(
            0
        );


        setAnswer(
            ""
        );


        setAnswers(
            {}
        );


        setCompleted(
            false
        );


        setIsTransitioning(
            false
        );

    };


    // =========================================================
    // ENTER KEY
    // =========================================================

    const handleKeyDown = (
        event
    ) => {

        if (
            event.key ===
                "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();


            continueStep();

        }

    };


    // =========================================================
    // COMPONENT CLEANUP
    // =========================================================

    useEffect(() => {

        return () => {

            clearTransitionTimer();

        };

    }, []);


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="ground-yourself">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="ground-header">

                <div className="ground-header-icon">
                    🌿
                </div>

                <h2>
                    Ground Yourself
                </h2>

                <p>
                    Bring your attention back to the
                    present moment, one sense at a time.
                </p>

            </div>


            {/* =====================================================
                INTRO
            ===================================================== */}

            {!started &&
            !completed && (

                <div className="ground-intro">

                    <div className="ground-intro-icon">
                        🌱
                    </div>

                    <h3>
                        Come Back To The Present
                    </h3>

                    <p>
                        When your thoughts feel overwhelming,
                        your senses can help bring you back
                        to where you are right now.
                    </p>

                    <p>
                        We'll slowly notice:
                    </p>

                    <div className="ground-sense-preview">

                        <span>
                            👀 5 See
                        </span>

                        <span>
                            ✋ 4 Feel
                        </span>

                        <span>
                            👂 3 Hear
                        </span>

                        <span>
                            👃 2 Smell
                        </span>

                        <span>
                            👅 1 Taste
                        </span>

                    </div>

                    <button
                        type="button"
                        className="ground-start-button"
                        onClick={
                            startGrounding
                        }
                    >
                        🌿 Begin Grounding
                    </button>

                </div>

            )}


            {/* =====================================================
                GROUNDING STEP
            ===================================================== */}

            {started &&
            !completed && (

                <div
                    className={
                        `ground-step ground-step-${current.animation} ${
                            isTransitioning
                                ? "ground-transitioning"
                                : ""
                        }`
                    }
                >


                    {/* =============================================
                        PROGRESS
                    ============================================= */}

                    <div className="ground-progress">

                        {groundingSteps.map(
                            (
                                item,
                                index
                            ) => (

                                <div
                                    key={
                                        item.number
                                    }
                                    className={
                                        `ground-progress-dot ${
                                            index <=
                                            step
                                                ? "active"
                                                : ""
                                        }`
                                    }
                                />

                            )
                        )}

                    </div>


                    {/* =============================================
                        NUMBER
                    ============================================= */}

                    <div className="ground-step-number">
                        {current.number}
                    </div>


                    {/* =============================================
                        ANIMATION
                    ============================================= */}

                    <div className="ground-animation">

                        <div className="ground-sense-icon">
                            {current.icon}
                        </div>


                        {current.animation ===
                        "see" && (

                            <>

                                <span className="ground-see-star star-one">
                                    ✦
                                </span>

                                <span className="ground-see-star star-two">
                                    ✧
                                </span>

                                <span className="ground-see-star star-three">
                                    ·
                                </span>

                            </>

                        )}


                        {current.animation ===
                        "feel" && (

                            <>

                                <div className="ground-feel-ripple ripple-one" />

                                <div className="ground-feel-ripple ripple-two" />

                                <div className="ground-feel-ripple ripple-three" />

                            </>

                        )}


                        {current.animation ===
                        "hear" && (

                            <>

                                <div className="ground-sound-wave wave-one" />

                                <div className="ground-sound-wave wave-two" />

                                <div className="ground-sound-wave wave-three" />

                            </>

                        )}


                        {current.animation ===
                        "smell" && (

                            <>

                                <span className="ground-scent scent-one">
                                    ~
                                </span>

                                <span className="ground-scent scent-two">
                                    ~
                                </span>

                                <span className="ground-scent scent-three">
                                    ~
                                </span>

                            </>

                        )}


                        {current.animation ===
                        "taste" && (

                            <div className="ground-taste-glow" />

                        )}

                    </div>


                    {/* =============================================
                        LABEL
                    ============================================= */}

                    <div className="ground-sense-label">
                        {current.sense}
                    </div>


                    <h3>
                        {current.title}
                    </h3>


                    <p className="ground-description">
                        {current.description}
                    </p>


                    {/* =============================================
                        INPUT
                    ============================================= */}

                    <textarea
                        className="ground-input"
                        value={
                            answer
                        }
                        placeholder={
                            current.placeholder
                        }
                        onChange={
                            (event) =>
                                setAnswer(
                                    event.target.value
                                )
                        }
                        onKeyDown={
                            handleKeyDown
                        }
                        disabled={
                            isTransitioning
                        }
                    />


                    {/* =============================================
                        CONTINUE
                    ============================================= */}

                    <button
                        type="button"
                        className="ground-continue-button"
                        onClick={
                            continueStep
                        }
                        disabled={
                            !answer.trim() ||
                            isTransitioning
                        }
                    >

                        {step ===
                        groundingSteps.length - 1
                            ? "🌱 Finish Grounding"
                            : "Continue →"
                        }

                    </button>


                    {/* =============================================
                        BACK
                    ============================================= */}

                    {step > 0 && (

                        <button
                            type="button"
                            className="ground-back-button"
                            onClick={
                                goBack
                            }
                            disabled={
                                isTransitioning
                            }
                        >
                            ← Previous Sense
                        </button>

                    )}

                </div>

            )}


            {/* =====================================================
                COMPLETION
            ===================================================== */}

            {completed && (

                <div className="ground-complete">

                    <div className="ground-complete-animation">

                        <div className="ground-leaf">
                            🌱
                        </div>

                        <div className="ground-complete-circle circle-one" />

                        <div className="ground-complete-circle circle-two" />

                    </div>


                    <h3>
                        You are here.
                    </h3>


                    <p>
                        You took a few moments to notice
                        the world around you and reconnect
                        with the present.
                    </p>


                    <p>
                        Take one slow breath.
                        There's nowhere else you need
                        to be right now.
                    </p>


                    <button
                        type="button"
                        className="ground-start-again"
                        onClick={
                            startGrounding
                        }
                    >
                        🔄 Ground Myself Again
                    </button>

                </div>

            )}


            {/* =====================================================
                END
            ===================================================== */}

            {!completed && (

                <button
                    type="button"
                    className="ground-end-button"
                    onClick={
                        resetExercise
                    }
                >
                    ✕ End Exercise
                </button>

            )}

        </div>

    );

};


export default GroundYourself;