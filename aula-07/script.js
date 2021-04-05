'use strict'
document.querySelector('#sortear').addEventListener('click', distribuirCartas);
let cards = document.querySelectorAll('.card-inner');
cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

let $playerCardElement = document.querySelector('#card-player');
let $cpuCardElement = document.querySelector('#card-cpu');

onload = () => {
    distribuirCartas();
}

let playerCards;
let cpuCards;

async function distribuirCartas() {

    let playerCard = await generateCard();
    playerCards = playerCard;
    let cpuCard = await generateCard();
    cpuCards = cpuCard;

    updateCardData($playerCardElement, playerCard);
    updateCardData($cpuCardElement, cpuCard);

    $playerCardElement.classList.add('flip');
    document.querySelectorAll('.name')[0].classList.add('name-show');
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

function validarAcao(atribute) {
    if (atribute == 'str') {
        if (playerCards.strength > cpuCards.strength) {
            console.log('ganhouu');
            $cpuCardElement.classList.add('flip');
            document.querySelectorAll('.name')[1].classList.add('name-show');
            setTimeout(() => {
                $playerCardElement.closest('.card').classList.add('scale-up');
                $cpuCardElement.closest('.card').classList.add('brightness-low');
            }, 800);
            setTimeout(() => {
                $playerCardElement.closest('.card').classList.remove('scale-up');
                $cpuCardElement.closest('.card').classList.remove('brightness-low');
                $playerCardElement.classList.remove('flip');
                $cpuCardElement.classList.remove('flip');
                document.querySelectorAll('.name')[0].classList.remove('name-show');
                document.querySelectorAll('.name')[1].classList.remove('name-show');
            }, 3000);
        }
        else if (playerCards.strength < cpuCards.strength) {
            console.log('perdeu');
        } else {
            console.log('empate');
        }
        $cpuCardElement.classList.add('flip');
        document.querySelectorAll('.name')[1].classList.add('name-show');
    }
    else if (atribute == 'speed') {
        if (playerCards.speed > cpuCards.speed) {
            console.log('ganhouu');
        }
        else if (playerCards.speed < cpuCards.speed) {
            console.log('perdeu');
        } else {
            console.log('empate');
        }
    }
    else if (atribute == 'int') {
        if (playerCards.intelligence > cpuCards.intelligence) {
            console.log('ganhouu');
        }
        else if (playerCards.intelligence < cpuCards.intelligence) {
            console.log('perdeu');
        } else {
            console.log('empate');
        }
    }
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
