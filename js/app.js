// Global variables
const winModal = document.querySelector('.winner');
const stars = document.querySelectorAll('.fa-star');
const counter = document.querySelector('.moves');
const stopWatch = document.querySelector('.timer');
let moves = 0;
var count = 0; 
var clearTime; 
var seconds = 0, minutes = 0; 
var clearState; 
var secs, mins;

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
	unhideStars();
	startTimer();

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
	// Hide stars from screen with raising number of moves
	function hideStars() {

		const starPanels = document.querySelectorAll('.stars');

		for (const starPanel of starPanels) {
			if(moves >= 13 && moves < 16) {
					starPanel.children[0].style.display = 'none';
			}
			if(moves >= 16 && moves < 18) {
					starPanel.children[1].style.display = 'none';
			}
			if(moves >= 18) {
					starPanel.children[2].style.display = 'none';
			}	
		}
	}
	// Display stars again as a functionality of restart
	function unhideStars() {
		for (const star of stars) {
			star.parentNode.style.display = "inline-block"
		}
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
    	// Hide stars according to game progress
    	hideStars();

    	// Display modal if all cards are open
		if (document.querySelectorAll(".show").length === cardList.length) {	
			winModal.classList.add('display-modal');
			document.querySelector('#totalScore').textContent = `${moves}`;
			document.querySelector('#sec').textContent = `${secs}`;
			document.querySelector('#min').textContent = `${mins}`;
			//Empty moves counter
			moves = 0;
			stopTimer();
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
		
		for (const star of stars) {
			star.style.display = 'block';
		}
		for(const card of matchingCards) {
			card.classList.remove('show');
			card.classList.remove('open');
		} 
		winModal.classList.remove('display-modal');
		counter.textContent = 0;
		stopTimer();
		memoryGame();
	});
}

// Timer adapted from https://www.ostraining.com/blog/coding/stopwatch/

function startTimer () { 
	/* check if seconds is equal to 60 and add a +1 to minutes, and set seconds to 0 */ 
	if ( seconds === 60 ) { seconds = 0; minutes = minutes + 1; } 
	/* you use the javascript tenary operator to format how the minutes 
	should look and add 0 to minutes if less than 10 */ 
	secs = ( seconds < 10 ) ? ( '0' + seconds ) : ( seconds ); 
	mins = ( minutes < 10 ) ? ( '0' + minutes + ': ' ) : ( minutes + ': ' ); 
	// display the stopwatch var x = document .getElementById("timer"); 
	stopWatch.innerHTML = mins + secs; 
	/* call the seconds counter after displaying the stop watch and increment seconds by +1 to keep it counting */ 
	seconds++; 
	/* call the setTimeout( ) to keep the stop watch alive ! */ 
	clearTime = setTimeout( "startTimer()", 1000 ); 
}

function stopTimer () {
	if ( seconds !== 0 || minutes !== 0 || hours !== 0 ) {
		var time = mins + secs;
		seconds = 0; 
		minutes = 0; 
		hours = 0; 
		secs = '0' + seconds; 
		mins = '0' + minutes + ': ';
		stopWatch.innerHTML = time;
		clearTimeout(clearTime);
	}
}