'use strict';
import { startConfetti, stopConfetti } from './confetti.js';

//!@ Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

//!@ Declaring Variables
let totalScore, currentScore, activePlayer, playingState;
const winAudio = new Audio('assests/Sounds/win.mp3');
let diceNumber;

//!@ Defining Functions
const init = function () {
  stopConfetti();
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingState = true; //state variable holds wether game is playing or not
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
};
init();

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//!@ Event Listeners

//? Roll the dice event

btnRoll.addEventListener('click', function () {
  if (playingState) {
    //*@ Random Dice Number Generator
    diceNumber = Math.floor(Math.random() * 6 + 1);
    dice.style.animation = 'rolling 4s';
    var audio = new Audio('assests/Sounds/diceSound.wav');
    audio.play();

    //*@ Dice Animation Generator
    setTimeout(() => {
      switch (diceNumber) {
        case 1:
          dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
          break;

        case 6:
          dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
          break;

        case 2:
          dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
          break;

        case 5:
          dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
          break;

        case 3:
          dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
          break;

        case 4:
          dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
          break;

        default:
          break;
      }
      dice.style.animation = 'none';
    }, 800);
    dice.classList.remove('hidden');
  }

  //*@ Update Current Score and based on that switch sides
  setTimeout(() => {
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }, 900);
});

//? Hold button event

btnHold.addEventListener('click', function () {
  if (playingState) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    //? check whose score reached at 50
    if (totalScore[activePlayer] >= 50) {
      playingState = false;
      startConfetti();
      winAudio.play();
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayers();
    }
  }
});

//? Reset Game event

btnNew.addEventListener('click', function () {
  winAudio.pause();
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  init();
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
});
