import {
    useEffect,
    useRef,
    useState
} from "react";

import rainSound from "../assets/rain.mp3";
import oceanSound from "../assets/ocean.mp3";
import forestSound from "../assets/forest.mp3";


const AmbientSounds = () => {

    // ==========================================
    // SOUND OPTIONS
    // ==========================================

    const sounds = [

        {
            id:
                "rain",

            name:
                "Rain",

            icon:
                "🌧️",

            description:
                "Gentle rainfall to help you slow down.",

            url:
                rainSound
        },

        {
            id:
                "ocean",

            name:
                "Ocean",

            icon:
                "🌊",

            description:
                "Peaceful waves for a calming atmosphere.",

            url:
                oceanSound
        },

        {
            id:
                "forest",

            name:
                "Forest",

            icon:
                "🌲",

            description:
                "Relax with peaceful sounds of nature.",

            url:
                forestSound
        }

    ];


    // ==========================================
    // STATES
    // ==========================================

    const [
        selectedSound,
        setSelectedSound
    ] = useState(
        sounds[0]
    );


    const [
        isPlaying,
        setIsPlaying
    ] = useState(
        false
    );


    const [
        volume,
        setVolume
    ] = useState(
        0.5
    );


    // ==========================================
    // AUDIO REFERENCE
    // ==========================================

    const audioRef =
        useRef(null);


    // ==========================================
    // CREATE / REPLACE AUDIO
    // ==========================================

    useEffect(() => {

        const audio =
            new Audio(
                selectedSound.url
            );


        audio.loop =
            true;


        audio.volume =
            volume;


        audioRef.current =
            audio;


        return () => {

            audio.pause();

            audio.currentTime =
                0;


            if (
                audioRef.current ===
                audio
            ) {

                audioRef.current =
                    null;

            }

        };

    }, [
        selectedSound
    ]);


    // ==========================================
    // UPDATE VOLUME
    // ==========================================

    useEffect(() => {

        if (
            audioRef.current
        ) {

            audioRef.current.volume =
                volume;

        }

    }, [
        volume
    ]);


    // ==========================================
    // PLAY / PAUSE
    // ==========================================

    const togglePlay =
        async () => {

            const audio =
                audioRef.current;


            if (!audio) {

                return;

            }


            if (
                isPlaying
            ) {

                audio.pause();

                setIsPlaying(
                    false
                );

                return;

            }


            try {

                await audio.play();


                setIsPlaying(
                    true
                );

            } catch (error) {

                console.error(
                    "Unable to play audio:",
                    error
                );

            }

        };


    // ==========================================
    // CHANGE SOUND
    // ==========================================

    const selectSound =
        (sound) => {

            if (
                selectedSound.id ===
                sound.id
            ) {

                return;

            }


            if (
                audioRef.current
            ) {

                audioRef.current.pause();

                audioRef.current.currentTime =
                    0;

            }


            setIsPlaying(
                false
            );


            setSelectedSound(
                sound
            );

        };


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="ambient-sounds">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="ambient-header">

                <div className="ambient-icon">
                    🎵
                </div>


                <h2>
                    Ambient Sounds
                </h2>


                <p>
                    Choose a peaceful sound and create
                    a calming space for yourself.
                </p>

            </div>


            {/* ==================================
                SOUND OPTIONS
            ================================== */}

            <div className="ambient-sound-options">

                {sounds.map(
                    (sound) => (

                        <button
                            type="button"
                            key={
                                sound.id
                            }
                            className={
                                `ambient-sound-card ${
                                    selectedSound.id ===
                                    sound.id
                                        ? "selected"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                selectSound(
                                    sound
                                )
                            }
                        >

                            <div className="ambient-sound-icon">
                                {sound.icon}
                            </div>


                            <h3>
                                {sound.name}
                            </h3>


                            <p>
                                {sound.description}
                            </p>

                        </button>

                    )
                )}

            </div>


            {/* ==================================
                CURRENT SOUND
            ================================== */}

            <div className="ambient-player">

                <div className="ambient-current-icon">
                    {selectedSound.icon}
                </div>


                <h3>
                    {selectedSound.name}
                </h3>


                {/* ==================================
                    VOLUME
                ================================== */}

                <div className="ambient-volume">

                    <span>
                        🔈
                    </span>


                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={
                            volume
                        }
                        onChange={(event) =>
                            setVolume(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                        aria-label="Ambient sound volume"
                    />


                    <span>
                        🔊
                    </span>

                </div>


                {/* ==================================
                    PLAY BUTTON
                ================================== */}

                <button
                    type="button"
                    className="ambient-play-button"
                    onClick={
                        togglePlay
                    }
                >

                    {isPlaying
                        ? "⏸ Pause"
                        : "▶ Play"
                    }

                </button>

            </div>

        </div>

    );

};


export default AmbientSounds;