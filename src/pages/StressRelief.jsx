import { useState } from "react";
import PhysicalTension from "./PhysicalTension";
import MentalStress from "./MentalStress";
import GroundYourself from "./GroundYourself";

const StressRelief = () => {

    const [selectedMethod, setSelectedMethod] = useState(null);

    const methods = [
        {
            id: "physical",
            icon: "💪",
            title: "Release Physical Tension",
            description:
                "Gently tense and release different parts of your body to let go of physical stress."
        },

        {
            id: "mental",
            icon: "🧠",
            title: "Clear Your Mind",
            description:
                "Put your thoughts into words, separate what you can control, and let go of what you cannot."
        },

        {
            id: "grounding",
            icon: "🌎",
            title: "Ground Yourself",
            description:
                "Reconnect with the present moment using your five senses."
        }
    ];


    const selectMethod = (methodId) => {
        setSelectedMethod(methodId);
    };


    const renderMethod = () => {

        switch (selectedMethod) {

            case "physical":
                return <PhysicalTension />;

            case "mental":
                return <MentalStress />;

            case "grounding":
                return <GroundYourself />;

            default:
                return null;
        }
    };


    return (

        <div className="stress-relief">

            {/* =================================================
                METHOD SELECTED
            ================================================= */}

            {selectedMethod ? (

                <div className="stress-active-method">

                    {/* BACK TO METHODS */}

                    <button
                        type="button"
                        className="stress-back-methods"
                        onClick={() => setSelectedMethod(null)}
                    >
                        ← Back to Methods
                    </button>


                    {/* SELECTED EXERCISE */}

                    <div className="stress-active-content">
                        {renderMethod()}
                    </div>

                </div>

            ) : (

                /* =================================================
                   METHOD SELECTION SCREEN
                ================================================= */

                <>

                    <div className="stress-header">

                        <div className="stress-icon">
                            🌿
                        </div>

                        <h2>
                            Stress Relief
                        </h2>

                        <p>
                            Everyone experiences stress differently.
                            Choose what feels right for you right now.
                        </p>

                    </div>


                    <div className="stress-methods">

                        {methods.map((method) => (

                            <button
                                key={method.id}
                                type="button"
                                className="stress-method-card"
                                onClick={() =>
                                    selectMethod(method.id)
                                }
                            >

                                <div className="stress-method-icon">
                                    {method.icon}
                                </div>

                                <div className="stress-method-text">

                                    <h3>
                                        {method.title}
                                    </h3>

                                    <p>
                                        {method.description}
                                    </p>

                                </div>

                                <span className="stress-method-arrow">
                                    →
                                </span>

                            </button>

                        ))}

                    </div>

                </>

            )}

        </div>

    );
};

export default StressRelief;