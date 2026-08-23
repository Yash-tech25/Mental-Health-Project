import "../App.css";


// =========================================================
// SHARED RESULT COMPONENT
// =========================================================

const ResultMessage = ({
  message,
}) => {

  return (

    <div className="show-score">

      <p className="result">

        <strong>
          Result:{" "}
        </strong>

        {message}

      </p>


      <p className="quiz-result-note">

        This self-check is for reflection only and
        is not a diagnosis or a substitute for
        professional mental-health advice.

      </p>

    </div>

  );

};


// =========================================================
// DEPRESSION RESULT
// =========================================================

function DepressionResult({
  score,
}) {

  let message;


  if (
    score >= 10 &&
    score <= 20
  ) {

    message =
      "Your responses fall toward the lower end of this self-check. Some difficult feelings or experiences may still be present.";

  } else if (
    score > 20 &&
    score <= 30
  ) {

    message =
      "Your responses fall in the middle range of this self-check. You may be experiencing several difficult feelings or changes in your daily life.";

  } else if (
    score > 30 &&
    score <= 40
  ) {

    message =
      "Your responses fall in a higher range of this self-check. It may be helpful to talk about what you are experiencing with someone you trust or a qualified mental-health professional.";

  } else if (
    score > 40 &&
    score <= 50
  ) {

    message =
      "Your responses fall toward the higher end of this self-check. Consider reaching out to a qualified mental-health professional for support.";

  } else {

    message =
      "Unable to determine a result from the current score.";

  }


  return (

    <ResultMessage
      message={
        message
      }
    />

  );

}


// =========================================================
// ADHD RESULT
// =========================================================

function AdhdResult({
  score,
}) {

  let message;


  if (
    score >= 11 &&
    score <= 20
  ) {

    message =
      "Your responses fall toward the lower end of this self-check for attention, organization, restlessness, and impulse-related difficulties.";

  } else if (
    score > 20 &&
    score <= 35
  ) {

    message =
      "Your responses fall in the middle range of this self-check. Some attention, organization, restlessness, or impulse-related difficulties may be affecting you.";

  } else if (
    score > 35 &&
    score <= 55
  ) {

    message =
      "Your responses fall toward the higher end of this self-check. If these experiences are affecting daily life, consider discussing them with a qualified professional.";

  } else {

    message =
      "Unable to determine a result from the current score.";

  }


  return (

    <ResultMessage
      message={
        message
      }
    />

  );

}


// =========================================================
// OCD RESULT
// =========================================================

function OcdResult({
  score,
}) {

  let message;


  if (
    score >= 10 &&
    score <= 20
  ) {

    message =
      "Your responses fall toward the lower end of this self-check for repetitive thoughts and behaviors.";

  } else if (
    score > 20 &&
    score <= 30
  ) {

    message =
      "Your responses fall in the middle range of this self-check. Some repetitive thoughts or behaviors may be causing discomfort or taking up time.";

  } else if (
    score > 30 &&
    score <= 40
  ) {

    message =
      "Your responses fall in a higher range of this self-check. These experiences may sometimes interfere with everyday activities.";

  } else if (
    score > 40 &&
    score <= 50
  ) {

    message =
      "Your responses fall toward the higher end of this self-check. If these experiences are affecting daily life, consider speaking with a qualified mental-health professional.";

  } else {

    message =
      "Unable to determine a result from the current score.";

  }


  return (

    <ResultMessage
      message={
        message
      }
    />

  );

}


// =========================================================
// ANXIETY RESULT
// =========================================================

function AnxietyResult({
  score,
}) {

  let message;


  if (
    score >= 10 &&
    score <= 20
  ) {

    message =
      "Your responses fall toward the lower end of this self-check for anxiety-related experiences.";

  } else if (
    score > 20 &&
    score <= 30
  ) {

    message =
      "Your responses fall in the middle range of this self-check. Some worry, tension, restlessness, or physical signs of anxiety may be present.";

  } else if (
    score > 30 &&
    score <= 40
  ) {

    message =
      "Your responses fall in a higher range of this self-check. Consider noticing how these experiences affect your routines and daily activities.";

  } else if (
    score > 40 &&
    score <= 50
  ) {

    message =
      "Your responses fall toward the higher end of this self-check. If these experiences are difficult to manage or affect daily life, consider reaching out to a qualified mental-health professional.";

  } else {

    message =
      "Unable to determine a result from the current score.";

  }


  return (

    <ResultMessage
      message={
        message
      }
    />

  );

}


// =========================================================
// PTSD RESULT
// =========================================================

function PtsdResult({
  score,
}) {

  let message;


  if (
    score >= 10 &&
    score <= 20
  ) {

    message =
      "Your responses fall toward the lower end of this self-check for trauma-related experiences.";

  } else if (
    score > 20 &&
    score <= 30
  ) {

    message =
      "Your responses fall in the middle range of this self-check. Some trauma-related experiences may still be affecting you.";

  } else if (
    score > 30 &&
    score <= 40
  ) {

    message =
      "Your responses fall in a higher range of this self-check. Consider talking with someone you trust or a qualified mental-health professional if these experiences are difficult to manage.";

  } else if (
    score > 40 &&
    score <= 50
  ) {

    message =
      "Your responses fall toward the higher end of this self-check. If these experiences are interfering with daily life, professional support may be helpful.";

  } else {

    message =
      "Unable to determine a result from the current score.";

  }


  return (

    <ResultMessage
      message={
        message
      }
    />

  );

}


// =========================================================
// SOCIAL ANXIETY RESULT
// =========================================================

function SocialAnxietyResult({
  score,
}) {

  let message;


  if (
    score >= 10 &&
    score <= 20
  ) {

    message =
      "Your responses fall toward the lower end of this self-check for anxiety in social situations.";

  } else if (
    score > 20 &&
    score <= 30
  ) {

    message =
      "Your responses fall in the middle range of this self-check. Some social situations may cause noticeable discomfort or worry.";

  } else if (
    score > 30 &&
    score <= 40
  ) {

    message =
      "Your responses fall in a higher range of this self-check. Social anxiety may be affecting some interactions, activities, work, or studies.";

  } else if (
    score > 40 &&
    score <= 50
  ) {

    message =
      "Your responses fall toward the higher end of this self-check. If anxiety in social situations is interfering with daily life, consider speaking with a qualified mental-health professional.";

  } else {

    message =
      "Unable to determine a result from the current score.";

  }


  return (

    <ResultMessage
      message={
        message
      }
    />

  );

}


// =========================================================
// EXPORTS
// =========================================================

export {
  DepressionResult,
  AdhdResult,
  OcdResult,
  AnxietyResult,
  PtsdResult,
  SocialAnxietyResult,
};