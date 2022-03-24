//STRETCH GOAL QUIZ

//The purpose of this component is to create a short quiz that will generate a random avatar based on submitted answers

//The user will be routed to this page after creating a new account

//This quiz can be re-taken by clicking on a link from the builder page

//Users will answer 4 questions by selecting the appropriate button. Each answer will be the value of a property
//that is stored in an object and saved to the api. Each art object has a property
//corresponding with the question answers and will be chosen randomly from the pool
//of objects with the same property value to build a random avatar at the end of the quiz

import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
// import { useHistory, useParams } from "react-router-dom";
import "./Quiz.css";

//Q1: Are you spooky or sweet? ---I'm something of a skeleton, myself / Oh, I get cavities! --- "spooky / sweet"
//Q2: Would you rather visit a castle or a space station? ---Thine masonry doth entice me! / Oh! I have slipped the surly bonds of earth --- "fantasy / scifi"
//Q3: In regards to your sense of fashion... ---I care a lot! / Eh, not important --- "fashionable / unfashionable"
//Q4: Do you prefer summer or winter? ---I'm sweaty already and ready for more / Cold is gold, baby --- "summer / winter"

export const QuizForm = () => {
  const [quizAnswers, setQuizAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8088/quizAnswers`)
      .then((res) => res.json())
      .then(setQuizAnswers);
  }, []);

  const showNextQuestion = useRef();
  const showNextQuestion2 = useRef();
  const showNextQuestion3 = useRef();
  const showNextQuestion4 = useRef();
  const showButton = useRef();
  //create function to display 1 question at a time
  const iterateQuestions = () => {
    if (quizAnswers.q1 !== "") {
      showNextQuestion.current.style.display = "none";
      showNextQuestion2.current.style.display = "inline-block";
    }
  };
  const iterateQuestions2 = () => {
    if (quizAnswers.q2 !== "") {
      showNextQuestion2.current.style.display = "none";
      showNextQuestion3.current.style.display = "inline-block";
    }
  };
  const iterateQuestions3 = () => {
    if (quizAnswers.q3 !== "") {
      showNextQuestion3.current.style.display = "none";
      showNextQuestion4.current.style.display = "inline-block";
    }
  };
  const iterateQuestions4 = () => {
    if (quizAnswers.q4 !== "") {
      showNextQuestion4.current.style.display = "none";
      showButton.current.style.display = "inline-block";
    }
  };

  const submitQuizAnswers = (event) => {
    event.preventDefault();
    const userAnswers = {
      userId: parseInt(localStorage.getItem("gourdgeous_user")),
      q1: quizAnswers.q1,
      q2: quizAnswers.q2,
      q3: quizAnswers.q3,
      q4: quizAnswers.q4,
    };

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAnswers),
    };

    return fetch("http://localhost:8088/quizAnswers", fetchOption).then((res) =>
      res.json()
    );
  };

  return (
    <>
      <container className="quiz-form">
        <div className="question-1" ref={showNextQuestion}>
          <h1>Are you spooky or sweet?</h1>
          <div id="q-1-buttons">
            <button
              id="q-1-button-1"
              onClick={() => {
                const copy = { ...quizAnswers };
                copy.q1 = "spooky";
                setQuizAnswers(copy);
                iterateQuestions();
              }}
            >
              I'm something of a skeleton, myself
            </button>
            <button
              id="q-1-button-2"
              onClick={() => {
                const copy = { ...quizAnswers };
                copy.q1 = "sweet";
                setQuizAnswers(copy);
                iterateQuestions();
              }}
            >
              Oh, I get cavities!
            </button>
          </div>
        </div>
        <div className="question-2" ref={showNextQuestion2}>
          <h1>Would you rather visit a castle or a space station?</h1>
          <div id="q-2-buttons">
            <button
              id="q-2-button-1"
              onClick={() => {
                const copy = { ...quizAnswers };
                copy.q2 = "fantasy";
                setQuizAnswers(copy);
                iterateQuestions2();
              }}
            >
              Thine masonry doth entice me!
            </button>
            <button
              id="q-2-button-2"
              onClick={() => {
                const copy = { ...quizAnswers };
                copy.q2 = "scifi";
                setQuizAnswers(copy);
                iterateQuestions2();
              }}
            >
              Oh! I have slipped the surly bonds of earth
            </button>
          </div>
        </div>
        <div className="question-3" ref={showNextQuestion3}>
          <h1>In regards to your sense of fashion...</h1>
          <div id="q-3-buttons">
            <button
              id="q-3-button-1"
              onClick={() => {
                const copy = { ...quizAnswers };
                copy.q3 = "fashionable";
                setQuizAnswers(copy);
                iterateQuestions3();
              }}
            >
              I care a lot!
            </button>
            <button
              id="q-3-button-2"
              onClick={() => {
                const copy = { ...quizAnswers };
                copy.q3 = "unfashionable";
                setQuizAnswers(copy);
                iterateQuestions3();
              }}
            >
              Eh, not important
            </button>
          </div>
        </div>
        <div className="question-4" ref={showNextQuestion4}>
          <h1>Do you prefer summer or winter?</h1>
          <div id="q-4-buttons">
            <button
              id="q-4-button-1"
              onClick={() => {
                const copy = { ...quizAnswers };
                copy.q4 = "summer";
                setQuizAnswers(copy);
                iterateQuestions4();
              }}
            >
              I'm sweaty already and ready for more
            </button>
            <button
              id="q-4-button-2"
              onClick={() => {
                const copy = { ...quizAnswers };
                copy.q4 = "winter";
                setQuizAnswers(copy);
                iterateQuestions4();
              }}
            >
              Cold is gold, baby
            </button>
          </div>
        </div>
        <div className="submit-quiz" ref={showButton}>
          <button id="submit-quiz-button" onClick={submitQuizAnswers}>
            Make my first Gourd
          </button>
        </div>
      </container>
    </>
  );
};
