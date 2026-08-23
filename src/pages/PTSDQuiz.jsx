import {
  useState
} from "react";

import {
  PtsdResult
} from "../components/QuizResult";


// =========================================================
// QUESTIONS
// =========================================================

const questions = [

  {
    question:
      "Do you have unwanted memories, thoughts, or images of a distressing event?",

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
      "Do you have nightmares related to a distressing or traumatic experience?",

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
      "Do you sometimes feel as though a distressing event is happening again?",

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
      "Do reminders of a distressing event cause strong emotional reactions?",

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
      "Do you avoid thoughts, feelings, people, or places that remind you of a distressing event?",

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
      "Have you felt emotionally distant or disconnected from other people?",

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
      "Have you had difficulty feeling positive emotions or enjoying things you normally enjoy?",

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
      "Do you feel unusually alert, watchful, or on guard?",

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
      "Are you easily startled by unexpected sounds or movements?",

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
      "Have you had difficulty sleeping or concentrating since a distressing experience?",

    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
  },

];


const PtsdQuiz = () => {

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
  // NEXT QUESTION
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
  // RESET QUIZ
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


  return (

    <div className="commonQuiz">

      <div className="container">


        {/* ===================================================
            TITLE
        =================================================== */}

        <h2>
          PTSD TEST
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
                ANSWERS
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
                        key={
                          answer
                        }
                        className={
                          `option-btn ${
                            clickedOption ===
                            optionValue
                              ? "checked"
                              : ""
                          }`
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
                NEXT
            =============================================== */}

            <button
              type="button"
              id="next-button"
              onClick={
                changeQuestion
              }
              disabled={
                clickedOption === 0
              }
            >

              <span>

                {currentQuestion ===
                questions.length - 1
                  ? "View Result"
                  : "Next"}

              </span>


              <span
                className="next-arrow"
                aria-hidden="true"
              >
                →
              </span>

            </button>

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


            <PtsdResult
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


export default PtsdQuiz;