let players;

onload = function () {
    if (!!localStorage.jogadores) {
        players = JSON.parse(localStorage.getItem('jogadores'));
        Object.values(players).forEach(player => {
            addPlayerRow(player, player.key);
        });
    } else {
        players = {};
    }
}

const characters = {
    'bowser': { name: 'Bowser', picture: 'https://mario.wiki.gallery/images/7/74/BowserMKW.png' },
    'donkeykong': { name: 'Donkey Kong', picture: 'https://mario.wiki.gallery/images/7/73/DonkeyKongMKW.png' },
    'luigi': { name: 'Luigi', picture: 'https://mario.wiki.gallery/images/a/a9/LuigiMKW.png' },
    'mario': { name: 'Mario', picture: 'https://mario.wiki.gallery/images/c/c5/MarioMKW.png' },
    'peach': { name: 'Peach', picture: 'https://mario.wiki.gallery/images/0/0d/PeachMKW.png' },
    'toad': { name: 'Toad', picture: 'https://mario.wiki.gallery/images/9/97/ToadMKW.png' },
    'wario': { name: 'Wario', picture: 'https://mario.wiki.gallery/images/5/51/WarioMKW.png' },
    'yoshi': { name: 'Yoshi', picture: 'https://mario.wiki.gallery/images/f/f5/MKW_Yoshi_Icon.png' }
}

let $btnAdd = document.querySelector('.btn-add');
$btnAdd.addEventListener('click', createNewPlayer);


function createNewPlayer() {
    let key = document.querySelector('.players-options').value;
    console.log(key);
    if (players[key]) {
        console.log('deu ruim jogador já listado');
        document.querySelector('select').classList.add('piscar');
        document.querySelector(`tr[data-name="${key}"]`).classList.add('piscar');
        setTimeout(() => {
            document.querySelector('select').classList.remove('piscar');
            document.querySelector(`tr[data-name="${key}"]`).classList.remove('piscar');

        }, 2000);
        return
    }

    let player = {
        name: characters[key].name,
        pic: characters[key].picture,
        wins: 0,
        draw: 0,
        defeats: 0,
        pts: 0,
        key: key
    }
    players[key] = player;
    localStorage.setItem('jogadores', JSON.stringify(players));
    addPlayerRow(player, key);
}

function addPlayerRow(player, key) {
    let $table = document.querySelector('.table-container tbody');

    let tr = document.createElement('tr');
    let tdHtml = `<td><img src=${player.pic}></td>`;
    tdHtml += `<td>${player.name}</td>`;
    tdHtml += `<td>${player.pts}</td>`;
    tdHtml += `<td>${player.wins}</td>`;
    tdHtml += `<td>${player.draw}</td>`;
    tdHtml += `<td>${player.defeats}</td>`;
    tdHtml += `<td class="actions"><input class="${key}" type="button" value="vitoria" ><input class="${key}" type="button" value="empate"></td>`;


    tr.addEventListener('click', actionPlayers);
    tr.dataset.name = key;
    tr.innerHTML = tdHtml;
    $table.appendChild(tr);
    let buttons = document.querySelectorAll(`.${key}`);
    buttons[0].addEventListener('click', function (e) {
        actionButton(e, key, 'win');
    });
    buttons[1].addEventListener('click', function (e) {
        actionButton(e, key, 'draw');
    });
}

function actionPlayers(e) {
    let parentElem = e.target.closest('tr');

    if (parentElem.className == 'selected') {
        parentElem.classList.remove('selected');
    }
    else if (document.querySelectorAll('.selected').length < 2) {
        parentElem.classList.add('selected');
    }
}

function actionButton(e, key, state) {
    e.stopPropagation();

    let selecteds = document.querySelectorAll('.selected');

    if (selecteds.length == 2) {

        let player1 = selecteds[0].dataset.name,
            player2 = selecteds[1].dataset.name;

        if (state == 'draw' && (player1 == key || player2 == key)) {
            players[player1].draw += 1;
            players[player2].draw += 1;
        } else if (player1 == key) {
            players[player1].wins += 1;
            players[player2].defeats += 1;
        } else if (player2 == key) {
            players[player2].wins += 1;
            players[player1].defeats += 1;
        }


        sumPontos(player1);
        sumPontos(player2);
        localStorage.setItem('jogadores', JSON.stringify(players));
        updatePlayer(player1);
        updatePlayer(player2);
    }
}


function updatePlayer(key) {

    let pontos = document.querySelector(`tr[data-name="${key}"]>td:nth-child(3)`),
        vitorias = document.querySelector(`tr[data-name="${key}"]>td:nth-child(4)`),
        empates = document.querySelector(`tr[data-name="${key}"]>td:nth-child(5)`),
        derrotas = document.querySelector(`tr[data-name="${key}"]>td:nth-child(6)`);

    pontos.innerHTML = players[key].wins * 3 + players[key].draw;
    vitorias.innerHTML = players[key].wins;
    derrotas.innerHTML = players[key].defeats;
    empates.innerHTML = players[key].draw;
}

function sumPontos(key){
    players[key].pts = players[key].wins * 3 + players[key].draw;
}