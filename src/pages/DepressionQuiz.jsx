import { useState } from "react";

import {
  DepressionResult
} from "../components/QuizResult";

import "../App.css";


const DepressionQuiz = () => {

  // =========================================================
  // QUESTIONS
  // =========================================================

  const questions = [

    {
      question:
        "I have lost interest in activities I used to enjoy.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have difficulty concentrating or making decisions.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have feelings of worthlessness or guilt.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have thoughts of death or suicide.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have changes in my appetite.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have changes in my sleep patterns.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have decreased energy levels.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have difficulty controlling my emotions.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have physical aches and pains.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

    {
      question:
        "I have withdrawn from social activities.",

      answers: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always"
      ],
    },

  ];


  // =========================================================
  // STATES
  // =========================================================

  const [
    score,
    setScore
  ] = useState(0);


  const [
    currentQuestion,
    setCurrentQuestion
  ] = useState(0);


  const [
    clickedOption,
    setClickedOption
  ] = useState(0);


  // Stores the answer to the suicide-related question.
  //
  // 1 = Never
  // 2 = Rarely
  // 3 = Sometimes
  // 4 = Often
  // 5 = Always

  const [
    safetyResponse,
    setSafetyResponse
  ] = useState(1);


  // =========================================================
  // QUIZ COMPLETE
  // =========================================================

  const isQuizOver =
    currentQuestion ===
    questions.length;


  // =========================================================
  // SELECT OPTION
  // =========================================================

  const handleOptionSelect = (
    optionValue
  ) => {

    setClickedOption(
      optionValue
    );


    /*
      Question index 3 is:

      "I have thoughts of death or suicide."

      We store this answer separately because
      an overall quiz score should not hide
      a concerning response to this question.
    */

    if (
      currentQuestion === 3
    ) {

      setSafetyResponse(
        optionValue
      );

    }

  };


  // =========================================================
  // CHANGE QUESTION
  // =========================================================

  const changeQuestion = () => {

    if (
      clickedOption === 0
    ) {

      return;

    }


    setScore(
      (previousScore) =>
        previousScore +
        clickedOption
    );


    setCurrentQuestion(
      (previousQuestion) =>
        previousQuestion + 1
    );


    setClickedOption(
      0
    );

  };


  // =========================================================
  // RESTART QUIZ
  // =========================================================

  const handleResetClick = () => {

    setScore(
      0
    );

    setCurrentQuestion(
      0
    );

    setClickedOption(
      0
    );

    setSafetyResponse(
      1
    );

  };


  // =========================================================
  // SAFETY MESSAGE
  // =========================================================

  const getSafetyMessage = () => {

    // Never
    if (
      safetyResponse === 1
    ) {

      return null;

    }


    // Rarely / Sometimes
    if (
      safetyResponse === 2 ||
      safetyResponse === 3
    ) {

      return {

        type:
          "support",

        title:
          "Your response deserves attention",

        message:
          "You indicated that thoughts about death or suicide have occurred. Even if they are occasional, consider talking about them with someone you trust or a qualified mental-health professional.",

      };

    }


    // Often / Always
    if (
      safetyResponse === 4 ||
      safetyResponse === 5
    ) {

      return {

        type:
          "urgent",

        title:
          "Please reach out for support",

        message:
          "You indicated that thoughts about death or suicide occur often. Please consider reaching out now to someone you trust or a qualified mental-health professional. If you feel you may act on these thoughts or are in immediate danger, seek emergency help immediately.",

      };

    }


    return null;

  };


  const safetyMessage =
    getSafetyMessage();


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="commonQuiz">

      <div className="container">


        {/* ===================================================
            TITLE
        =================================================== */}

        <h2>
          DEPRESSION TEST
        </h2>


        {!isQuizOver ? (

          <div className="Quiz-question-option">


            {/* ===============================================
                QUESTION
            =============================================== */}

            <h3>

              {
                questions[
                  currentQuestion
                ].question
              }

            </h3>


            {/* ===============================================
                OPTIONS
            =============================================== */}

            <p>

              {
                questions[
                  currentQuestion
                ].answers.map(
                  (
                    answer,
                    answerIndex
                  ) => {

                    const optionValue =
                      answerIndex + 1;


                    return (

                      <button
                        type="button"
                        className={
                          `option-btn ${
                            clickedOption ===
                            optionValue
                              ? "checked"
                              : ""
                          }`
                        }
                        key={
                          answer
                        }
                        onClick={() =>
                          handleOptionSelect(
                            optionValue
                          )
                        }
                      >

                        {answer}

                      </button>

                    );

                  }
                )
              }

            </p>


            {/* ===============================================
                NEXT BUTTON
            =============================================== */}

            <input
              type="button"
              value={
                currentQuestion ===
                questions.length - 1
                  ? "View Result"
                  : "Next"
              }
              id="next-button"
              onClick={
                changeQuestion
              }
              disabled={
                clickedOption === 0
              }
            />

          </div>

        ) : (

          <div>


            {/* ===============================================
                RESULT
            =============================================== */}

            <h2 className="result-heading">
              Result
            </h2>


            <h3 className="score">
              {score}
            </h3>


            <DepressionResult
              score={
                score
              }
            />


            {/* ===============================================
                SAFETY MESSAGE
            =============================================== */}

            {safetyMessage && (

              <div
                className={
                  `quiz-safety-message ${
                    safetyMessage.type ===
                    "urgent"
                      ? "quiz-safety-urgent"
                      : "quiz-safety-support"
                  }`
                }
                role="status"
              >

                <div className="quiz-safety-icon">

                  {safetyMessage.type ===
                  "urgent"
                    ? "🤝"
                    : "💛"}

                </div>


                <div>

                  <h3>
                    {safetyMessage.title}
                  </h3>


                  <p>
                    {safetyMessage.message}
                  </p>

                </div>

              </div>

            )}


            {/* ===============================================
                RESTART
            =============================================== */}

            <button
              type="button"
              onClick={
                handleResetClick
              }
              id="retake-button"
              className="button"
            >

              Restart Quiz

            </button>

          </div>

        )}

      </div>

    </div>

  );

};


export default DepressionQuiz;