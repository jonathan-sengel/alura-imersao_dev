'use strict'

// let $btnSortear = document.querySelector('#sortear');
// $btnSortear.addEventListener('click', sacarCarta);
let $estadoJogo = document.querySelector('.game-state');
let $playerCardElement = document.querySelector('#card-player');
let $cpuCardElement = document.querySelector('#card-cpu');
let $scoreBoardP1 = document.querySelector('#score-p1');
let $scoreBoardP2 = document.querySelector('#score-p2');
let audioFlipCard = new Audio('https://freesound.org/data/previews/536/536782_1415754-lq.mp3');
let endGame = false;
let player1 = {
    deck: [],
    wins: 0,
    draw: 0,
    loses: 0
}

let player2 = {
    deck: [],
    wins: 0,
    draw: 0,
    loses: 0
}

let currentPlayerCard;
let currentCpuCard;

onload = async () => {
    await distribuirCartas();
    sacarCarta();
}

async function distribuirCartas() {
    for (let i = 0; i < 5; i++) {
        let playerCard = await generateCard();
        player1.deck.push(playerCard);
        let cpuCard = await generateCard();
        player2.deck.push(cpuCard);
    }
    document.querySelector('#counter-p1').innerHTML = player1.deck.length;
    document.querySelector('#counter-p2').innerHTML = player2.deck.length;
}

function sacarCarta() {
    if (player1.deck.length > 0 && player2.deck.length > 0) {
        audioFlipCard.play();
        currentPlayerCard = player1.deck.shift();
        currentCpuCard = player2.deck.shift();
        updateCardData($playerCardElement, currentPlayerCard);
        updateCardData($cpuCardElement, currentCpuCard);
        virarCartaJogador($playerCardElement);
        document.querySelector('#counter-p1').innerHTML = player1.deck.length;
        document.querySelector('#counter-p2').innerHTML = player2.deck.length;
    } else if(!endGame) {
        gameOver();
    }

}

