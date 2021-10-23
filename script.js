'use strict';

//Selecting necessary elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Declare variable
let scores, currentScore, activePlayer, playing;

function init() {
    //initialize variables
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    //Reset UI
    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    dice.classList.add('hidden');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
}

init(); //initialize UI and variable when reloading the page

//Function to change player's turn
function changePlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0; //assign to player 1 if player 0 is acttive and vice versa
    player0.classList.toggle('player--active');//toggle will remove if there and add if not
    player1.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', () => {
    if (playing) {
        //1. generate a random number
        const diceNumber = Math.trunc(Math.random() * 6) + 1;

        //2. use that to display the random dice roll
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNumber}.png`;

        //3. check for if a roll 1 then determine what to do
        if (diceNumber !== 1) {
            //add dice to current score
            currentScore += diceNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            //next player's turn and make current score 0
            changePlayer();
        }
    }
});

//Hold score functionality
btnHold.addEventListener('click', () => {
    if (playing) {
        // 1. Add score to active player's score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player has reached 100/won
        if (scores[activePlayer] >= 100) {
            // Finish game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            dice.classList.add('hidden');
            playing = false;
        } else {
            // Change player's turn if not reached 100
            changePlayer();
        }
    }
});

//New game functionality
btnNew.addEventListener('click', () => {
    init();
});