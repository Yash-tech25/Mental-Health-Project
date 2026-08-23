import {
  useState
} from "react";

import {
  SocialAnxietyResult
} from "../components/QuizResult";


// =========================================================
// QUESTIONS
// =========================================================

const questions = [

  {
    question:
      "Do you feel very nervous when meeting new people?",

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
      "Do you worry that other people may judge or criticize you?",

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
      "Do you avoid social situations because you feel anxious or uncomfortable?",

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
      "Do you feel anxious when speaking in front of a group?",

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
      "Do you worry about embarrassing yourself in front of other people?",

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
      "Do you feel uncomfortable eating, writing, or doing activities while others are watching?",

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
      "Do you experience physical symptoms such as sweating, shaking, or a racing heart in social situations?",

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
      "Do you replay social interactions afterward and worry about things you said or did?",

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
      "Do you find it difficult to start conversations or speak to unfamiliar people?",

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
      "Does fear of social situations interfere with your daily life, studies, work, or relationships?",

    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
  },

];


const SocialAnxietyQuiz = () => {

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
          SOCIAL ANXIETY TEST
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
                NEXT BUTTON
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
                  : "Next"
                }

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


            <SocialAnxietyResult
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


export default SocialAnxietyQuiz;