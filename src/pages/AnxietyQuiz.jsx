import { useState } from "react";

import {
  AnxietyResult
} from "../components/QuizResult";


const AnxietyQuiz = () => {

  // =========================================================
  // QUESTIONS
  // =========================================================

  const questions = [

    {
      question:
        "How often have you felt restless or fidgety?",

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
        "How often have you been unable to concentrate or your mind has wandered?",

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
        "How often have you been bothered by trouble falling or staying asleep?",

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
        "How often have you been bothered by feeling tired or having low energy?",

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
        "How often have you been bothered by feeling worthless or guilty?",

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
        "How often have you been bothered by trouble making decisions?",

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
        "How often have you been bothered by muscle tension?",

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
        "How often have you been bothered by being easily startled?",

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
        "How often have you been bothered by feeling afraid that something terrible might happen?",

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
        "How often have you been bothered by having a racing heart?",

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
          ANXIETY TEST
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


            <h3 className="score">
              {score}
            </h3>


            <AnxietyResult
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


export default AnxietyQuiz;