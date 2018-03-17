/*
 * Create a list that holds all of your cards
 */

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
let moves = 0;


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




// const newGame = function() {
//     shuffle(arrayOfCards);

//     for (let i = 0; i < arrayOfCards.length; i++) {
//         cardDeck.appendChild(arrayOfCards[i]);
//     }

// };
const addStar = function() {
    if (moves === 2) {
        // stars.removeChild(starF);
        stars[0].removeChild(star1F);
        stars[1].removeChild(star1);
    } else if (moves === 4) {
        // stars.removeChild(stars[0].firstChild);
        stars[0].removeChild(star2F);
        stars[1].removeChild(star2);

    } else {
        //3 stars
    }
}




// main function
const game = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("noclick"); //prevent double click
    openedCardsArr.push(this);

    if (openedCardsArr.length === 2) {
        moves++;
        addStar();
        //check if cards match and add classes
        if (openedCardsArr[0].isEqualNode(openedCardsArr[1])) {

            openedCardsArr[0].classList.toggle("match");
            openedCardsArr[1].classList.toggle("match");
            openedCardsArr[0].classList.remove("show", "open");
            openedCardsArr[1].classList.remove("show", "open");
            openedCardsArr = [];


            // display congratulations if all card match
            if (matched.length === arrayOfCards.length) {
                congrats.style.height = "50%";
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

    shuffle(arrayOfCards);
    congrats.style.height = "50%";
    moves = 0;

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