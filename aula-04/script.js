'use strict';

//#region VARIABLES DECLARATION
const baseImgUrl = 'https://image.tmdb.org/t/p/w300/';
const urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=eda6d9a6a9d492a2c3205744b78a5d19&language=pt-BR&page=1'
const urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=eda6d9a6a9d492a2c3205744b78a5d19&language=pt-BR&page=2';

const urlUpcoming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=eda6d9a6a9d492a2c3205744b78a5d19&language=pt-BR&page=1'

const urlTopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=eda6d9a6a9d492a2c3205744b78a5d19&language=pt-BR&page=1';
//#endregion

//#region ELEMENTS EVENTS
function charge() {
    // 500ms após o load do Body, ele chama os metodos para criar os catalogos na pagina
    setTimeout(() => {
        generateInTheCineCatalog(moviesInCinema);
        generateListCatalog('.movies-list.movies-list__popular', popularMovies);
        generateListCatalog('.movies-list.movies-list__latest', upComingMovies);
        generateListCatalog('.movies-list.movies-list__top-rated', ordenar(topRatedMovies));

    }, 500);
}

function showHideMobileMenu(e) {
    document.querySelector('.header .header__list').classList.toggle('header__list--active');
}

function showMovieInfo(event) {
    let details = event.target.parentElement.querySelector('.movie__details');
    details.classList.remove('movie__details--disabled');
}

function hideMovieInfo(event) {
    let details = event.target.parentElement.querySelector('.movie__details');
    details.classList.add('movie__details--disabled');
}
//#endregion

//#region METHODS FOR CREATING CATALOG LISTS

//função para gerar cada um dos catalogos de filme da pagina, recebe uma lista de filmes e em qual container será escrito;
function generateListCatalog(container, moviesList) {

    const moviesContainer = document.querySelector(container).querySelector('.movies__container');

    moviesList.forEach(movie => {

        let divMedia = createMovieMedia(movie);
        let divDetails = createMovieDetails(movie);
        let divInfo = createMovieInfo();

        let divMovie = createMovie(movie, divMedia, divDetails, divInfo);

        moviesContainer.appendChild(divMovie);
        moviesContainer.id = container.substring(13) + 'C';
    });
}

//metodo para criar um filme recebendo os 4 argumentos abaixo
function createMovie(movie, media, details, info) {
    let divMovie = document.createElement('div');
    divMovie.classList.add('movies-list__movie');
    divMovie.id = movie.id;

    divMovie.appendChild(media);
    divMovie.appendChild(details);
    divMovie.appendChild(info);
    return divMovie;
}

//metodo para criar a midia de um filme (imagem)
function createMovieMedia(movie) {

    let divRating = document.createElement('div');
    divRating.classList.add('movie__media__rating');
    let span = document.createElement('span');
    span.textContent = movie.vote_average.toFixed(1);
    divRating.appendChild(span);

    let img = document.createElement('img');
    img.classList.add('movie__media__poster');
    img.src = baseImgUrl + movie.poster_path;
    img.alt = movie.title;

    let divMedia = document.createElement('div');
    divMedia.classList.add('movie__media');
    divMedia.appendChild(divRating);
    divMedia.appendChild(img);

    return divMedia;
}

//metodo para criar os detalhes de um filme 
function createMovieDetails(movie) {

    let divTitle = document.createElement('div');
    divTitle.classList.add('movie__details__title');
    divTitle.textContent = movie.title;

    let divOverview = document.createElement('div');
    divOverview.classList.add('movie__details__more-info');
    divOverview.textContent = movie.overview.substring(0, 130) + '...';

    let divRelease = document.createElement('div');
    divRelease.classList.add('movie__details__release');
    divRelease.innerHTML = 'Lançamento: ' + movie.release_date;

    let divDetails = document.createElement('div');
    divDetails.classList.add('movie__details', 'movie__details--disabled');
    divDetails.appendChild(divTitle);
    divDetails.appendChild(divOverview);
    divDetails.appendChild(divRelease);

    return divDetails;

}

//cria o botão de info em cada filme
function createMovieInfo() {

    let divInfo = document.createElement('div');
    divInfo.classList.add('movie__more__info');
    // divInfo.innerHTML = '&#x1F6C8;';
    divInfo.addEventListener('mouseover', showMovieInfo);
    divInfo.addEventListener('mouseout', hideMovieInfo);

    // divInfo.parentElement
    return divInfo;
}
//#endregion

//#region API CALLING

//==================================== IN CINE LIST ==========================================

let isActived = {};
const moviesInCinema = getNowPlaying();



function getNowPlaying() {
    const nowPlayingMovies = [];
    fetch(urlNowPlaying).then(resp => {
        return resp.json();
    }).then(movies => {
        movies.results.forEach(movie => nowPlayingMovies.push(movie));
    });
    return nowPlayingMovies;
}


function generateInTheCineCatalog(moviesList) {
    const swatch = document.querySelector('.featured-list__swatch-bar');
    moviesList.forEach((movie, index) => {

        let divMovie = document.createElement('div');
        divMovie.classList.add('swatch-bar__movie');
        divMovie.id = (movie.id);
        divMovie.addEventListener('click', setToActive);

        let spanTitle = document.createElement('span');
        spanTitle.classList.add('swatch-bar__movie__title');
        spanTitle.textContent = movie.title;

        let img = document.createElement('img');
        img.classList.add('swatch-bar__movie__poster');
        img.src = baseImgUrl + movie.poster_path;
        img.alt = movie.title;

        divMovie.appendChild(spanTitle);
        divMovie.appendChild(img);
        swatch.appendChild(divMovie);
        if (index === 0) {
            isActived = img;
            isActived.classList.add('swatch-bar__movie__poster--active');
            let contentBackGround = document.querySelector('.featured-list__content');
            contentBackGround.style.backgroundImage = `url("${img.src.replaceAll("w300", "original")}")`;
        }
        swatch.id = 'swatch-barC';
    });

}

function setToActive(event) {
    isActived.classList.remove('swatch-bar__movie__poster--active');
    event.target.classList.add('swatch-bar__movie__poster--active');
    isActived = event.target;
    let contentBackGround = document.querySelector('.featured-list__content');
    contentBackGround.style.backgroundImage = `url("${isActived.src.replaceAll("w300", "original")}")`;
}

//=================================== POPULAR LIST ==========================================*/

const popularMovies = getPopularList();

function getPopularList() {

    const popularListMovies = [];
    fetch(urlPopular).then(resp => {
        return resp.json();
    }).then(movies => {
        movies.results.forEach(movie => popularListMovies.push(movie));
    });
    return popularListMovies;
}

//=================================== UPCOMING LIST ==========================================*/

const upComingMovies = getUpcomingList();

function getUpcomingList() {

    const upcomingListMovies = [];
    fetch(urlUpcoming).then(resp => {
        return resp.json();
    }).then(movies => {
        movies.results.forEach(movie => upcomingListMovies.push(movie));
    });
    return upcomingListMovies;
}

//=================================== TOP RATED LIST ==========================================*/

const topRatedMovies = getTopRatedList();

function getTopRatedList() {

    const topRatedListMovies = [];
    fetch(urlTopRated).then(resp => {
        return resp.json();
    }).then(movies => {
        movies.results.forEach(movie => topRatedListMovies.push(movie));
    });
    return topRatedListMovies;
}
//#endregion



function ordenar(lista) {
    lista.sort(function (a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    return lista;
}