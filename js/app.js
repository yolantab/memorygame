/*
 * Create a list that holds all of your cards
 */

const cardDeck = document.querySelector('.deck');
const cards = cardDeck.getElementsByClassName('card');
const matched = cardDeck.getElementsByClassName('match');
const arrayOfCards = Array.from(cards);
const overlay = document.getElementById('overlay');
const congrats = document.getElementById('congrats')
const playAg = document.querySelector('.playAgain');
// create empty array for opened cards and matched cards
let openedCardsArr = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length,
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
// function that shuffles cards and adds them to the deck

const newGame = function() {

    shuffle(arrayOfCards);
    congrats.style.height = "0%";
    for (const card of arrayOfCards) {
        cardDeck.appendChild(card);
        card.classList.remove("show", "open", "match", "noclick");
    }

};

// const newGame = function() {
//     shuffle(arrayOfCards);

//     for (let i = 0; i < arrayOfCards.length; i++) {
//         cardDeck.appendChild(arrayOfCards[i]);
//     }

// };

// start new game
window.addEventListener('load', newGame);
const restart = document.querySelector('.restart');
restart.addEventListener("click", newGame);
playAg.addEventListener("click", newGame);


// open card on click
for (const card of arrayOfCards) {
    card.addEventListener("click", function() {
        this.classList.toggle("open");
        this.classList.toggle("show");
        this.classList.toggle("noclick"); //prevent double click
        openedCardsArr.push(this);

        if (openedCardsArr.length === 2) {

            if (openedCardsArr[0].isEqualNode(openedCardsArr[1])) {

                openedCardsArr[0].classList.toggle("match");
                openedCardsArr[1].classList.toggle("match");
                openedCardsArr[0].classList.remove("show", "open");
                openedCardsArr[1].classList.remove("show", "open");
                openedCardsArr = [];

                // if (matched.length === arrayOfCards.length) {
                //     congrats.classList.toggle('congrats');
                // }
                if (matched.length === arrayOfCards.length) {
                    congrats.style.height = "50%";
                }
            } else {
                overlay.classList.toggle('overlay');
                setTimeout(function() {
                    openedCardsArr[0].classList.remove("show", "open", "noclick");
                    openedCardsArr[1].classList.remove("show", "open", "noclick");
                    openedCardsArr = [];
                    overlay.classList.remove('overlay');
                }, 900);
            }

        } else {



        }

    });

}


// const cardsl = cardDeck.getElementsByTagName('i');
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */