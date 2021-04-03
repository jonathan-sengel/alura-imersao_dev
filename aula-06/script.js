const players = [];
const pictures = {
    'Bowser': { picture: 'https://mario.wiki.gallery/images/7/74/BowserMKW.png' },
    'Donkey Kong': { picture: 'https://mario.wiki.gallery/images/7/73/DonkeyKongMKW.png' },
    'Luigi': { picture: 'https://mario.wiki.gallery/images/a/a9/LuigiMKW.png' },
    'Mario': { picture: 'https://mario.wiki.gallery/images/c/c5/MarioMKW.png' },
    'Peach': { picture: 'https://mario.wiki.gallery/images/0/0d/PeachMKW.png' },
    'Toad': { picture: 'https://mario.wiki.gallery/images/9/97/ToadMKW.png' },
    'Wario': { picture: 'https://mario.wiki.gallery/images/5/51/WarioMKW.png' },
    'Yoshi': { picture: 'https://mario.wiki.gallery/images/f/f5/MKW_Yoshi_Icon.png' }
}

let $btnAdd = document.querySelector('.btn-add');
$btnAdd.addEventListener('click', createNewPlayer);


function addNewPlayer(player) {
    let $table = document.querySelector('.table-container tbody');

    let tableRow = document.createElement('tr');
    let tdHtml = `<td><img src=${player.pic}></td>`;
    tdHtml += `<td>${player.playerName}</td>`;
    tdHtml += `<td>${player.wins}</td>`;
    tdHtml += `<td>${player.draw}</td>`;
    tdHtml += `<td>${player.def}</td>`;
    tdHtml += `<td>${player.pts}</td>`;
    tdHtml += `<td class="actions"><input type="button" value="vitoria"><input type="button" value="empate"></td>`;

    tableRow.addEventListener('click', actionPlayers);
    tableRow.dataset.name = player.playerName;
    tableRow.innerHTML = tdHtml;
    $table.appendChild(tableRow);
}

function createNewPlayer() {
    let name = document.querySelector('.players-options').value

    let player = {
        playerName: name,
        pic: pictures[name].picture,
        wins:0,
        draw:0,
        def: 0,
        pts:0
    }

    addNewPlayer(player);
}

function actionPlayers(e){
    let parentElem = e.target.closest('tr');
    parentElem.classList.add('selected');
    console.log(parentElem.dataset.name);
}