async function generateCard() {
    let char = {};
    await fetch(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${aleatoryNumber()}.json`)
        .then(response => response.json())
        .then(heroe => {
            char.name = heroe.name;
            char.strength = heroe.powerstats.strength;
            char.speed = heroe.powerstats.speed;
            char.intelligence = heroe.powerstats.intelligence;
            char.image = heroe.images.md;
        });
    return char;
}

function virarCartaJogador(cartaJogador) {
    cartaJogador.classList.add('flip');
    cartaJogador.querySelector('.name').classList.add('name-show');
    document.querySelector('.btn-strength').disabled = false;
    document.querySelector('.btn-speed').disabled = false;
    document.querySelector('.btn-intelligence').disabled = false;
}

function updateCardData(cardElement, charCard) {

    let imgElement = cardElement.querySelector('img');
    let strElement = cardElement.querySelector('.strength');
    let speedElement = cardElement.querySelector('.speed');
    let intElement = cardElement.querySelector('.intelligence');
    let nameElement = cardElement.querySelector('.name');

    imgElement.src = charCard.image;
    strElement.innerHTML = `Força: ${charCard.strength}`;
    speedElement.innerHTML = `Velocidade: ${charCard.speed}`;
    intElement.innerHTML = `Inteligência: ${charCard.intelligence}`;
    nameElement.innerHTML = charCard.name;
}

function validarAcao(atribute) {
    audioFlipCard.play();
    if (atribute == 'str') {
        if (currentPlayerCard.strength > currentCpuCard.strength) {
            $estadoJogo.innerHTML = '<mark>You Won</mark>';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($playerCardElement, $cpuCardElement);
        }
        else if (currentPlayerCard.strength < currentCpuCard.strength) {
            $estadoJogo.innerHTML = '<mark>You Lose</mark>';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($cpuCardElement, $playerCardElement);
        } else {
            $estadoJogo.innerHTML = '<mark>Draw</mark>';
            virarCartaJogador($cpuCardElement);
            acaoEmpate($cpuCardElement, $playerCardElement);
        }
    }
    else if (atribute == 'speed') {
        if (currentPlayerCard.speed > currentCpuCard.speed) {
            $estadoJogo.innerHTML = '<mark>You Won</mark>';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($playerCardElement, $cpuCardElement);
        }
        else if (currentPlayerCard.speed < currentCpuCard.speed) {
            $estadoJogo.innerHTML = '<mark>You Lose</mark>';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($cpuCardElement, $playerCardElement);
        } else {
            $estadoJogo.innerHTML = '<mark>Draw</mark>';
            virarCartaJogador($cpuCardElement);
            acaoEmpate($cpuCardElement, $playerCardElement);
        }
    }
    else if (atribute == 'int') {
        if (currentPlayerCard.intelligence > currentCpuCard.intelligence) {
            $estadoJogo.innerHTML = '<mark>You Won</mark>';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($playerCardElement, $cpuCardElement);
        }
        else if (currentPlayerCard.intelligence < currentCpuCard.intelligence) {
            $estadoJogo.innerHTML = '<mark>You Lose</mark>';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($cpuCardElement, $playerCardElement);
        } else {
            $estadoJogo.innerHTML = '<mark>Draw</mark>';
            virarCartaJogador($cpuCardElement);
            acaoEmpate($cpuCardElement, $playerCardElement);
        }
    }
    setTimeout(() => {
        sacarCarta();
    }, 3750);
}

function acaoVitoriaDerrota(winnerPlayer, loserPlayer) {

    setTimeout(() => {
        winnerPlayer.closest('.card').classList.add('scale-up');
        loserPlayer.closest('.card').classList.add('brightness-low');
        $estadoJogo.classList.add('active');
        if (winnerPlayer.dataset.player == 'player1') {
            player1.wins++;
            player2.loses++;
            $scoreBoardP1.querySelector('#p1-wins').innerHTML = player1.wins;
            $scoreBoardP2.querySelector('#p2-loses').innerHTML = player2.loses;

        } else {
            player1.loses++;
            player2.wins++;
            $scoreBoardP1.querySelector('#p1-loses').innerHTML = player1.loses;
            $scoreBoardP2.querySelector('#p2-wins').innerHTML = player2.wins;
        }
    }, 800);
    setTimeout(() => {
        winnerPlayer.closest('.card').classList.remove('scale-up');
        loserPlayer.closest('.card').classList.remove('brightness-low');
        winnerPlayer.classList.remove('flip');
        loserPlayer.classList.remove('flip');
        winnerPlayer.querySelector('.name').classList.remove('name-show');
        loserPlayer.querySelector('.name').classList.remove('name-show');
        $estadoJogo.classList.remove('active');
        if (player1.deck.length == 0 && player2.deck.length == 0) {
            gameOver();
        }
    }, 3000);
    enableDisableActions();

}

function acaoEmpate(p1, p2) {
    setTimeout(() => {
        p1.closest('.card').classList.add('scale-up');
        p2.closest('.card').classList.add('scale-up');
        $estadoJogo.classList.add('active');
        player1.draw++;
        player2.draw++;
        $scoreBoardP1.querySelector('#p1-draw').innerHTML = player1.draw;
        $scoreBoardP2.querySelector('#p2-draw').innerHTML = player2.draw;
    }, 800);
    setTimeout(() => {
        p1.closest('.card').classList.remove('scale-up');
        p2.closest('.card').classList.remove('scale-up');
        p1.classList.remove('flip');
        p2.classList.remove('flip');
        p1.querySelector('.name').classList.remove('name-show');
        p2.querySelector('.name').classList.remove('name-show');
        $estadoJogo.classList.remove('active');
        if (player1.deck.length == 0 && player2.deck.length == 0) {
            gameOver();
        }
    }, 3000);
    enableDisableActions();

}

function gameOver() {
    endGame = true;
    $estadoJogo.innerHTML = 'Game Over';
    $estadoJogo.classList.add('active');
    $scoreBoardP1.classList.add('game-over1');
    $scoreBoardP2.classList.add('game-over2');
    document.querySelector('.actions-container').classList.add('desfoque');
    document.querySelectorAll('.card')[0].classList.add('desfoque');
    document.querySelectorAll('.card')[1].classList.add('desfoque');

    let finishText = '';
    if (player1.wins > player2.wins) {
        finishText = 'O Vencedor foi Player 1'
        $scoreBoardP1.querySelectorAll('div').forEach(el => el.classList.add('win-color'));
        $scoreBoardP2.querySelectorAll('div').forEach(el => el.classList.add('lose-color'));
    } else if (player1.wins < player2.wins) {
        finishText = 'O Vencedor foi CPU'
        $scoreBoardP1.querySelectorAll('div').forEach(el => el.classList.add('lose-color'));
        $scoreBoardP2.querySelectorAll('div').forEach(el => el.classList.add('win-color'));
    } else {
        finishText = 'Houve Empate'
        $scoreBoardP1.querySelectorAll('div').forEach(el => el.classList.add('draw-color'));
        $scoreBoardP2.querySelectorAll('div').forEach(el => el.classList.add('draw-color'));
    }
    $estadoJogo.innerHTML = `${finishText}<br><input class="btn-restart" type="button" value="Jogar Novamente"
    onclick="restartGame()"></input>`
}

function aleatoryNumber() {

    let charsIds = [1, 3, 4, 5, 6, 10, 11, 13, 24, 30, 31, 32, 34, 35, 38, 39, 40, 48, 52, 60, 61, 63, 66, 68, 70, 73, 75, 76, 87, 92, 98, 106, 107, 112, 118, 136, 141, 144, 149, 150, 151, 152, 156, 157, 160, 165, 174, 185, 194, 195, 196, 201, 202, 204, 206, 207, 208, 213, 214, 215, 218, 222, 224, 225, 226, 237, 238, 251, 257, 259, 261, 265, 268, 275, 280, 285, 289, 294, 299, 306, 311, 313, 315, 330, 332, 333, 334, 339, 344, 345, 346, 361, 370, 373, 374, 376, 384, 387, 388, 390, 397, 412, 414, 422, 423, 427, 431, 433, 441, 452, 458, 462, 477, 483, 502, 516, 517, 520, 521, 254, 527, 528, 530, 532, 536, 542, 545, 547, 549, 551, 556, 564, 566, 567, 570, 572, 581, 589, 601, 611, 613, 618, 619, 620, 623, 628, 632, 633, 643, 644, 645, 654, 655, 657, 658, 659, 661, 664, 666, 678, 679, 680, 681, 685, 686, 687, 690, 711, 717, 718, 720, 723, 729, 731];

    let id = Math.floor(Math.random() * charsIds.length);
    return charsIds[id];
}

function flipCard(e) {
    let $cardInner = e.target.closest('.card-inner');
    $cardInner.classList.toggle('flip');
}

function enableDisableActions() {
    document.querySelector('.btn-strength').disabled = true;
    document.querySelector('.btn-speed').disabled = true;
    document.querySelector('.btn-intelligence').disabled = true;
}

async function restartGame() {
    player1 = {
        deck: [],
        wins: 0,
        draw: 0,
        loses: 0
    }
    player2 = {
        deck: [],
        wins: 0,
        draw: 0,
        loses: 0
    }
    $estadoJogo.classList.remove('active');
    $scoreBoardP1.classList.remove('game-over1');
    $scoreBoardP2.classList.remove('game-over2');
    document.querySelector('.actions-container').classList.remove('desfoque');
    document.querySelectorAll('.card').forEach(el => el.classList.remove('desfoque'));
    $scoreBoardP1.querySelectorAll('div').forEach(el => el.classList.remove('draw-color', 'win-color', 'lose-color'));
    $scoreBoardP2.querySelectorAll('div').forEach(el => el.classList.remove('draw-color', 'win-color', 'lose-color'));
    $scoreBoardP1.querySelector('#p1-wins').innerHTML = 0;
    $scoreBoardP2.querySelector('#p2-wins').innerHTML = 0;
    $scoreBoardP1.querySelector('#p1-loses').innerHTML = 0;
    $scoreBoardP2.querySelector('#p2-loses').innerHTML = 0;
    $scoreBoardP1.querySelector('#p1-draw').innerHTML = 0;
    $scoreBoardP2.querySelector('#p2-draw').innerHTML = 0;

    onload();
}