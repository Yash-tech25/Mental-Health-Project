require("dotenv").config();

const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");


const {
    MongoClient,
    ObjectId
} = require("mongodb");

const { GoogleGenAI } = require("@google/genai");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =========================================================
// ENVIRONMENT
// =========================================================

const requiredEnvironmentVariables = [
    "MONGO_URI",
    "JWT_SECRET",
    "GEMINI_API_KEY",
    "NEWS_API_KEY"
];

const missingEnvironmentVariables =
    requiredEnvironmentVariables.filter(
        (name) =>
            !process.env[name] ||
            !process.env[name].trim()
    );

if (missingEnvironmentVariables.length > 0) {

    console.error(
        "Missing required environment variables:",
        missingEnvironmentVariables.join(", ")
    );

    process.exit(1);

}


const PORT =
    Number(process.env.PORT) ||
    5000;


// =========================================================
// EXPRESS
// =========================================================

const app =
    express();

app.use(
    cors()
);

app.use(
    express.json({
        limit:
            "1mb"
    })
);


// =========================================================
// GEMINI AI
// =========================================================

const ai =
    new GoogleGenAI({
        apiKey:
            process.env.GEMINI_API_KEY
    });


// =========================================================
// MONGODB
// =========================================================

const client =
    new MongoClient(
        process.env.MONGO_URI
    );

let db;

let usersCollection;
let moodsCollection;
let journalsCollection;
let wellnessCollection;

let server;


// =========================================================
// CONSTANTS
// =========================================================

const VALID_MOODS =
    new Set([
        "happy",
        "sad",
        "angry",
        "anxious"
    ]);


const VALID_SLEEP =
    new Set([
        "Poor",
        "Okay",
        "Good",
        "Excellent"
    ]);


const VALID_ENERGY =
    new Set([
        "Low",
        "Medium",
        "High"
    ]);


const VALID_STRESS =
    new Set([
        "Low",
        "Medium",
        "High"
    ]);


const DATE_PATTERN =
    /^\d{4}-\d{2}-\d{2}$/;


const HEX_COLOR_PATTERN =
    /^#[0-9a-fA-F]{6}$/;


// =========================================================
// HELPERS
// =========================================================

const databaseReady = () => {

    return Boolean(
        usersCollection &&
        moodsCollection &&
        journalsCollection &&
        wellnessCollection
    );

};


const normalizeEmail = (
    email
) => {

    return String(
        email || ""
    )
        .trim()
        .toLowerCase();

};


const isValidDateKey = (
    value
) => {

    if (
        typeof value !== "string" ||
        !DATE_PATTERN.test(value)
    ) {

        return false;

    }


    const [
        year,
        month,
        day
    ] = value
        .split("-")
        .map(Number);


    const date =
        new Date(
            year,
            month - 1,
            day
        );


    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );

};


const toNumberInRange = (
    value,
    minimum,
    maximum
) => {

    const number =
        Number(value);


    if (
        !Number.isFinite(number) ||
        number < minimum ||
        number > maximum
    ) {

        return null;

    }


    return number;

};


const calculateWellnessScore = ({
    sleep,
    water,
    exercise,
    meditation,
    energy,
    stress
}) => {

    let score = 0;


    // -----------------------------------------
    // SLEEP - 20 POINTS
    // -----------------------------------------

    const sleepScores = {

        Poor:
            5,

        Okay:
            10,

        Good:
            15,

        Excellent:
            20

    };


    score +=
        sleepScores[sleep] ||
        0;


    // -----------------------------------------
    // WATER - 20 POINTS
    // -----------------------------------------

    score +=
        Math.min(
            (water / 8) * 20,
            20
        );


    // -----------------------------------------
    // EXERCISE - 20 POINTS
    // -----------------------------------------

    score +=
        Math.min(
            (exercise / 60) * 20,
            20
        );


    // -----------------------------------------
    // MEDITATION - 15 POINTS
    // -----------------------------------------

    score +=
        Math.min(
            (meditation / 30) * 15,
            15
        );


    // -----------------------------------------
    // ENERGY - 15 POINTS
    // -----------------------------------------

    const energyScores = {

        Low:
            5,

        Medium:
            10,

        High:
            15

    };


    score +=
        energyScores[energy] ||
        0;


    // -----------------------------------------
    // STRESS - 10 POINTS
    // -----------------------------------------

    const stressScores = {

        Low:
            10,

        Medium:
            6,

        High:
            2

    };


    score +=
        stressScores[stress] ||
        0;


    return Math.round(
        score
    );

};


