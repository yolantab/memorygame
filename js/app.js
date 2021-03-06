/*jshint esversion: 6 */

const cardDeck = document.querySelector('.deck');
const cards = cardDeck.getElementsByClassName('card');
const matched = cardDeck.getElementsByClassName('match');
const arrayOfCards = Array.from(cards);
const overlay = document.getElementById('overlay');
const congrats = document.getElementById('congrats');
const playAg = document.querySelector('.playAgain');
const stars = document.getElementsByClassName('stars');
const star1F = stars[0].getElementsByTagName('li')[0]; //last star from cong. panel
const star2F = stars[0].getElementsByTagName('li')[1]; //second star from cong. panel
const star1 = stars[1].getElementsByTagName('li')[0]; //last star from score panel
const star2 = stars[1].getElementsByTagName('li')[1]; //second star score panel
const movesEl = document.getElementsByClassName('moves');
const timer = document.getElementsByClassName('time');

let sec = 0;
let min = 0;
let moves = 0;
let time = 0;
// empty array for opened cards and matched cards
let openedCardsArr = [];


//timer function

function gameTimer() {
    time = setInterval(function() {

        sec++;
        if (sec < 10) {
            sec = "0" + sec;
        }
        timer[0].innerHTML = min + ":" + sec;
        timer[1].innerHTML = min + ":" + sec;

        if (sec === 60) {
            min++;
            sec = 0;

        }

    }, 1000);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


//remove star after moves
const removeStar = function() {
    if (moves === 16) {
        // stars.removeChild(starF);
        stars[0].removeChild(star1F);
        stars[1].removeChild(star1);
    } else if (moves === 30) {
        // stars.removeChild(stars[0].firstChild);
        stars[0].removeChild(star2F);
        stars[1].removeChild(star2);

    } else {
        //3 stars
    }
};




// main function
const game = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("noclick"); //prevent double click
    openedCardsArr.push(this);

    if (openedCardsArr.length === 2) {
        moves++;
        removeStar();
        if (moves === 1) gameTimer();
        movesEl[0].innerHTML = moves;
        movesEl[1].innerHTML = moves;
        //check if cards match and add classes
        if (openedCardsArr[0].isEqualNode(openedCardsArr[1])) {

            openedCardsArr[0].classList.toggle("match");
            openedCardsArr[1].classList.toggle("match");
            openedCardsArr[0].classList.remove("show", "open");
            openedCardsArr[1].classList.remove("show", "open");
            openedCardsArr = [];


            // display congratulations if all card match
            if (matched.length === arrayOfCards.length) {
                setTimeout(function() {
                    congrats.style.height = "65%";
                }, 2000);
                clearInterval(time);

            }
        } else {
            // set transparent overlay to prevent player clisks more than two cards
            overlay.classList.toggle('overlay');
            //timeout function allows player to see cards before they close again
            setTimeout(function() {
                openedCardsArr[0].classList.remove("show", "open", "noclick");
                openedCardsArr[1].classList.remove("show", "open", "noclick");
                openedCardsArr = [];
                overlay.classList.remove('overlay');
            }, 900);
        }

    } else {



    }

};
// open card on click
const startGame = function() {
    for (const card of arrayOfCards) {
        card.addEventListener("click", game);

    }
};
// function: shuffle cards, add them to the deck and start new game
const newGame = function() {
    //reset stars
    stars[0].appendChild(star1F);
    stars[1].appendChild(star1);
    stars[0].appendChild(star2F);
    stars[1].appendChild(star2);
    clearInterval(time);
    shuffle(arrayOfCards);
    congrats.style.height = "0%";
    //reset moves counter and timer
    sec = 0;
    min = 0;
    timer[0].innerHTML = "0:00";
    timer[1].innerHTML = "0:00";
    moves = 0;
    movesEl[0].innerHTML = moves;
    movesEl[1].innerHTML = moves;
    for (const card of arrayOfCards) {
        cardDeck.appendChild(card);
        card.classList.remove("show", "open", "match", "noclick");

    }
    startGame();

};

// event listeners for starting new game
window.addEventListener('load', newGame);
const restart = document.querySelector('.restart');
restart.addEventListener("click", newGame);
playAg.addEventListener("click", newGame);