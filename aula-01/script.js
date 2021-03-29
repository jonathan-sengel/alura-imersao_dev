const $btn = document.querySelector('.btn');
$btn.addEventListener('click', calcularResultado);

const $options = document.querySelectorAll('.item-box');
$options.forEach(item => {
    item.addEventListener('click', optionSelect);
});


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
    console.log($input);

    for (planet of planets){
        let result = ($input /9.80) * planet.gravity;
        console.log(result.toFixed(2));
        let elemento = document.querySelector(`#${planet.name}`);
        elemento.querySelector('h4').textContent = `${result.toFixed(2)} kgs`;
    }
    


}

function optionSelect(e) {
    switch (e.target.dataset.id) {
        case '1': console.log('Idade');
            break;
        case '2': console.log('Peso');
            break;
        case '3': console.log('Nome');
            break;
        default: console.log('Algo errado');
            break;
    }
}


