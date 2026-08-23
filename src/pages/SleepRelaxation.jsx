import {
    useEffect,
    useRef,
    useState
} from "react";

import whiteNoise from "../assets/white-noise.mp3";


// =========================================================
// SESSION SETTINGS
// =========================================================

const SESSION_DURATION = 300;


// =========================================================
// GUIDED SLEEP STAGES
// =========================================================

const sleepSteps = [

    {
        title:
            "Get Comfortable",

        duration:
            45,

        prompts: [

            {
                text:
                    "Find a comfortable position... and let yourself settle.",

                pause:
                    10000
            },

            {
                text:
                    "Let the surface beneath you support your body.",

                pause:
                    12000
            },

            {
                text:
                    "You don't need to do anything right now.",

                pause:
                    13000
            }

        ]

    },


    {
        title:
            "Relax Your Body",

        duration:
            45,

        prompts: [

            {
                text:
                    "Let your shoulders become soft.",

                pause:
                    12000
            },

            {
                text:
                    "Allow your jaw to loosen... just a little.",

                pause:
                    12000
            },

            {
                text:
                    "Let your hands become still and comfortable.",

                pause:
                    12000
            }

        ]

    },


    {
        title:
            "Slow Your Breathing",

        duration:
            45,

        prompts: [

            {
                text:
                    "Notice your breathing... without changing it.",

                pause:
                    12000
            },

            {
                text:
                    "When you're ready... breathe in gently.",

                pause:
                    12000
            },

            {
                text:
                    "And slowly... let the breath go.",

                pause:
                    12000
            }

        ]

    },


    {
        title:
            "Let Your Thoughts Drift",

        duration:
            45,

        prompts: [

            {
                text:
                    "If a thought appears... you don't need to follow it.",

                pause:
                    12000
            },

            {
                text:
                    "Let it drift away... like a cloud passing through the night sky.",

                pause:
                    13000
            },

            {
                text:
                    "And gently return to the quiet feeling of your breathing.",

                pause:
                    10000
            }

        ]

    },


    {
        title:
            "Feel Heavier",

        duration:
            60,

        prompts: [

            {
                text:
                    "Feel your body becoming a little heavier.",

                pause:
                    14000
            },

            {
                text:
                    "Your head can rest completely.",

                pause:
                    12000
            },

            {
                text:
                    "Your arms and legs can become warm... heavy... and still.",

                pause:
                    14000
            },

            {
                text:
                    "You are completely supported here.",

                pause:
                    10000
            }

        ]

    },


    {
        title:
            "Let Yourself Rest",

        duration:
            60,

        prompts: [

            {
                text:
                    "There is nowhere you need to be.",

                pause:
                    14000
            },

            {
                text:
                    "Nothing you need to solve tonight.",

                pause:
                    14000
            },

            {
                text:
                    "You have done enough for today.",

                pause:
                    12000
            },

            {
                text:
                    "Simply rest... and allow yourself to become peaceful.",

                pause:
                    16000
            }

        ]

    }

];