const sanitizeOptionalString = (
    value,
    fallback = null,
    maxLength = 100
) => {

    if (
        typeof value !== "string"
    ) {

        return fallback;

    }


    const trimmed =
        value.trim();


    if (!trimmed) {

        return fallback;

    }


    return trimmed.slice(
        0,
        maxLength
    );

};


const sanitizeColor = (
    value,
    fallback
) => {

    if (
        typeof value === "string" &&
        HEX_COLOR_PATTERN.test(value)
    ) {

        return value;

    }


    return fallback;

};


// =========================================================
// DATABASE INDEXES
// =========================================================

const createDatabaseIndexes =
    async () => {

        const indexTasks = [

            {
                name:
                    "users.email unique",

                run:
                    () =>
                        usersCollection.createIndex(
                            {
                                email:
                                    1
                            },
                            {
                                unique:
                                    true,

                                name:
                                    "unique_user_email"
                            }
                        )
            },

            {
                name:
                    "moods user history",

                run:
                    () =>
                        moodsCollection.createIndex(
                            {
                                userId:
                                    1,

                                createdAt:
                                    -1
                            },
                            {
                                name:
                                    "moods_user_createdAt"
                            }
                        )
            },

            {
                name:
                    "journals user history",

                run:
                    () =>
                        journalsCollection.createIndex(
                            {
                                userId:
                                    1,

                                createdAt:
                                    -1
                            },
                            {
                                name:
                                    "journals_user_createdAt"
                            }
                        )
            },

            {
                name:
                    "wellness user history",

                run:
                    () =>
                        wellnessCollection.createIndex(
                            {
                                userId:
                                    1,

                                createdAt:
                                    -1
                            },
                            {
                                name:
                                    "wellness_user_createdAt"
                            }
                        )
            },

            {
                name:
                    "wellness one entry per user per date",

                run:
                    () =>
                        wellnessCollection.createIndex(
                            {
                                userId:
                                    1,

                                date:
                                    1
                            },
                            {
                                unique:
                                    true,

                                name:
                                    "unique_wellness_user_date",

                                partialFilterExpression: {

                                    userId: {
                                        $type:
                                            "objectId"
                                    },

                                    date: {
                                        $type:
                                            "string"
                                    }

                                }
                            }
                        )
            }

        ];


        for (
            const task
            of indexTasks
        ) {

            try {

                await task.run();

            } catch (error) {

                console.error(
                    `Failed to create index (${task.name}):`,
                    error.message
                );

            }

        }

    };


// =========================================================
// AUTHENTICATION MIDDLEWARE
// =========================================================

const authenticateToken = (
    req,
    res,
    next
) => {

    const authHeader =
        req.headers.authorization;


    if (
        !authHeader ||
        !authHeader.startsWith(
            "Bearer "
        )
    ) {

        return res
            .status(401)
            .json({

                message:
                    "Authentication required"

            });

    }


    const token =
        authHeader
            .slice(
                7
            )
            .trim();


    if (!token) {

        return res
            .status(401)
            .json({

                message:
                    "Authentication required"

            });

    }


    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        if (
            !decoded.userId ||
            !ObjectId.isValid(
                decoded.userId
            )
        ) {

            return res
                .status(401)
                .json({

                    message:
                        "Invalid authentication token"

                });

        }


        req.user =
            decoded;


        next();

    } catch (error) {

        return res
            .status(401)
            .json({

                message:
                    "Invalid or expired token"

            });

    }

};


// =========================================================
// HEALTH CHECK
// =========================================================

app.get(
    "/api/health",
    (req, res) => {

        res.json({

            message:
                "Manora backend is running",

            database:
                databaseReady()
                    ? "connected"
                    : "connecting"

        });

    }
);


// =========================================================
// =========================================================
// AUTHENTICATION ROUTES
// =========================================================
// =========================================================


// =========================================================
// REGISTER USER
// =========================================================

