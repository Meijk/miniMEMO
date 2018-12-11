// A list that holds all cards
const cardList = document.querySelectorAll('.card');
const cardListArray = [];
for (const card of cardList) {
	cardListArray.push(card);
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

    return array;
}

function createNewDeck() {

	const cardListShuffled = shuffle(cardListArray);
	const newDeck = document.createElement('ul');

	// Create HTML for each new card
	for (const card of cardListShuffled) {
		const newCard = document.createElement('li');
		newCard.classList.add('card');
		newCard.innerHTML = card.innerHTML;
		// Add card to new deck
		newDeck.appendChild(newCard);
	}
	// Detach old deck from the container and attach new
	document.querySelector('.deck').remove();
	newDeck.classList.add('deck');
	document.querySelector('.container').appendChild(newDeck);
}

createNewDeck();

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

function memoryGame () {
	// List of cards currently visible
	let openCards = [];

	// Show targeted cards' symbols
	function displayCard (evt) {
		evt.target.classList.add('show');
	}
	// Push targeted card to array
	function pickedCards(evt) {
		openCards.push(evt.target);
	}
	// Leave matching pairs open as solved
	function openCard() {
		for(const card of openCards) {
			card.classList.add('open');
		}
	}
	
	document.querySelector('.deck').addEventListener('click', function (evt) {
		// Event delegation for clicked card
		if (evt.target.className === 'card') {
			displayCard(evt);
			pickedCards(evt);
		}
			// Check if there is a pair of cards inside of openCards array
			if (openCards.length > 1) {
	    		if (openCards[0].childNodes[1].className === openCards[1].childNodes[1].className) {
	    				
	    		}
	    	}
		});	
}

memoryGame();