const SleepRelaxation = () => {

    // =========================================================
    // STATES
    // =========================================================

    const [
        isRunning,
        setIsRunning
    ] = useState(false);


    const [
        completed,
        setCompleted
    ] = useState(false);


    const [
        currentStep,
        setCurrentStep
    ] = useState(0);


    const [
        isSpeaking,
        setIsSpeaking
    ] = useState(false);


    // =========================================================
    // REFERENCES
    // =========================================================

    const whiteNoiseRef =
        useRef(null);


    const sessionActiveRef =
        useRef(false);


    const sessionTimerRef =
        useRef(null);


    const promptTimerRef =
        useRef(null);


    /*
      Every time a stage changes, this number changes.

      Old speech callbacks therefore become invalid
      and cannot start prompts from a previous stage.
    */

    const promptSequenceRef =
        useRef(0);


    // =========================================================
    // CREATE WHITE NOISE
    // =========================================================

    useEffect(() => {

        const audio =
            new Audio(
                whiteNoise
            );


        audio.loop =
            true;


        audio.volume =
            0.12;


        whiteNoiseRef.current =
            audio;


        return () => {

            audio.pause();

            audio.currentTime =
                0;


            if (
                whiteNoiseRef.current ===
                audio
            ) {

                whiteNoiseRef.current =
                    null;

            }

        };

    }, []);


    // =========================================================
    // START WHITE NOISE
    // =========================================================

    const startWhiteNoise = () => {

        const audio =
            whiteNoiseRef.current;


        if (!audio) {

            return;

        }


        audio.currentTime =
            0;


        audio.volume =
            0.12;


        audio
            .play()
            .catch(
                (error) => {

                    console.error(
                        "Unable to play white noise:",
                        error
                    );

                }
            );

    };


    // =========================================================
    // STOP WHITE NOISE
    // =========================================================

    const stopWhiteNoise = () => {

        const audio =
            whiteNoiseRef.current;


        if (!audio) {

            return;

        }


        audio.pause();


        audio.currentTime =
            0;

    };


    // =========================================================
    // CLEAR PROMPT TIMER
    // =========================================================

    const clearPromptTimer = () => {

        if (
            promptTimerRef.current
        ) {

            clearTimeout(
                promptTimerRef.current
            );


            promptTimerRef.current =
                null;

        }

    };


    // =========================================================
    // STOP VOICE
    // =========================================================

    const stopVoice = () => {

        /*
          Invalidate callbacks belonging
          to the previous prompt sequence.
        */

        promptSequenceRef.current +=
            1;


        clearPromptTimer();


        if (
            "speechSynthesis" in window
        ) {

            window.speechSynthesis.cancel();

        }


        setIsSpeaking(
            false
        );

    };


    // =========================================================
    // SPEAK
    // =========================================================

    const speak = (
        text,
        sequenceId,
        onFinished
    ) => {

        if (
            !sessionActiveRef.current ||
            sequenceId !==
                promptSequenceRef.current
        ) {

            return;

        }


        // -----------------------------------------
        // SPEECH NOT SUPPORTED
        // -----------------------------------------

        if (
            !(
                "speechSynthesis" in
                window
            )
        ) {

            if (
                onFinished
            ) {

                onFinished();

            }


            return;

        }


        const utterance =
            new SpeechSynthesisUtterance(
                text
            );


        // Slow and gentle delivery.

        utterance.rate =
            0.62;


        utterance.pitch =
            0.82;


        utterance.volume =
            0.9;


        utterance.onstart =
            () => {

                if (
                    sessionActiveRef.current &&
                    sequenceId ===
                        promptSequenceRef.current
                ) {

                    setIsSpeaking(
                        true
                    );

                }

            };


        utterance.onend =
            () => {

                if (
                    sequenceId !==
                    promptSequenceRef.current
                ) {

                    return;

                }


                setIsSpeaking(
                    false
                );


                if (
                    sessionActiveRef.current &&
                    onFinished
                ) {

                    onFinished();

                }

            };


        utterance.onerror =
            () => {

                if (
                    sequenceId ===
                    promptSequenceRef.current
                ) {

                    setIsSpeaking(
                        false
                    );

                }

            };


        window.speechSynthesis.speak(
            utterance
        );

    };


    // =========================================================
    // RUN PROMPT SEQUENCE
    // =========================================================

    const runPrompt = (
        stepIndex,
        promptIndex,
        sequenceId
    ) => {

        if (
            !sessionActiveRef.current ||
            sequenceId !==
                promptSequenceRef.current
        ) {

            return;

        }


        const step =
            sleepSteps[
                stepIndex
            ];


        const prompt =
            step?.prompts[
                promptIndex
            ];


        if (!prompt) {

            return;

        }


        speak(
            prompt.text,
            sequenceId,
            () => {

                if (
                    !sessionActiveRef.current ||
                    sequenceId !==
                        promptSequenceRef.current
                ) {

                    return;

                }


                /*
                  Last prompt of the stage:
                  nothing else needs scheduling.
                */

                if (
                    promptIndex >=
                    step.prompts.length - 1
                ) {

                    return;

                }


                promptTimerRef.current =
                    setTimeout(
                        () => {

                            runPrompt(
                                stepIndex,
                                promptIndex + 1,
                                sequenceId
                            );

                        },
                        prompt.pause
                    );

            }
        );

    };


    // =========================================================
    // START SESSION
    // =========================================================

    const startSession = () => {

        // -----------------------------------------
        // RESET PREVIOUS SESSION
        // -----------------------------------------

        if (
            sessionTimerRef.current
        ) {

            clearTimeout(
                sessionTimerRef.current
            );


            sessionTimerRef.current =
                null;

        }


        stopVoice();


        stopWhiteNoise();


        // -----------------------------------------
        // START NEW SESSION
        // -----------------------------------------

        sessionActiveRef.current =
            true;


        setCurrentStep(
            0
        );


        setCompleted(
            false
        );


        setIsRunning(
            true
        );


        startWhiteNoise();


        // -----------------------------------------
        // COMPLETE AFTER FIVE MINUTES
        // -----------------------------------------

        sessionTimerRef.current =
            setTimeout(
                () => {

                    if (
                        !sessionActiveRef.current
                    ) {

                        return;

                    }


                    sessionActiveRef.current =
                        false;


                    stopVoice();


                    stopWhiteNoise();


                    setIsRunning(
                        false
                    );


                    setCompleted(
                        true
                    );

                },
                SESSION_DURATION *
                    1000
            );

    };


    // =========================================================
    // END SESSION
    // =========================================================

    const endSession = () => {

        sessionActiveRef.current =
            false;


        if (
            sessionTimerRef.current
        ) {

            clearTimeout(
                sessionTimerRef.current
            );


            sessionTimerRef.current =
                null;

        }


        stopVoice();


        stopWhiteNoise();


        setIsRunning(
            false
        );


        setCompleted(
            false
        );


        setCurrentStep(
            0
        );

    };


    // =========================================================
    // START AGAIN
    // =========================================================

    const startAgain = () => {

        startSession();

    };


    // =========================================================
    // RUN CURRENT STAGE VOICE
    // =========================================================

    useEffect(() => {

        if (
            !isRunning ||
            !sessionActiveRef.current
        ) {

            return;

        }


        /*
          Cancel any pending voice/prompt
          from the previous stage.
        */

        stopVoice();


        /*
          stopVoice increments this value,
          so capture the new active sequence.
        */

        const sequenceId =
            promptSequenceRef.current;


        runPrompt(
            currentStep,
            0,
            sequenceId
        );

    }, [
        currentStep,
        isRunning
    ]);


    // =========================================================
    // MOVE BETWEEN STAGES
    // =========================================================

    useEffect(() => {

        if (
            !isRunning
        ) {

            return;

        }


        const step =
            sleepSteps[
                currentStep
            ];


        const stageTimer =
            setTimeout(
                () => {

                    if (
                        !sessionActiveRef.current
                    ) {

                        return;

                    }


                    if (
                        currentStep <
                        sleepSteps.length - 1
                    ) {

                        setCurrentStep(
                            (previousStep) =>
                                previousStep +
                                1
                        );

                    }

                },
                step.duration *
                    1000
            );


        return () => {

            clearTimeout(
                stageTimer
            );

        };

    }, [
        currentStep,
        isRunning
    ]);


    // =========================================================
    // COMPLETION VOICE
    // =========================================================

    useEffect(() => {

        if (
            !completed
        ) {

            return;

        }


        const completionTimer =
            setTimeout(
                () => {

                    if (
                        !(
                            "speechSynthesis" in
                            window
                        )
                    ) {

                        return;

                    }


                    window.speechSynthesis.cancel();


                    const utterance =
                        new SpeechSynthesisUtterance(

                            "Your relaxation session is complete... You can simply remain here... close your eyes... and allow yourself to rest."

                        );


                    utterance.rate =
                        0.58;


                    utterance.pitch =
                        0.8;


                    utterance.volume =
                        0.9;


                    window.speechSynthesis.speak(
                        utterance
                    );

                },
                700
            );


        return () => {

            clearTimeout(
                completionTimer
            );


            if (
                "speechSynthesis" in
                window
            ) {

                window.speechSynthesis.cancel();

            }

        };

    }, [
        completed
    ]);


    // =========================================================
    // COMPONENT CLEANUP
    // =========================================================

    useEffect(() => {

        return () => {

            sessionActiveRef.current =
                false;


            if (
                sessionTimerRef.current
            ) {

                clearTimeout(
                    sessionTimerRef.current
                );

            }


            clearPromptTimer();


            if (
                "speechSynthesis" in
                window
            ) {

                window.speechSynthesis.cancel();

            }


            if (
                whiteNoiseRef.current
            ) {

                whiteNoiseRef.current.pause();


                whiteNoiseRef.current.currentTime =
                    0;

            }

        };

    }, []);


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="sleep-relaxation">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="sleep-header">

                <div className="sleep-icon">
                    🌙
                </div>


                <h2>
                    Sleep & Relaxation
                </h2>


                <p>
                    Close your eyes, listen to the
                    guidance, and allow yourself to relax.
                </p>

            </div>


            {/* =================================================
                START SCREEN
            ================================================= */}

            {!isRunning &&
            !completed && (

                <div className="sleep-start-screen">

                    <div className="sleep-start-icon">
                        🌙
                    </div>


                    <h3>
                        Prepare to Rest
                    </h3>


                    <p>
                        Find a comfortable position,
                        close your eyes, and let the
                        guided voice gently lead you
                        through a peaceful relaxation
                        session.
                    </p>


                    <button
                        type="button"
                        className="sleep-start-button"
                        onClick={
                            startSession
                        }
                    >
                        🌙 Begin Relaxation
                    </button>

                </div>

            )}


            {/* =================================================
                ACTIVE SESSION
            ================================================= */}

            {isRunning && (

                <div className="sleep-session">


                    {/* NIGHT ANIMATION */}

                    <div className="sleep-animation">

                        <div className="sleep-moon">
                            🌙
                        </div>


                        <div className="sleep-star star-one">
                            ✦
                        </div>


                        <div className="sleep-star star-two">
                            ✧
                        </div>


                        <div className="sleep-star star-three">
                            ✦
                        </div>


                        <div className="sleep-star star-four">
                            ✧
                        </div>

                    </div>


                    {/* GUIDANCE */}

                    <div className="sleep-stage">

                        <span>

                            Stage {currentStep + 1}
                            {" "}
                            of
                            {" "}
                            {sleepSteps.length}

                        </span>


                        <h3>

                            {
                                sleepSteps[
                                    currentStep
                                ].title
                            }

                        </h3>


                        <div className="sleep-speaking">

                            {isSpeaking
                                ? "🔊 Listening..."
                                : "🌙 Rest quietly..."
                            }

                        </div>

                    </div>


                    {/* END SESSION */}

                    <div className="sleep-controls">

                        <button
                            type="button"
                            className="sleep-stop-button"
                            onClick={
                                endSession
                            }
                        >
                            ✕ End Session
                        </button>

                    </div>

                </div>

            )}


            {/* =================================================
                COMPLETION
            ================================================= */}

            {completed && (

                <div className="sleep-complete">

                    <div className="sleep-complete-moon">
                        🌙
                    </div>


                    <div className="sleep-complete-stars">
                        ✦　✧　✦　✧　✦
                    </div>


                    <h3>
                        You can let go now.
                    </h3>


                    <p>
                        Your guided relaxation is
                        complete. Close your eyes,
                        remain comfortable, and allow
                        yourself to rest.
                    </p>


                    <button
                        type="button"
                        className="sleep-start-button"
                        onClick={
                            startAgain
                        }
                    >
                        🔄 Relax Again
                    </button>

                </div>

            )}

        </div>

    );

};


export default SleepRelaxation;