app.post(
    "/api/auth/register",
    async (req, res) => {
                try {

            if (!usersCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            let {
                name,
                email,
                password
            } = req.body;


            if (
                typeof name !== "string" ||
                typeof email !== "string" ||
                typeof password !== "string"
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Name, email and password are required"

                    });

            }


            name =
                name.trim();


            email =
                normalizeEmail(
                    email
                );


            if (
                name.length < 2 ||
                name.length > 80
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Name must contain between 2 and 80 characters"

                    });

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email
                ) ||
                email.length > 254
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Please enter a valid email address"

                    });

            }


            if (
                password.length < 8 ||
                password.length > 128
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Password must contain between 8 and 128 characters"

                    });

            }


            const existingUser =
                await usersCollection
                    .findOne(
                        {
                            email:
                                email
                        },
                        {
                            projection: {
                                _id:
                                    1
                            }
                        }
                    );


            if (existingUser) {

                return res
                    .status(409)
                    .json({

                        message:
                            "An account with this email already exists"

                    });

            }


            const hashedPassword =
                await bcrypt.hash(
                    password,
                    12
                );


            const user = {

                name:
                    name,

                email:
                    email,

                password:
                    hashedPassword,

                createdAt:
                    new Date()

            };


            const result =
                await usersCollection
                    .insertOne(
                        user
                    );


            return res
                .status(201)
                .json({

                    message:
                        "Account created successfully",

                    user: {

                        _id:
                            result.insertedId,

                        name:
                            user.name,

                        email:
                            user.email,

                        createdAt:
                            user.createdAt

                    }

                });

        } catch (error) {

            if (
                error?.code ===
                11000
            ) {

                return res
                    .status(409)
                    .json({

                        message:
                            "An account with this email already exists"

                    });

            }


            console.error(
                "User registration error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to create account"

                });

        }

    }
);


// =========================================================
// LOGIN USER
// =========================================================

app.post(
    "/api/auth/login",
    async (req, res) => {

        try {

            if (!usersCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            const {
                email,
                password
            } = req.body;


            if (
                typeof email !== "string" ||
                typeof password !== "string"
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Email and password are required"

                    });

            }


            const normalizedEmail =
                normalizeEmail(
                    email
                );


            if (
                !normalizedEmail ||
                !password
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Email and password are required"

                    });

            }


            const user =
                await usersCollection
                    .findOne({

                        email:
                            normalizedEmail

                    });


            if (!user) {

                return res
                    .status(401)
                    .json({

                        message:
                            "Invalid email or password"

                    });

            }


            const passwordMatches =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatches) {

                return res
                    .status(401)
                    .json({

                        message:
                            "Invalid email or password"

                    });

            }


            const token =
                jwt.sign(
                    {

                        userId:
                            user._id.toString(),

                        email:
                            user.email

                    },

                    process.env.JWT_SECRET,

                    {

                        expiresIn:
                            "7d"

                    }
                );


            return res.json({

                message:
                    "Login successful",

                token:
                    token,

                user: {

                    _id:
                        user._id,

                    name:
                        user.name,

                    email:
                        user.email

                }

            });

        } catch (error) {

            console.error(
                "User login error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to login"

                });

        }

    }
);


// =========================================================
// GET CURRENT LOGGED-IN USER
// =========================================================

app.get(
    "/api/auth/me",
    authenticateToken,
    async (req, res) => {

        try {

            if (!usersCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            const user =
                await usersCollection
                    .findOne(
                        {

                            _id:
                                new ObjectId(
                                    req.user.userId
                                )

                        },
                        {

                            projection: {

                                password:
                                    0

                            }

                        }
                    );


            if (!user) {

                return res
                    .status(404)
                    .json({

                        message:
                            "User not found"

                    });

            }


            return res.json({

                user:
                    user

            });

        } catch (error) {

            console.error(
                "Current user error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to fetch user"

                });

        }

    }
);


// =========================================================
// =========================================================
// MOOD ROUTES
// =========================================================
// =========================================================


// =========================================================
// SAVE MOOD
// =========================================================

