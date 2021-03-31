const $colors = document.querySelectorAll('.colors');
const $resultH2 = document.querySelector('#result');
const $textH2 = document.querySelector('#info');
const $restartBtn = document.querySelector('#restart');

let coins = 3;
let lastRandom;
let randomMove = randomNum();
let win = false;
let correctColorElement = $colors[randomMove];

$colors.forEach((color, index) => {
    color.addEventListener('click', validateColor);
    color.dataset.id = index;
})
$restartBtn.addEventListener('click', restartGame);

function validateColor(e) {
    const elementClicked = e.target;
    let correctColor = window.getComputedStyle(correctColorElement, null).getPropertyValue('background-color');

    if(elementClicked.className.indexOf('clicked') != -1){
        return;
    }

    if (coins > 0 && !win) {
        if (elementClicked.dataset.id == randomMove) {
            elementClicked.classList.add('correct');
            win = true;
            $resultH2.innerText = `Parabéns, voce acertou!`;
            document.body.style.backgroundColor = correctColor;
            changeStyleH2Win()
        } else {
            elementClicked.classList.add('wrong','clicked');
            coins -= 1;
            $resultH2.innerText = `Jogadas restantes: ${coins}`
            
        }
        if (coins <= 0) {
            $resultH2.innerHTML = `Suas tentativas acabaram, a cor correta era <br><mark style="background-color:${correctColor};color:#f8f7ff;">${correctColor}</mark>`;
            correctColorElement.classList.add('correct-color');
        }
    } else {
        console.log('jogo já finalizado');
    }
}

function restartGame() {
    coins = 3;
    lastRandom = randomMove;
    randomMove = randomNum();
    win = false;
    correctColorElement = $colors[randomMove];
    $colors.forEach(color => {
        color.classList.remove('correct','wrong','clicked','correct-color');
    })
    document.body.style.backgroundColor = '#000814e1';
    $resultH2.innerText = `Jogadas restantes: ${coins}`;
    changeStyleH2Restart()
}

function changeStyleH2Win() {
    $resultH2.classList.add('finished');
}

function changeStyleH2Restart() {
    $resultH2.classList.remove('finished');
}

function randomNum() {
    let newRandom = Math.floor(Math.random() * 12);
    return newRandom = (newRandom == lastRandom) ? Math.floor(Math.random() * 12) : newRandom;
}