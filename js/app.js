// Global variables
const winModal = document.querySelector('.winner');
const counter = document.querySelector('.moves');
let moves = 0;

// A list that holds all cards
const cardList = document.querySelectorAll('.card');
const cardListArray = [];
for (const card of cardList) {
	cardListArray.push(card);
}

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

function memoryGame () {
	createNewDeck();
	const cardDeck = document.querySelector('.deck');
	let openCards = [];

	// Event listener for memory cards
	clickCardListener = function () {
		cardDeck.addEventListener('click', clickHandler)
	}
	// Show targeted cards' symbols
	function displayCard (evt) {
		evt.target.classList.add('show');
	}
	// Push targeted card to array
	function pickedCards(evt) {
		openCards.push(evt.target);
	}
	// Leave matching pairs open as solved
	function pairSolved() {
		for(const card of openCards) {
			card.classList.add('open');
		}
	}
	// Hide currently opened cards
	function hideCards() {
		for(const card of openCards) {
			card.classList.remove('show');
		}
		openCards = [];
	}
	
	clickCardListener();
		// Event delegation for clicked card
	function clickHandler (evt) {
		if (evt.target.className === 'card') {
			displayCard(evt);
			pickedCards(evt);
		}
		// Check if there is a pair of cards inside of openCards array
		if (openCards.length > 1) {
    		if (openCards[0].childNodes[1].className === openCards[1].childNodes[1].className) {
    			pairSolved();
    			openCards = [];
    		} else {
    			cardDeck.removeEventListener('click', clickHandler);
    			setTimeout(hideCards, 1000);
    			setTimeout(clickCardListener, 1000);
	    	}
	    // Update moves counter
	    counter.textContent = ++moves;
    	}
    	// Display modal if all cards are open
		if (document.querySelectorAll(".show").length === cardList.length) {	
			winModal.classList.add('display-modal');
			document.querySelector('#totalScore').textContent = `${moves}`;
		}
	}
}	

memoryGame();

// Close button functionality
const closeButton = document.querySelector('.btn--close');
closeButton.addEventListener('click', function (evt) {
	evt.preventDefault();
	winModal.classList.remove('display-modal');
});

// Refresh button functionality
const refreshButton = document.querySelectorAll('.restart');

for (button of refreshButton) {
	button.addEventListener('click', function () {
		
		const matchingCards = document.querySelectorAll('.card');
		
		/*for (const star of stars) {
			star.style.display = 'block';
		}*/
		for(const card of matchingCards) {
			card.classList.remove('show');
			card.classList.remove('open');
		}
		winModal.classList.remove('display-modal');
		counter.textContent = 0;
		memoryGame();
	});
}

