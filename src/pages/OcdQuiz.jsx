import { useState } from "react";

import {
  OcdResult
} from "../components/QuizResult";


const OcdQuiz = () => {

  // =========================================================
  // QUESTIONS
  // =========================================================

  const questions = [

    {
      question:
        "Do you have an intense fear of germs or contaminants?",

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
        "Do you feel the need to check things repeatedly, such as locks or switches?",

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
        "Do you have a strict need for things to be orderly or symmetrical?",

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
        "Do you feel the need to perform repetitive behaviors in order to reduce your anxiety?",

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
        "Do your obsessions and compulsions take up a lot of your time?",

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
        "Do you feel like you can't control your obsessions and compulsions?",

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
        "Do you have thoughts of contamination?",

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
        "Do you try to resist your obsessions or compulsions, but find it difficult to do so?",

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
        "Do you have thoughts of symmetry or order?",

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
        "Do you have thoughts of needing to repeat words or phrases?",

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
          OCD TEST
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


            <OcdResult
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


export default OcdQuiz;