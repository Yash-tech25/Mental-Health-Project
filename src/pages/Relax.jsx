import {
    useState
} from "react";

import BreathingExercise from "./BreathingExercise";
import AmbientSounds from "./AmbientSounds";
import MeditationGuide from "./MeditationGuide";
import SleepRelaxation from "./SleepRelaxation";
import StressRelief from "./StressRelief";


// =========================================================
// RELAXATION TOOLS
// =========================================================

const tools = [

    {
        id:
            "breathing",

        icon:
            "🫁",

        title:
            "Breathing Exercises",

        description:
            "Slow down, breathe deeply, and calm your mind."
    },

    {
        id:
            "meditation",

        icon:
            "🧘",

        title:
            "Meditation",

        description:
            "Take a peaceful moment to clear your thoughts."
    },

    {
        id:
            "sounds",

        icon:
            "🎵",

        title:
            "Ambient Sounds",

        description:
            "Relax with peaceful sounds from nature."
    },

    {
        id:
            "sleep",

        icon:
            "😴",

        title:
            "Sleep & Relaxation",

        description:
            "Prepare your mind and body for restful sleep."
    },

    {
        id:
            "stress",

        icon:
            "🌿",

        title:
            "Stress Relief",

        description:
            "Try simple techniques to release tension."
    }

];


// =========================================================
// TOOL COMPONENTS
// =========================================================

const toolComponents = {

    breathing:
        BreathingExercise,

    meditation:
        MeditationGuide,

    sounds:
        AmbientSounds,

    sleep:
        SleepRelaxation,

    stress:
        StressRelief

};


const Relax = () => {

    // =========================================================
    // SELECTED TOOL
    // =========================================================

    const [
        selectedTool,
        setSelectedTool
    ] = useState(
        null
    );


    // =========================================================
    // SELECTED COMPONENT
    // =========================================================

    const SelectedToolComponent =
        selectedTool
            ? toolComponents[
                selectedTool
              ]
            : null;


    // =========================================================
    // SELECT TOOL
    // =========================================================

    const handleToolSelect = (
        toolId
    ) => {

        setSelectedTool(
            toolId
        );

    };


    // =========================================================
    // CLOSE TOOL
    // =========================================================

    const closeTool = () => {

        setSelectedTool(
            null
        );

    };


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="relax-page">


            {/* =================================================
                INTRO
            ================================================= */}

            <div className="relax-intro">

                <h1>
                    🌿 Relax & Recharge
                </h1>


                <p>
                    Choose a relaxation tool that feels right for you.
                </p>

            </div>


            {/* =================================================
                RELAXATION TOOLS
            ================================================= */}

            <div className="relax-tools">

                {tools.map(
                    (tool) => (

                        <button
                            type="button"
                            key={
                                tool.id
                            }
                            className={
                                `relax-tool-card ${
                                    selectedTool ===
                                    tool.id
                                        ? "selected"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                handleToolSelect(
                                    tool.id
                                )
                            }
                        >

                            <div className="relax-tool-icon">
                                {tool.icon}
                            </div>


                            <h3>
                                {tool.title}
                            </h3>


                            <p>
                                {tool.description}
                            </p>

                        </button>

                    )
                )}

            </div>


            {/* =================================================
                SELECTED TOOL
            ================================================= */}

            {SelectedToolComponent && (

                <div className="selected-relax-tool">

                    <button
                        type="button"
                        className="close-tool-button"
                        onClick={
                            closeTool
                        }
                    >
                        ✕ Close
                    </button>


                    <SelectedToolComponent />

                </div>

            )}

        </div>

    );

};


export default Relax;