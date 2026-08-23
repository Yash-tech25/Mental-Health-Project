import { useState } from "react";

import {
  AdhdResult
} from "../components/QuizResult";


const ADHDQuiz = () => {

  // =========================================================
  // QUESTIONS
  // =========================================================

  const questions = [

    {
      question:
        "Do you often have trouble paying attention?",

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
        "Are you easily distracted?",

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
        "Do you have trouble staying organized?",

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
        "Do you have trouble following through on instructions?",

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
        "Do you fidget or squirm a lot?",

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
        "Do you have trouble sitting still?",

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
        "Do you have trouble waiting your turn?",

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
        "Do you often interrupt others?",

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
        "Do you have trouble controlling your impulses?",

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
        "Do you often feel restless or have trouble relaxing?",

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
        "Do you have trouble paying attention to details?",

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


  // =========================================================
  // QUIZ COMPLETE
  // =========================================================

  const isQuizOver =
    currentQuestion ===
    questions.length;


  // =========================================================
  // CHANGE QUESTION
  // =========================================================

  const changeQuestion = () => {

    // User must select an answer.

    if (
      clickedOption === 0
    ) {

      return;

    }


    // Add current answer score.

    setScore(
      (previousScore) =>
        previousScore +
        clickedOption
    );


    // Move to next question.

    setCurrentQuestion(
      (previousQuestion) =>
        previousQuestion + 1
    );


    // Reset selected answer.

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

  };


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
          ADHD TEST
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
                          setClickedOption(
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


            <h2 className="score">
              {score}
            </h2>


            <AdhdResult
              score={
                score
              }
            />


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


export default ADHDQuiz;