// Haetaan canvas-elementti ja sen 2D-konteksti
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Määritellään laattojen ja ruudukon koko sekä muuttujat madolle, omenalle ja pisteille
const tileSize = 20;
const gridSize = 20;
let snake = [{x: 10, y: 10}]; // Alustetaan mato alkupaikkaan
let apple = {x: 15, y: 15}; // Alustetaan omena alkupaikkaan
let dx = 0;
let dy = 0;
let score = 0; // Alustetaan pistemäärä

// Muuttuja intervalId, johon tallennetaan piirtointervallin tunniste
let intervalId;

// Asetetaan piirtometodi draw() ajastimella, joka suoritetaan 150 millisekunnin välein
setInterval(draw, 150);

// Päivitetään highscore, tallennetaan se ja näytetään pistenäkymä
function updateHighscore() {
    const storedHighscore = localStorage.getItem('highscore') || 0;
    const newHighscore = score > storedHighscore ? score : storedHighscore;
    localStorage.setItem('highscore', newHighscore.toString());
    showScoreboard(score, newHighscore);
}

// Kuunnellaan näppäimistöä ja asetetaan madolle liikesuunta
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

// Piirtää pelin ruudun ja kaikki komponentit
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Tyhjentää koko canvasin
    drawSnake(); // Piirtää matopalan
    drawApple(); // Piirtää omenan
    drawScore(); // Piirtää pistemäärän
    moveSnake(); // Liikuttaa matoa
    checkCollision(); // Tarkistaa mahdollisen törmäyksen
}

// Piirtää matopalan
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index % 2 === 0 ? 'black' : 'green'; // Asettaa värin parillisille ja parittomille paloille vuorotellen
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize); // Piirtää matopalan
    });
}

// Piirtää omenan
function drawApple() {
    const appleImage = document.getElementById('apple');
    ctx.drawImage(appleImage, apple.x * tileSize, apple.y * tileSize, tileSize, tileSize); // Piirtää omenan kuvan
}

// Piirtää pistemäärän
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Pisteet: ' + score, 10, 20); // Piirtää pistemäärän
}

// Liikuttaa matoa
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy}; // Määrittää madonpalalle uuden sijainnin
    snake.unshift(head); // Lisää uuden madonpalan
    if (head.x === apple.x && head.y === apple.y) { // Jos mato syö omenan
        score++; // Kasvattaa pistemäärää
        generateApple(); // Generoi uuden omenan
    } else {
        snake.pop(); // Poistaa viimeisen madonpalan
    }
    checkCollision(); // Tarkistaa mahdollisen törmäyksen
}

// Generoi uuden omenan sijainnin satunnaisesti ruudukon sisälle
function generateApple() {
    apple.x = Math.floor(Math.random() * gridSize); // Arvotaan satunnainen x-koordinaatti
    apple.y = Math.floor(Math.random() * gridSize); // Arvotaan satunnainen y-koordinaatti
}

// Tarkistaa mahdollisen törmäyksen seinään tai matoon
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) { // Jos mato törmää seinään
        gameOver(); // Peli päättyy
        return;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) { // Jos mato törmää itseensä
            gameOver(); // Peli päättyy
            return;
        }
    }
}

// Päättyy peli ja päivittää highscoren
function gameOver() {
    updateHighscore(); // Päivittää highscoren
    alert('Peli päättyi! Pisteesi: ' + score); // Näyttää ilmoituksen pelin päättymisestä ja pelaajan pistemäärän
    resetGame(); // Nollaa pelin
}

// Nollaa pelin
function resetGame() {
    snake = [{x: 10, y: 10}]; // Asettaa madon alkupaikkaan
    apple = {x: 15, y: 15}; // Asettaa omenan alkupaikkaan
    dx = 0;
    dy = 0;
    score = 0; // Nollaa pistemäärän
}

// Näyttää pistenäkymän ja päivittää pistemäärät
function showScoreboard(score, highscore) {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
    
    const highscoreElement = document.getElementById('highscore');
    highscoreElement.textContent = highscore;
}

// Kuuntelee pistenäppäintä ja näyttää pistenäkymän
const scoreboardButton = document.getElementById('scoreboard-button');
scoreboardButton.addEventListener('click', () => {
    const modal = document.getElementById('scoreboard-modal');
    modal.style.display = 'block';
});

// Kuuntelee sulkupainiketta ja piilottaa pistenäkymän
const closeBtn = document.getElementsByClassName('close')[0];
closeBtn.addEventListener('click', () => {
    const modal = document.getElementById('scoreboard-modal');
    modal.style.display = 'none';
});
