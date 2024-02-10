function rollDice() {
    var randomNumber = Math.floor(Math.random() * 6) + 1;

    var diceImage = document.querySelector('#dice img');
    diceImage.src = 'inverted-dice-' + randomNumber + '.png';
}

var diceDiv = document.getElementById('dice');
diceDiv.addEventListener('click', rollDice);