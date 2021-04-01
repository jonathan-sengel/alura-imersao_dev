'use strict'

const createSearchUrl = function (query) {
    return 'https://api.themoviedb.org/3/search/movie?api_key=eda6d9a6a9d492a2c3205744b78a5d19&language=pt-BR&query=' + query + '&page=1&include_adult=false';
}

let $search = document.querySelector('.search-input');
let $resultList = document.querySelector('.result-list');
let $btnAdd = document.querySelector('.btn-add-movie');

let resultMovies = [];

$search.addEventListener('keyup', valideKey);
$btnAdd.addEventListener('click', uploadMovies);

async function loadSearch(query) {
    let url = createSearchUrl(query);
    

    await fetch(url).then(resp => {
        return resp.json();
    }).then(movies => {
        resultMovies = movies.results
    });
    return resultMovies;
}

function inputInModel(moviesList) {

    moviesList.forEach(movie => {
        let liMovie = document.createElement('li');
        liMovie.innerHTML = `<span>${movie.title}</span> <span>${movie.release_date} </span>`;
        liMovie.dataset.movieId = movie.id;
        liMovie.addEventListener('click', addClickClass);
        $resultList.appendChild(liMovie);
    })
}

async function valideKey(e) {
    if (e.key == 'Enter') {
        $resultList.innerHTML = '';
        inputInModel(await loadSearch(e.target.value));
    }
    if (e.key == 'Backspace') {
        $resultList.innerHTML = '';
        inputInModel(await loadSearch(e.target.value));
    }
}

function addClickClass(e) {
    e.target.classList.toggle('list-item--clicked');
}

function uploadMovies(e) {
    let list = document.querySelectorAll('.list-item--clicked');
    console.log(list);
}