app.post(
    "/api/moods",
    authenticateToken,
    async (req, res) => {

        try {

            if (!moodsCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            const {
                mood,
                date
            } = req.body;


            if (
                typeof mood !== "string" ||
                !VALID_MOODS.has(
                    mood
                )
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Please select a valid mood"

                    });

            }


            if (
                date !== undefined &&
                date !== null &&
                !isValidDateKey(
                    date
                )
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Mood date must use YYYY-MM-DD format"

                    });

            }


            const moodEntry = {

                userId:
                    new ObjectId(
                        req.user.userId
                    ),

                mood:
                    mood,

                date:
                    date ||
                    null,

                createdAt:
                    new Date()

            };


            const result =
                await moodsCollection
                    .insertOne(
                        moodEntry
                    );


            return res
                .status(201)
                .json({

                    message:
                        "Mood saved successfully",

                    mood: {

                        ...moodEntry,

                        _id:
                            result.insertedId

                    }

                });

        } catch (error) {

            console.error(
                "Mood save error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to save mood"

                });

        }

    }
);


// =========================================================
// GET MOOD HISTORY
// =========================================================

app.get(
    "/api/moods",
    authenticateToken,
    async (req, res) => {

        try {

            if (!moodsCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            const moods =
                await moodsCollection
                    .find({

                        userId:
                            new ObjectId(
                                req.user.userId
                            )

                    })
                    .sort({

                        createdAt:
                            -1

                    })
                    .toArray();


            return res.json(
                moods
            );

        } catch (error) {

            console.error(
                "Mood history error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to fetch moods"

                });

        }

    }
);


// =========================================================
// =========================================================
// JOURNAL ROUTES
// =========================================================
// =========================================================


// =========================================================
// SAVE JOURNAL + GEMINI ANALYSIS
// =========================================================

app.post(
    "/api/journals",
    authenticateToken,
    async (req, res) => {

        try {

            if (!journalsCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            const {
                text,
                font,
                textColor,
                backgroundColor
            } = req.body;


            if (
                typeof text !== "string" ||
                !text.trim()
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Journal text is required"

                    });

            }


            const cleanText =
                text.trim();


            if (
                cleanText.length >
                10000
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Journal entry is too long. Please keep it under 10,000 characters."

                    });

            }


            const response =
                await ai.models
                    .generateContent({

                        model:
                            "gemini-3.5-flash-lite",

                        contents: `

You are an emotional wellness journal analyzer.

Analyze the following journal entry based on its meaning and context.

Important rules:

- Do not diagnose any mental health condition.
- Do not provide medical advice.
- Identify the main emotional tone.
- Consider the context of the entire entry.
- Do not classify an entry as positive just because it contains words such as "good", "great", or "happy".
- Understand phrases such as "I miss", "I wish", "I feel", "I regret", etc.
- If multiple meaningful emotions are present, include them in the emotions array.
- Keep the reflection supportive, gentle, and concise.
- Do not exaggerate the user's emotions.
- Do not make assumptions about things that are not written.

Return the result using the requested JSON structure.

Journal entry:

${cleanText}

`,

                        config: {

                            responseMimeType:
                                "application/json",

                            responseJsonSchema: {

                                type:
                                    "object",

                                properties: {

                                    tone: {

                                        type:
                                            "string"

                                    },

                                    emotions: {

                                        type:
                                            "array",

                                        items: {

                                            type:
                                                "string"

                                        }

                                    },

                                    reflection: {

                                        type:
                                            "string"

                                    }

                                },

                                required: [

                                    "tone",
                                    "emotions",
                                    "reflection"

                                ]

                            }

                        }

                    });


            const analysis =
                JSON.parse(
                    response.text
                );


            const journal = {

                userId:
                    new ObjectId(
                        req.user.userId
                    ),

                text:
                    cleanText,

                tone:
                    sanitizeOptionalString(
                        analysis.tone,
                        "Neutral",
                        80
                    ),

                emotions:
                    Array.isArray(
                        analysis.emotions
                    )
                        ? analysis.emotions
                            .filter(
                                (emotion) =>
                                    typeof emotion ===
                                    "string"
                            )
                            .map(
                                (emotion) =>
                                    emotion
                                        .trim()
                                        .slice(
                                            0,
                                            60
                                        )
                            )
                            .filter(Boolean)
                            .slice(
                                0,
                                10
                            )
                        : [],

                reflection:
                    sanitizeOptionalString(
                        analysis.reflection,
                        "",
                        1000
                    ),

                font:
                    sanitizeOptionalString(
                        font,
                        "Verdana",
                        60
                    ),

                textColor:
                    sanitizeColor(
                        textColor,
                        "#333333"
                    ),

                backgroundColor:
                    sanitizeColor(
                        backgroundColor,
                        "#fffdf7"
                    ),

                createdAt:
                    new Date()

            };


            const result =
                await journalsCollection
                    .insertOne(
                        journal
                    );


            return res
                .status(201)
                .json({

                    message:
                        "Journal analyzed and saved successfully",

                    journal: {

                        ...journal,

                        _id:
                            result.insertedId

                    }

                });

        } catch (error) {

            console.error(
                "Journal AI/save error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to analyze and save journal"

                });

        }

    }
);

