//STRETCH GOAL QUIZ

//The purpose of this component is to create a short quiz that will generate a random avatar based on submitted answers

//The user will be routed to this page after creating a new account

//This quiz can be re-taken by clicking on a link from the builder page

//Users will answer 4 questions by selecting the appropriate button. Each answer will be the value of a property
//that is stored in an object and saved to the api. Each art object has a property
//corresponding with the question answers and will be chosen randomly from the pool
//of objects with the same property value to build a random avatar at the end of the quiz

import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
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
  const showSpookyFantasy = useRef();
  const showSpookyScifi = useRef();
  const showSweetFantasy = useRef();
  const showSweetScifi = useRef();
  const showGourdText = useRef();
  const showGourdText2 = useRef();
  const showTryItButton = useRef();

  //create function to display 1 question at a time
  const iterateQuestions = () => {
    if (quizAnswers.q1 !== "") {
      showNextQuestion.current.style.display = "none";
      showNextQuestion2.current.style.display = "flex";
    }
  };
  const iterateQuestions2 = () => {
    if (quizAnswers.q2 !== "") {
      showNextQuestion2.current.style.display = "none";
      showNextQuestion3.current.style.display = "flex";
    }
  };
  const iterateQuestions3 = () => {
    if (quizAnswers.q3 !== "") {
      showNextQuestion3.current.style.display = "none";
      showNextQuestion4.current.style.display = "flex";
    }
  };
  const iterateQuestions4 = () => {
    if (quizAnswers.q4 !== "") {
      showNextQuestion4.current.style.display = "none";
      showButton.current.style.display = "flex";
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

    showButton.current.style.display = "none";
    if (userAnswers.q1 === "spooky" && userAnswers.q2 === "fantasy") {
      showGourdText.current.style.display = "flex";
      showSpookyFantasy.current.style.display = "flex";
      showGourdText2.current.style.display = "flex";
      showTryItButton.current.style.display = "flex";
    } else if (userAnswers.q1 === "spooky" && userAnswers.q2 === "scifi") {
      showGourdText.current.style.display = "flex";
      showSpookyScifi.current.style.display = "flex";
      showGourdText2.current.style.display = "flex";
      showTryItButton.current.style.display = "flex";
    } else if (userAnswers.q1 === "sweet" && userAnswers.q2 === "fantasy") {
      showGourdText.current.style.display = "flex";
      showSweetFantasy.current.style.display = "flex";
      showGourdText2.current.style.display = "flex";
      showTryItButton.current.style.display = "flex";
    } else if (userAnswers.q1 === "sweet" && userAnswers.q2 === "scifi") {
      showGourdText.current.style.display = "flex";
      showSweetScifi.current.style.display = "flex";
      showGourdText2.current.style.display = "flex";
      showTryItButton.current.style.display = "flex";
    }
  };

  const history = useHistory();

  return (
    <>
      <container className="quiz-form">
        <div className="question-1" ref={showNextQuestion}>
          <h1 id="intro">Let's begin with a short quiz . . .</h1>
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
              I'm something of a <br />
              skeleton, myself
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
              I've had a cavity or two
            </button>
          </div>
        </div>
        <div className="question-2" ref={showNextQuestion2}>
          <h1>
            Would you rather visit a castle <br />
            or a space station?
          </h1>
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
              I'm sweaty already!
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
        <div className="your-gourd-text" ref={showGourdText}>
          <h2>Your first Gourd has been plucked from the patch...</h2>
        </div>
        <div className="spooky-fantasy" ref={showSpookyFantasy}>
          <img
            id="spooky-fantasy-image"
            src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1648239041/Assets/random_spooky_fantasy_unfashionable_winter_fa4pvc.png"
          ></img>
        </div>
        <div className="spooky-scifi" ref={showSpookyScifi}>
          <img
            id="spooky-scifi-image"
            src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1648239041/Assets/random_spooky_scifi_fashionable_winter_znczlg.png"
          ></img>
        </div>
        <div className="sweet-fantasy" ref={showSweetFantasy}>
          <img
            id="sweet-fantasy-image"
            src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1648239041/Assets/random_sweet_fantasy_unfashionable_summer_lilvdi.png"
          ></img>
        </div>
        <div className="sweet-scifi" ref={showSweetScifi}>
          <img
            id="sweet-scifi-image"
            src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1648406376/Assets/random_sweet_scifi_fashionable_winter_frvfqg.png"
          ></img>
        </div>
        <div className="your-gourd-text-2" ref={showGourdText2}>
          <h2>Now it's time to try making one from scratch!</h2>
        </div>
        <div className="try-it-button" ref={showTryItButton}>
          <button
            id="try-it-button"
            onClick={() => {
              history.push("/avatars/create");
            }}
          >
            Try it!
          </button>
        </div>
      </container>
    </>
  );
};
