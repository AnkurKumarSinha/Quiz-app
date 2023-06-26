import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Image01 from './quiz-logo-01.jpg';
import Image02 from './quiz-logo-02.jpg';
import Image03 from './userLogo.png';
import Image04 from './brainLogo.png';
import Image05 from './correctImage.png';

const App = () => {

  const [startQuiz, setStartQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const timer = useRef();
  const nextQuestion = currentQuestion + 1;

  useEffect(() => {
    if (startQuiz) {
      timer.current = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)

      return clearInterval(timer);
    }
  }, [startQuiz])

  useEffect(() => {
    if (countdown < 0) {
      setCountdown(10);

      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion)
      } else {
        setShowResult(true)
      }
    }
  })

  const quizData = [
    {
      question: 'Which planet is nearest to the sun ?',
      options: ['Venus', 'Mercury', 'Mars', 'Earth'],
      answer: 'Mercury'
    },
    {
      question: 'When was the ES6 version of Javascript introduced ?',
      options: ['2014', '2015', '2016', '2017'],
      answer: '2016'
    },
    {
      question: 'The person who writes computer code is called ?',
      options: ['Cryptographers', 'Professors', 'Manufacturers', 'Programmers'],
      answer: 'Programmers'
    },
    {
      question: 'What is computer coding ?',
      options: ['A TV show', 'A list of functions', 'A radio show', 'Telling a computer what to do'],
      answer: 'Telling a computer what to do'
    },
    {
      question: 'What do shell windows show in Python ?',
      options: ['Program output', 'IDLE', 'Print command', 'Code'],
      answer: 'Program output'
    }
  ]

  const startGame = () => {
    if (playerName.trim() !== '') {
      setStartQuiz(true);
      setCurrentQuestion(0)
    } else {
      alert('Player name is required')
    }
  }

  const handleAnswer = (selected) => {

    if (selected === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowResult(true)
    }

    setAttempt(attempt + 1);
    setCountdown(10);

  }

  const restart = () => {
    setStartQuiz(false);
    setShowResult(false)
    setAttempt(0);
  }

  return (

    <div className='App'>

      {showResult ? (
        <div className="thirdPage">

          <div className="header02">

            <span className='playerName'>
              {playerName}
            </span>

            <img
              src={Image03}
              height={40}
              width={40}
              alt="UserImage"
            />

          </div>

          <div className="correct-logo">

            <img
              src={Image05}
              height={100}
              alt="Correct logo"
            />

          </div>

          <div className="result">

            <hr className='hr-line-04' />

            <div className="greet-box">
              <h1>Here is your result, {playerName}</h1>
            </div>

            <div className="result-box">

              <span>Total Questions : {quizData.length}</span>
              <span>Attempted : {attempt}</span>
              <span>Correct : {score}</span>
              <span>Wrong : {attempt - score}</span>

            </div>

            <hr className='hr-line-05' />

            <button
              className='restart-btn'
              onClick={restart}
            >
              Play again
            </button>

          </div>

        </div>
      ) : (
        <>
          {startQuiz ? (

            <div className="secondPage">

              <div className="header">

                <img
                  src={Image01}
                  height={80}
                  width={120}
                  alt="quizImage"
                />

                <img
                  src={Image04}
                  height={200}
                  alt="brainLogo"
                  className='brainLogo'
                />

                <div
                  className="userName"
                >

                  <span className='playerName'>
                    {playerName}
                  </span>

                  <img
                    src={Image03}
                    height={40}
                    width={40}
                    alt="UserImage"
                  />

                </div>

              </div>

              <div className="quiz-box">

                <hr className='hr-question' />

                <div className="question-box">

                  <div className="question-top">

                    <div
                      className="question-timer"
                    >
                      {countdown < 10 ? '0' + countdown : countdown}
                    </div>

                    <div className="question-count">
                      {currentQuestion + 1} / {quizData.length}
                    </div>

                  </div>

                  <div className="question">
                    {currentQuestion + 1}. {quizData[currentQuestion].question}
                  </div>

                </div>

                <div className="options-box">

                  {quizData[currentQuestion].options.map((option) => {

                    return (
                      <>
                        <button
                          className='option'
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </button>
                      </>
                    )

                  })}

                </div>

              </div>

              <hr className='hr-line-2' />

              <button
                className='end-btn'
                onClick={() => {
                  setShowResult(true)
                  setStartQuiz(false)
                }}
              >
                End quiz
              </button>

            </div>

          ) : (

            <div className="firstPage">

              <img
                src={Image02}
                height={300}
                width={320}
                className='quizImage01'
              />

              <input
                type="text"
                placeholder="What's your name ?"
                autoComplete='off'
                className='nameInput'
                onChange={(event) => setPlayerName(event.target.value)}
              />

              <hr className='hr-line' />

              <button
                className='start-btn'
                onClick={startGame}
              >
                Start
              </button>

            </div>

          )}
        </>
      )}

    </div >
  )
}

export default App