// =========================================================
// GET JOURNAL HISTORY
// =========================================================

app.get(
    "/api/journals",
    authenticateToken,
    async (req, res) => {

        try {

            if (!journalsCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            const journals =
                await journalsCollection
                    .find({

                        userId:
                            new ObjectId(
                                req.user.userId
                            )

                    })
                    .sort({

                        createdAt:
                            -1

                    })
                    .toArray();


            return res.json(
                journals
            );

        } catch (error) {

            console.error(
                "Journal history error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to fetch journal history"

                });

        }

    }
);


// =========================================================
// =========================================================
// WELLNESS ROUTES
// =========================================================
// =========================================================


// =========================================================
// SAVE WELLNESS DATA
// ONLY ONE ENTRY PER USER PER DATE
// SCORE IS CALCULATED BY THE BACKEND
// =========================================================

app.post(
    "/api/wellness",
    authenticateToken,
    async (req, res) => {

        try {

            if (!wellnessCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            const {
                date,
                sleep,
                water,
                exercise,
                meditation,
                energy,
                stress
            } = req.body;


            if (
                !isValidDateKey(
                    date
                )
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Wellness date must use YYYY-MM-DD format"

                    });

            }


            if (
                !VALID_SLEEP.has(
                    sleep
                )
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Please select a valid sleep value"

                    });

            }


            if (
                !VALID_ENERGY.has(
                    energy
                )
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Please select a valid energy value"

                    });

            }


            if (
                !VALID_STRESS.has(
                    stress
                )
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Please select a valid stress value"

                    });

            }


            const safeWater =
                toNumberInRange(
                    water,
                    0,
                    8
                );


            const safeExercise =
                toNumberInRange(
                    exercise,
                    0,
                    120
                );


            const safeMeditation =
                toNumberInRange(
                    meditation,
                    0,
                    60
                );


            if (
                safeWater === null ||
                safeExercise === null ||
                safeMeditation === null
            ) {

                return res
                    .status(400)
                    .json({

                        message:
                            "Wellness activity values are invalid"

                    });

            }


            const userId =
                new ObjectId(
                    req.user.userId
                );


            const score =
                calculateWellnessScore({

                    sleep:
                        sleep,

                    water:
                        safeWater,

                    exercise:
                        safeExercise,

                    meditation:
                        safeMeditation,

                    energy:
                        energy,

                    stress:
                        stress

                });


            const wellness = {

                userId:
                    userId,

                date:
                    date,

                sleep:
                    sleep,

                water:
                    safeWater,

                exercise:
                    safeExercise,

                meditation:
                    safeMeditation,

                energy:
                    energy,

                stress:
                    stress,

                score:
                    score,

                createdAt:
                    new Date()

            };


            const result =
                await wellnessCollection
                    .insertOne(
                        wellness
                    );


            return res
                .status(201)
                .json({

                    message:
                        "Wellness data saved successfully",

                    wellness: {

                        ...wellness,

                        _id:
                            result.insertedId

                    }

                });

        } catch (error) {

            if (
                error?.code ===
                11000
            ) {

                return res
                    .status(409)
                    .json({

                        message:
                            "Today's wellness check-in has already been completed."

                    });

            }


            console.error(
                "Wellness save error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to save wellness data"

                });

        }

    }
);


// =========================================================
// GET WELLNESS HISTORY
// =========================================================

