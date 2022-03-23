//STRETCH GOAL QUIZ

//The purpose of this component is to create a short quiz that will generate a random avatar based on submitted answers

//The user will be routed to this page after creating a new account

//This quiz can be re-taken by clicking on a link from the builder page

//Users will answer 4 questions by selecting the appropriate button. Each answer will be the value of a property that
//that is stored in an object and saved to the api. Each art object has a property
//corresponding with the question answers and will be chosen randomly from the pool
//of objects with the same property value to build a random avatar at the end of the quiz

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { useHistory, useParams } from "react-router-dom";
import "./Quiz.css";

//Q1: Are you spooky or sweet? ---I'm something of a skeleton, myself / Oh, I get cavities!
//Q2: Would you rather visit a castle or a space station? ---Thine masonry doth entice me! / Oh! I have slipped the surly bonds of earth
//Q3: In regards to your sense of fashion... ---I care a lot! / Eh, not important
//Q4: Do you prefer summer or winter? ---I'm sweaty already and ready for more / Cold is gold, baby

export const QuizForm = () => {
  const [quizAnswers, setQuizAnswers] = useState({
    q1: 1,
    q2: 1,
    q3: 1,
    q4: 1,
  });

  useEffect(() => {
    fetch(`http://localhost:8088/quizAnswers`)
      .then((res) => res.json())
      .then(setQuizAnswers);
  }, []);

  const handleInput = (e) => {
    console.log(e.target.value);
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

    return fetch("http://localhost:8088/quizAnswers", fetchOption);
  };

  return (
    <>
      <container className="quiz-form">
        <div className="question-1">
          <h1>Are you spooky or sweet?</h1>
          <div id="q-1-buttons">
            <button
              id="q-1-button-1"
              value="1"
              onClick={(e) => this.handleInput(e, "value")}
            >
              I'm something of a skeleton, myself
            </button>
            <button
              id="q-1-button-2"
              value="2"
              onClick={(e) => this.handleInput(e, "value")}
            >
              Oh, I get cavities!
            </button>
          </div>
        </div>
        {/* <div className="question-2">
            <h1>Would you rather visit a castle or a space station?</h1>
            <div id="q-2-buttons">
              <button
                id="q-2-button-1"
                onClick={(evt) => {
                  const copy = { ...quizAnswers };
                  copy.q1 = evt.target.value;
                  setQuizAnswers(copy);
                }}
              >
                Thine masonry doth entice me!
              </button>
              <button
                id="q-2-button-2"
                onClick={(evt) => {
                  const copy = { ...quizAnswers };
                  copy.q1 = evt.target.value;
                  setQuizAnswers(copy);
                }}
              >
                Oh! I have slipped the surly bonds of earth
              </button>
            </div>
          </div>
          <div className="question-3">
            <h1>In regards to your sense of fashion...</h1>
            <div id="q-3-buttons">
              <button
                id="q-3-button-1"
                onClick={(evt) => {
                  const copy = { ...quizAnswers };
                  copy.q1 = evt.target.value;
                  setQuizAnswers(copy);
                }}
              >
                I care a lot!
              </button>
              <button
                id="q-3-button-2"
                onClick={(evt) => {
                  const copy = { ...quizAnswers };
                  copy.q1 = evt.target.value;
                  setQuizAnswers(copy);
                }}
              >
                Eh, not important
              </button>
            </div>
          </div>
          <div className="question-4">
            <h1>Do you prefer summer or winter?</h1>
            <div id="q-4-buttons">
              <button
                id="q-4-button-1"
                onClick={(evt) => {
                  const copy = { ...quizAnswers };
                  copy.q1 = evt.target.value;
                  setQuizAnswers(copy);
                }}
              >
                I'm sweaty already and ready for more
              </button>
              <button
                id="q-4-button-2"
                onClick={(evt) => {
                  const copy = { ...quizAnswers };
                  copy.q1 = evt.target.value;
                  setQuizAnswers(copy);
                }}
              >
                Cold is gold, baby
              </button>
            </div>
          </div> */}
      </container>
    </>
  );
};
