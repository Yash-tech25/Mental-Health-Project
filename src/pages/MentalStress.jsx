import { useEffect, useState } from "react";

const MentalStress = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [thought, setThought] = useState("");
    const [category, setCategory] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [isReleasing, setIsReleasing] = useState(false);

    // =========================================================
    // FIVE WAYS TO HANDLE A THOUGHT
    // =========================================================

    const categories = [
        {
            id: "float",
            icon: "🌬️",
            title: "Let it float away",
            description:
                "You don't need to hold onto this thought right now."
        },

        {
            id: "later",
            icon: "📦",
            title: "Put it aside for later",
            description:
                "This can wait. Give yourself permission to return to it later."
        },

        {
            id: "down",
            icon: "🪨",
            title: "Set it down",
            description:
                "You've been carrying this thought. You can put it down for now."
        },

        {
            id: "action",
            icon: "🌱",
            title: "Turn it into one small step",
            description:
                "If you can influence it, choose one tiny thing you can do."
        },

        {
            id: "accept",
            icon: "☁️",
            title: "Simply acknowledge it",
            description:
                "You don't have to fix every thought. Sometimes noticing is enough."
        }
    ];


    // =========================================================
    // CONTINUE
    // =========================================================

    const continueToSorting = () => {

        if (!thought.trim()) {
            return;
        }

        setCurrentStep(1);
    };


    // =========================================================
    // SELECT CATEGORY
    // =========================================================

    const selectCategory = (categoryId) => {

        setCategory(categoryId);
        setIsReleasing(false);
        setCurrentStep(2);

    };


    // =========================================================
    // START RELEASE
    // =========================================================

    const startRelease = () => {

        if (isReleasing) {
            return;
        }

        setIsReleasing(true);

    };


    // =========================================================
    // RESET
    // =========================================================

    const resetExercise = () => {

        setCurrentStep(0);
        setThought("");
        setCategory(null);
        setCompleted(false);
        setIsReleasing(false);

    };


    // =========================================================
    // GO BACK
    // =========================================================

    const goBackToOptions = () => {

        setIsReleasing(false);
        setCurrentStep(1);

    };


    // =========================================================
    // SELECTED CATEGORY
    // =========================================================

    const selectedCategory = categories.find(
        (item) => item.id === category
    );


    // =========================================================
    // ANIMATION DURATIONS
    // =========================================================

    const animationDurations = {
        float: 4200,
        later: 4000,
        down: 4000,
        action: 3600,
        accept: 3200
    };


    // =========================================================
    // COMPLETE AFTER CORRESPONDING ANIMATION
    // =========================================================

    useEffect(() => {

        if (!isReleasing || !category) {
            return;
        }

        const duration =
            animationDurations[category] || 4000;

        const timer = setTimeout(() => {

            setCompleted(true);
            setIsReleasing(false);

        }, duration);

        return () => clearTimeout(timer);

    }, [isReleasing, category]);


    // =========================================================
    // MESSAGE
    // =========================================================

    const getMessage = () => {

        switch (category) {

            case "float":
                return (
                    <>
                        You don't need to carry this thought right now.
                        <br />
                        Let it become a little lighter.
                    </>
                );

            case "later":
                return (
                    <>
                        This thought can wait.
                        <br />
                        You are allowed to give your mind some quiet space.
                    </>
                );

            case "down":
                return (
                    <>
                        You've been carrying this for a while.
                        <br />
                        For now, you can simply set it down.
                    </>
                );

            case "action":
                return (
                    <>
                        You don't have to solve everything.
                        <br />
                        One small step is enough.
                    </>
                );

            case "accept":
                return (
                    <>
                        You noticed the thought.
                        <br />
                        You don't have to fight it or fix it.
                    </>
                );

            default:
                return null;
        }

    };


    // =========================================================
    // BUTTON TEXT
    // =========================================================

    const getActionButtonText = () => {

        switch (category) {

            case "float":
                return "🌬️ Let It Float Away";

            case "later":
                return "📦 Put It Aside";

            case "down":
                return "🪨 Set It Down";

            case "action":
                return "🌱 Take One Small Step";

            case "accept":
                return "☁️ Acknowledge It";

            default:
                return "🌿 Let It Happen";
        }

    };


    // =========================================================
    // PROGRESS MESSAGE
    // =========================================================

    const getProgressMessage = () => {

        switch (category) {

            case "float":
                return "Take a slow breath and watch it drift away...";

            case "later":
                return "You can return to this when you are ready...";

            case "down":
                return "Let your shoulders soften as you put it down...";

            case "action":
                return "Let the thought become something small and manageable...";

            case "accept":
                return "Notice the thought without holding onto it...";

            default:
                return "Take a slow breath...";

        }

    };


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="mental-stress">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mental-header">

                <div className="mental-icon">
                    🧠
                </div>

                <h2>
                    Clear Your Mind
                </h2>

                <p>
                    You don't have to solve everything
                    right now. Let's gently make some
                    space in your mind.
                </p>

            </div>


            {/* =================================================
                STEP 1
            ================================================= */}

            {currentStep === 0 && !completed && (

                <div className="mental-step">

                    <div className="mental-step-number">
                        1
                    </div>

                    <div className="mental-step-icon">
                        ☁️
                    </div>

                    <h3>
                        Empty Your Mind
                    </h3>

                    <p className="mental-step-description">

                        Is there something that's been
                        occupying your thoughts?

                        <br />

                        You don't need to explain it perfectly.
                        Just put it into words.

                    </p>


                    <textarea
                        className="mental-thought-input"
                        placeholder="Write whatever is on your mind..."
                        value={thought}
                        onChange={(event) =>
                            setThought(event.target.value)
                        }
                    />


                    <button
                        type="button"
                        className="mental-continue-button"
                        onClick={continueToSorting}
                        disabled={!thought.trim()}
                    >
                        Continue →
                    </button>

                </div>

            )}


            {/* =================================================
                STEP 2
            ================================================= */}

            {currentStep === 1 && !completed && (

                <div className="mental-step">

                    <div className="mental-step-number">
                        2
                    </div>

                    <div className="mental-step-icon">
                        🌿
                    </div>

                    <h3>
                        How Would You Like To Handle It?
                    </h3>

                    <p className="mental-step-description">

                        There isn't a right answer.

                        <br />

                        Choose whatever feels most helpful
                        right now.

                    </p>


                    <div className="mental-category-options">

                        {categories.map((item) => (

                            <button
                                key={item.id}
                                type="button"
                                className="mental-category-card"
                                onClick={() =>
                                    selectCategory(item.id)
                                }
                            >

                                <div className="mental-category-icon">
                                    {item.icon}
                                </div>

                                <div className="mental-category-content">

                                    <h4>
                                        {item.title}
                                    </h4>

                                    <p>
                                        {item.description}
                                    </p>

                                </div>

                            </button>

                        ))}

                    </div>


                    <button
                        type="button"
                        className="mental-back-button"
                        onClick={() =>
                            setCurrentStep(0)
                        }
                    >
                        ← Change Thought
                    </button>

                </div>

            )}


            {/* =================================================
                STEP 3
            ================================================= */}

            {currentStep === 2 && !completed && (

                <div className="mental-step mental-release-step">

                    <div className="mental-step-number">
                        3
                    </div>


                    {/* =================================================
                        ANIMATION AREA

                        IMPORTANT:
                        category class and releasing class are
                        deliberately on THE SAME element.
                    ================================================= */}

                    <div
                        className={`mental-thought-animation
                            mental-animation-${category}
                            ${isReleasing ? "mental-is-releasing" : ""}
                        `}
                    >

                        <div className="mental-thought-bubble">

                            <span>
                                {selectedCategory?.icon}
                            </span>

                            <p>
                                {thought}
                            </p>

                        </div>


                        {/* PARTICLES */}

                        <div className="mental-thought-particle particle-one">
                            ✦
                        </div>

                        <div className="mental-thought-particle particle-two">
                            ✧
                        </div>

                        <div className="mental-thought-particle particle-three">
                            ·
                        </div>

                    </div>


                    {/* TITLE */}

                    <h3>
                        {selectedCategory?.title}
                    </h3>


                    {/* MESSAGE */}

                    <div className="mental-release-message">

                        <p>
                            {getMessage()}
                        </p>

                    </div>


                    {/* ACTION BUTTON */}

                    {!isReleasing && (

                        <button
                            type="button"
                            className="mental-release-button"
                            onClick={startRelease}
                        >
                            {getActionButtonText()}
                        </button>

                    )}


                    {/* PROGRESS */}

                    {isReleasing && (

                        <p className="mental-release-progress">
                            {getProgressMessage()}
                        </p>

                    )}


                    {/* BACK */}

                    {!isReleasing && (

                        <button
                            type="button"
                            className="mental-back-button"
                            onClick={goBackToOptions}
                        >
                            ← Choose Again
                        </button>

                    )}

                </div>

            )}


            {/* =================================================
                COMPLETION
            ================================================= */}

            {completed && (

                <div className="mental-complete">

                    <div className="mental-complete-animation">

                        <div className="mental-floating-cloud">
                            ☁️
                        </div>

                        <div className="mental-complete-stars">
                            ✦　✧　✦
                        </div>

                    </div>


                    <h3>
                        Your mind has a little more space now.
                    </h3>


                    <p>

                        You don't need to think about
                        everything at this moment.

                        <br />

                        Take a slow breath and give yourself
                        permission to simply be here.

                    </p>


                    <button
                        type="button"
                        className="mental-start-button"
                        onClick={resetExercise}
                    >
                        🔄 Clear Another Thought
                    </button>

                </div>

            )}


            {/* =================================================
                END EXERCISE
            ================================================= */}

            {!completed && (

                <button
                    type="button"
                    className="mental-end-button"
                    onClick={resetExercise}
                >
                    ✕ End Exercise
                </button>

            )}

        </div>

    );

};

export default MentalStress;