app.get(
    "/api/wellness",
    authenticateToken,
    async (req, res) => {

        try {

            if (!wellnessCollection) {

                return res
                    .status(503)
                    .json({

                        message:
                            "Database is still connecting"

                    });

            }


            const wellness =
                await wellnessCollection
                    .find({

                        userId:
                            new ObjectId(
                                req.user.userId
                            )

                    })
                    .sort({

                        createdAt:
                            -1

                    })
                    .toArray();


            return res.json(
                wellness
            );

        } catch (error) {

            console.error(
                "Wellness history error:",
                error
            );


            return res
                .status(500)
                .json({

                    message:
                        "Failed to fetch wellness history"

                });

        }

    }
);


// =========================================================
// =========================================================
// DAILY MENTAL HEALTH BLOGS
// =========================================================
// =========================================================

let cachedBlogs = [];
let cachedBlogDate = null;


// =========================================================
// GET DAILY MENTAL HEALTH ARTICLES
// =========================================================

app.get(
    "/api/blogs",
    authenticateToken,
    async (req, res) => {

        try {

            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];


            if (
                cachedBlogDate === today &&
                cachedBlogs.length > 0
            ) {

                return res.json(
                    cachedBlogs
                );

            }


            const query =
                encodeURIComponent(
                    '"mental health" OR "mental wellbeing" OR "mental well-being" OR "emotional wellbeing" OR "mental wellness" OR psychotherapy OR "stress management"'
                );


            const apiUrl =
                `https://newsapi.org/v2/everything` +
                `?q=${query}` +
                `&searchIn=title,description` +
                `&language=en` +
                `&sortBy=relevancy` +
                `&pageSize=100` +
                `&apiKey=${process.env.NEWS_API_KEY}`;


            const response =
                await fetch(
                    apiUrl
                );


            if (!response.ok) {

                throw new Error(
                    `NewsAPI returned status ${response.status}`
                );

            }


            const data =
                await response.json();


            if (
                data.status !== "ok" ||
                !Array.isArray(
                    data.articles
                )
            ) {

                throw new Error(
                    data.message ||
                    "Invalid response from NewsAPI"
                );

            }


            const strongTerms = [

                "mental health",
                "mental wellbeing",
                "mental well-being",
                "mental wellness",
                "emotional wellbeing",
                "emotional well-being",
                "psychotherapy",
                "psychotherapist",
                "mental illness",
                "mental healthcare",
                "mental health care"

            ];


            const supportingTerms = [

                "anxiety",
                "depression",
                "mindfulness",
                "therapy",
                "therapist",
                "stress management",
                "coping skills",
                "self-care",
                "emotional health",
                "psychological health",
                "panic attack",
                "burnout"

            ];


            const unwantedTerms = [

                "celebrity",
                "hollywood",
                "singer",
                "actor",
                "actress",
                "concert",
                "album",
                "movie",
                "box office",

                "football",
                "basketball",
                "cricket",
                "soccer",

                "wildfire",
                "earthquake",
                "hurricane",

                "shoplifting",
                "facial recognition",

                "minimum wage",

                "gene-editing",
                "gene editing",

                "opioid",
                "kratom",

                "leadership",
                "entrepreneur"

            ];


            const scoredArticles =
                data.articles

                    .filter(
                        (article) => {

                            return (
                                article &&
                                article.title &&
                                article.description &&
                                article.url &&
                                article.title !==
                                    "[Removed]"
                            );

                        }
                    )

                    .map(
                        (article) => {

                            const title =
                                article.title
                                    .toLowerCase();


                            const description =
                                article.description
                                    .toLowerCase();


                            const combined =
                                `${title} ${description}`;


                            let score = 0;


                            strongTerms.forEach(
                                (term) => {

                                    if (
                                        title.includes(
                                            term
                                        )
                                    ) {

                                        score += 6;

                                    } else if (
                                        description.includes(
                                            term
                                        )
                                    ) {

                                        score += 4;

                                    }

                                }
                            );


                            supportingTerms.forEach(
                                (term) => {

                                    if (
                                        title.includes(
                                            term
                                        )
                                    ) {

                                        score += 3;

                                    } else if (
                                        description.includes(
                                            term
                                        )
                                    ) {

                                        score += 1;

                                    }

                                }
                            );


                            unwantedTerms.forEach(
                                (term) => {

                                    if (
                                        combined.includes(
                                            term
                                        )
                                    ) {

                                        score -= 8;

                                    }

                                }
                            );


                            return {

                                score:
                                    score,

                                title:
                                    article.title,

                                description:
                                    article.description,

                                source:
                                    article.source?.name ||
                                    "Unknown source",

                                publishedAt:
                                    article.publishedAt,

                                url:
                                    article.url,

                                image:
                                    article.urlToImage ||
                                    null

                            };

                        }
                    )

                    .filter(
                        (article) =>
                            article.score >= 4
                    )

                    .sort(
                        (a, b) =>
                            b.score -
                            a.score
                    );


            const uniqueArticles = [];

            const seenUrls =
                new Set();

            const seenTitles =
                new Set();


            for (
                const article
                of scoredArticles
            ) {

                const normalizedTitle =
                    article.title
                        .toLowerCase()
                        .trim();


                if (
                    seenUrls.has(
                        article.url
                    ) ||
                    seenTitles.has(
                        normalizedTitle
                    )
                ) {

                    continue;

                }


                seenUrls.add(
                    article.url
                );


                seenTitles.add(
                    normalizedTitle
                );


                uniqueArticles.push({

                    title:
                        article.title,

                    description:
                        article.description,

                    source:
                        article.source,

                    publishedAt:
                        article.publishedAt,

                    url:
                        article.url,

                    image:
                        article.image

                });


                if (
                    uniqueArticles.length ===
                    5
                ) {

                    break;

                }

            }


            if (
                uniqueArticles.length ===
                0
            ) {

                throw new Error(
                    "No strongly relevant mental health articles found"
                );

            }


            cachedBlogs =
                uniqueArticles;


            cachedBlogDate =
                today;


            return res.json(
                cachedBlogs
            );

        } catch (error) {

            console.error(
                "Blog fetch error:",
                error
            );


            if (
                cachedBlogs.length >
                0
            ) {

                return res.json(
                    cachedBlogs
                );

            }


            return res
                .status(500)
                .json({

                    message:
                        "Unable to fetch mental health articles"

                });

        }

    }
);

