const $btn = document.querySelector('.btn');
$btn.addEventListener('click', calcularResultado);

const $options = document.querySelectorAll('.item-box');
$options.forEach(item => {
    item.addEventListener('click', optionSelect);
});

const $input = document.querySelector('.info-input');
$input.addEventListener('keydown', verifyEnter);

let choice;


const planets = [
    {
        name: 'mercurio',
        gravity: 3.7,
        orbitTime: 87.96
    },
    {
        name: 'venus',
        gravity: 8.87,
        orbitTime: 224.70
    },
    {
        name: 'terra',
        gravity: 9.80,
        orbitTime: 365
    },
    {
        name: 'marte',
        gravity: 3.71,
        orbitTime: 686.97
    },
    {
        name: 'jupiter',
        gravity: 24.79,
        orbitTime: 4331.57
    },
    {
        name: 'saturno',
        gravity: 10.44,
        orbitTime: 10759.22
    },
    {
        name: 'urano',
        gravity: 8.69,
        orbitTime: 30799.095
    },
    {
        name: 'netuno',
        gravity: 11.15,
        orbitTime: 60190.03
    }
]

function calcularResultado(e) {
    let $input = Number(document.querySelector('.info-input').value);

    if (!$input == '') {
        for (planet of planets) {

            if (choice === "weight") {
                let result = ($input / 9.80) * planet.gravity;
                let elemento = document.querySelector(`#${planet.name}`);
                elemento.querySelector('h2').textContent = `${planet.name}`;
                elemento.querySelector('h3').textContent = `seu peso é:`;
                elemento.querySelector('h4').innerHTML = `<mark>${result.toFixed(2)} kgs</mark>`;
            }

            if (choice === "old") {
                let result = ($input * 365) / planet.orbitTime;
                let elemento = document.querySelector(`#${planet.name}`);
                elemento.querySelector('h2').textContent = `${planet.name}`;
                elemento.querySelector('h3').textContent = `sua idade é:`;
                elemento.querySelector('h4').innerHTML = `<mark>${result.toFixed(1)} anos</mark>`;
            }

            if (choice === "name") {
                $input = document.querySelector('.info-input').value;
                let nome = $input + planet.name.shuffle();
                let elemento = document.querySelector(`#${planet.name}`);
                elemento.querySelector('h2').textContent = `${planet.name}`;
                elemento.querySelector('h3').textContent = `seu nome é:`;
                elemento.querySelector('h4').innerHTML = `<mark>${nome.shuffle().capitalize()}</mark>`;
            }
        }
    } else {
        alert('por favor selecione a unidade');
    }
}

function optionSelect(e) {

    for (option of $options) {
        option.classList.remove('selected');
    }
    e.target.classList.toggle('selected');

    switch (e.target.dataset.id) {
        case '1': choice = 'old';
            $input.type = 'number';
            $input.placeholder = 'digite sua idade';
            break;
        case '2': choice = 'weight';
            $input.type = 'number';
            $input.placeholder = 'digite seu peso';
            break;
        case '3': choice = 'name';
            $input.type = 'text';
            $input.placeholder = 'digite sua idade';
            break;
        default: console.log('Algo errado');
            break;
    }

    $input.value = '';
    $input.focus();

}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function verifyEnter(e) {
    console.log(e.key);
    if (e.key == 'Enter') {
        calcularResultado();
    }
}