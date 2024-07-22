let playerMove;

document.querySelector('.js-img-rock').addEventListener('click', () => {
    playerMove = 'rock';
    let computer = computerMove(); // Generate computer's move
    playGame(playerMove, computer); // Pass both player's move and computer's move to playGame
});

document.querySelector('.js-img-paper').addEventListener('click', () => {
    playerMove = 'paper';
    let computer = computerMove(); // Generate computer's move
    playGame(playerMove, computer); // Pass both player's move and computer's move to playGame
});

document.querySelector('.js-img-scissors').addEventListener('click', () => {
    playerMove = 'scissors';
    let computer = computerMove(); // Generate computer's move
    playGame(playerMove, computer); // Pass both player's move and computer's move to playGame
});

function randomOption() {
    random = Math.random();
    if (random >= 0 && random < 0.33) {
       playerMove = 'rock';
    } else if (random >= 0.33 && random < 0.66) {
        playerMove = 'paper';
    } else {
        playerMove = 'scissors';
    }
    let computer = computerMove();
    playGame(playerMove, computer);
}
let intervalId; // Variable to store interval ID
document.querySelector('.js-auto-play').addEventListener('click',() => {
    if (intervalId) {
        // Interval is running, stop it
        clearInterval(intervalId);
        intervalId = null; // Reset intervalId
        document.querySelector('.js-auto-play').innerHTML = 'Start playing'; // Change button text
    } else {
        // Interval is not running, start it
        intervalId = setInterval(randomOption, 2000); // Start interval
        document.querySelector('.js-auto-play').innerHTML = 'Stop playing'; // Change button text
    }
})

function computerMove() {
    let computerMove;
    let random = Math.random();
    if (random >= 0 && random < 0.33) {
        computerMove = 'rock';
    } else if (random >= 0.33 && random < 0.66) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }
    return computerMove;
}
let scoreWins = 0;
let scoreLoses = 0;

function saveToStorage() {
    if (localStorage.getItem('wins') && localStorage.getItem('loses')) {
        scoreWins = JSON.parse(localStorage.getItem('wins'));
        scoreLoses = JSON.parse(localStorage.getItem('loses'))
    }


}




function playGame(playerMove, computerMove) {
    saveToStorage();
    let result;
    if (playerMove === 'rock' && computerMove === 'rock') {
        result = 'Tie';
    } else if (playerMove === 'rock' && computerMove === 'paper') {
        result = 'You lost';
    } else if (playerMove === 'rock' && computerMove === 'scissors') {
        result = 'You WON!';
    } else if (playerMove === 'paper' && computerMove === 'rock') {
        result = 'You WON!';
    } else if (playerMove === 'paper' && computerMove === 'paper') {
        result = 'Tie';
    } else if (playerMove === 'paper' && computerMove === 'scissors') {
        result = 'You lost';
    } else if (playerMove === 'scissors' && computerMove === 'rock') {
        result = 'You lost';
    } else if (playerMove === 'scissors' && computerMove === 'paper') {
        result = 'You WON!';
    } else if (playerMove === 'scissors' && computerMove === 'scissors') {
        result = 'Tie';
    }
    
    document.querySelector('.js-result').innerHTML = result; // Update result in HTML
    document.querySelector('.js-options').innerHTML = `You chose ${playerMove} - Computer chose ${computerMove}`;
    if (result === 'You WON!') {
        scoreWins ++;
    }
    else if (result === 'You lost') {
        scoreLoses++;
    }
    else if (result === 'Tie') {
        scoreLoses++;
        scoreWins++;
    }

    document.querySelector('.js-reset-score').addEventListener('click',() => {
        //assign scores to 0
        scoreWins = 0;
        scoreLoses = 0;

        //reset in localStorage
        localStorage.setItem('wins', JSON.stringify(scoreWins));
        localStorage.setItem('loses', JSON.stringify(scoreLoses));

        //regenerate html
        document.querySelector('.js-title-rps').innerHTML = `SCORE ${scoreWins} - ${scoreLoses}`;
    })

    localStorage.setItem('wins', JSON.stringify(scoreWins));
    localStorage.setItem('loses', JSON.stringify(scoreLoses));

    document.querySelector('.js-title-rps').innerHTML = `SCORE ${scoreWins} - ${scoreLoses}`;
}