// =========================================================
// UNKNOWN API ROUTE
// =========================================================

app.use(
    "/api",
    (req, res) => {

        return res
            .status(404)
            .json({

                message:
                    "API route not found"

            });

    }
);


// =========================================================
// START SERVER
// =========================================================

const startServer =
    async () => {

        try {

            await client.connect();


            console.log(
                "MongoDB connected successfully"
            );


            db =
                client.db(
                    "manora"
                );


            usersCollection =
                db.collection(
                    "users"
                );


            moodsCollection =
                db.collection(
                    "moods"
                );


            journalsCollection =
                db.collection(
                    "journals"
                );


            wellnessCollection =
                db.collection(
                    "wellness"
                );


            await createDatabaseIndexes();


            server =
                app.listen(
                    PORT,
                    () => {

                        console.log(
                            `Server running on http://localhost:${PORT}`
                        );

                    }
                );

        } catch (error) {

            console.error(
                "Failed to start Manora backend:",
                error
            );


            try {

                await client.close();

            } catch (closeError) {

                console.error(
                    "MongoDB cleanup error:",
                    closeError
                );

            }


            process.exit(1);

        }

    };


// =========================================================
// GRACEFUL SHUTDOWN
// =========================================================

let shuttingDown =
    false;


const gracefulShutdown =
    async (
        signal
    ) => {

        if (
            shuttingDown
        ) {

            return;

        }


        shuttingDown =
            true;


        console.log(
            `${signal} received. Shutting down Manora backend...`
        );


        const closeMongo =
            async () => {

                try {

                    await client.close();


                    console.log(
                        "MongoDB connection closed"
                    );

                } catch (error) {

                    console.error(
                        "MongoDB shutdown error:",
                        error
                    );

                }

            };


        if (server) {

            server.close(
                async () => {

                    await closeMongo();

                    process.exit(0);

                }
            );


            setTimeout(
                async () => {

                    console.error(
                        "Forced shutdown after timeout"
                    );


                    await closeMongo();

                    process.exit(1);

                },
                5000
            ).unref();

        } else {

            await closeMongo();

            process.exit(0);

        }

    };


process.on(
    "SIGINT",
    () =>
        gracefulShutdown(
            "SIGINT"
        )
);


process.on(
    "SIGTERM",
    () =>
        gracefulShutdown(
            "SIGTERM"
        )
);


// =========================================================
// RUN
// =========================================================

startServer();