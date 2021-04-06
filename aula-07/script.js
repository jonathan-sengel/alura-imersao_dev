'use strict'

let $btnSortear = document.querySelector('#sortear');
$btnSortear.addEventListener('click', sacarCarta);
let $estadoJogo = document.querySelector('.game-state');
let $playerCardElement = document.querySelector('#card-player');
let $cpuCardElement = document.querySelector('#card-cpu');
let $scoreBoardP1 = document.querySelector('#score-p1');
let $scoreBoardP2 = document.querySelector('#score-p2');
let playerCards = [];
let cpuCards = [];
let currentPlayerCard;
let currentCpuCard;

onload = () => {
    distribuirCartas();
}



async function distribuirCartas() {
    for (let i = 0; i < 5; i++) {
        let playerCard = await generateCard();
        playerCards.push(playerCard);
        let cpuCard = await generateCard();
        cpuCards.push(cpuCard);
        console.log(playerCards, cpuCards);
    }
    document.querySelector('#counter-p1').innerHTML = playerCards.length;
    document.querySelector('#counter-p2').innerHTML = cpuCards.length;
}

function sacarCarta() {

    if (playerCards.length > 0 && cpuCards.length > 0) {
        currentPlayerCard = playerCards.shift();
        currentCpuCard = cpuCards.shift();
        updateCardData($playerCardElement, currentPlayerCard);
        updateCardData($cpuCardElement, currentCpuCard);
        console.log(playerCards, cpuCards);
        virarCartaJogador($playerCardElement);
        document.querySelector('#counter-p1').innerHTML = playerCards.length;
        document.querySelector('#counter-p2').innerHTML = cpuCards.length;
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
    document.querySelector('#sortear').disabled = true;
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
    if (atribute == 'str') {
        if (currentPlayerCard.strength > currentCpuCard.strength) {
            $estadoJogo.innerHTML = 'You Won';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($playerCardElement, $cpuCardElement);
            $scoreBoardP1.querySelector('div>p:nth-child(2)').innerHTML = 1;
        }
        else if (currentPlayerCard.strength < currentCpuCard.strength) {
            $estadoJogo.innerHTML = 'You Lose';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($cpuCardElement, $playerCardElement);
        } else {
            $estadoJogo.innerHTML = 'Draw';
            virarCartaJogador($cpuCardElement);
            acaoEmpate($cpuCardElement, $playerCardElement);
        }
    }
    else if (atribute == 'speed') {
        if (currentPlayerCard.speed > currentCpuCard.speed) {
            $estadoJogo.innerHTML = 'You Won';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($playerCardElement, $cpuCardElement);
        }
        else if (currentPlayerCard.speed < currentCpuCard.speed) {
            $estadoJogo.innerHTML = 'You Lose';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($cpuCardElement, $playerCardElement);
        } else {
            $estadoJogo.innerHTML = 'Draw';
            virarCartaJogador($cpuCardElement);
            acaoEmpate($cpuCardElement, $playerCardElement);
        }
    }
    else if (atribute == 'int') {
        if (currentPlayerCard.intelligence > currentCpuCard.intelligence) {
            $estadoJogo.innerHTML = 'You Won';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($playerCardElement, $cpuCardElement);
        }
        else if (currentPlayerCard.intelligence < currentCpuCard.intelligence) {
            $estadoJogo.innerHTML = 'You Lose';
            virarCartaJogador($cpuCardElement);
            acaoVitoriaDerrota($cpuCardElement, $playerCardElement);
        } else {
            $estadoJogo.innerHTML = 'Draw';
            virarCartaJogador($cpuCardElement);
            acaoEmpate($cpuCardElement, $playerCardElement);
        }
    }
}

function acaoVitoriaDerrota(winnerPlayer, loserPlayer) {
    setTimeout(() => {
        winnerPlayer.closest('.card').classList.add('scale-up');
        loserPlayer.closest('.card').classList.add('brightness-low');
        $estadoJogo.classList.add('active');
    }, 800);
    setTimeout(() => {
        winnerPlayer.closest('.card').classList.remove('scale-up');
        loserPlayer.closest('.card').classList.remove('brightness-low');
        winnerPlayer.classList.remove('flip');
        loserPlayer.classList.remove('flip');
        winnerPlayer.querySelector('.name').classList.remove('name-show');
        loserPlayer.querySelector('.name').classList.remove('name-show');
        $estadoJogo.classList.remove('active');
    }, 3000);
    enableDisableActions();
}

function acaoEmpate(player1, player2) {
    setTimeout(() => {
        player1.closest('.card').classList.add('scale-up');
        player2.closest('.card').classList.add('scale-up');
        $estadoJogo.classList.add('active');
    }, 800);
    setTimeout(() => {
        player1.closest('.card').classList.remove('scale-up');
        player2.closest('.card').classList.remove('scale-up');
        player1.classList.remove('flip');
        player2.classList.remove('flip');
        player1.querySelector('.name').classList.remove('name-show');
        player2.querySelector('.name').classList.remove('name-show');
        $estadoJogo.classList.remove('active');
    }, 3000);
    enableDisableActions();
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
    setTimeout(() => {
        document.querySelector('#sortear').disabled = false;
    }, 3000);
}