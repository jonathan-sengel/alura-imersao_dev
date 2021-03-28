const gerarUrl = () => { return 'https://pokeapi.co/api/v2/pokemon/' + Math.ceil(Math.random() * 251); }

function getPokemon(url) {

    const pokemon = {};

    fetch(url).then(response => response.json()).then(poke => {
        pokemon.name = poke.name;
        pokemon.types = poke.types.map(type => {
            return type.type.name;
        });
        pokemon.height = poke.height;
        pokemon.weight = poke.weight;
        pokemon.number = poke.id;
        pokemon.image = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + ("000" + poke.id).slice(-3) + '.png';

        pokemon.moves = poke.moves.map(move => {
            return move.move.name;
        });
    })
    return pokemon;
}