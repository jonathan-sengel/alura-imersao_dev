let coins = 3;
const $colors = document.querySelectorAll('.colors');
const $resultH2 = document.querySelector('#result');
const $restartBtn = document.querySelector('#restart');
let randomMove = Math.floor(Math.random() * 10);
let win = false;

$colors.forEach((color, index) => {
    color.addEventListener('click', validateColor);
    color.dataset.id = index;
})

$restartBtn.addEventListener('click', restartGame);

function validateColor(e) {
    const elementClicked = e.target;

    if (coins > 0 && !win) {
        if (elementClicked.dataset.id == randomMove) {
            elementClicked.classList.add('correct');
            win = true;
            $resultH2.innerText = `Parabéns, voce acertou!`
        } else {
            elementClicked.classList.add('wrong');
            coins -= 1;
            $resultH2.innerText = `Jogadas restantes: ${coins}`
        }
        if (coins <= 0) {
            let correctColor = window.getComputedStyle($colors[randomMove], null).getPropertyValue('background-color');
            $resultH2.innerText = `Suas tentativas acabaram, a cor correta era ${correctColor}`
            document.body.style.backgroundColor = correctColor;
        }
    } else {
        console.log('jogo já finalizado');
    }
}

function restartGame() {
    coins = 3;
    randomMove = Math.floor(Math.random() * 10);
    win = false;
    $colors.forEach(color =>{
        color.classList.remove('correct');
        color.classList.remove('wrong');
        document.body.style.backgroundColor = '#000814e1';
        $resultH2.innerText = `Jogadas restantes: ${coins}`;
    })
}