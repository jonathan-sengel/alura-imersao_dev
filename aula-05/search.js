let $modalBtnAdd = document.querySelector('input[type="submit"]');
$modalBtnAdd.addEventListener('click', addMovie);

let $personalBtnAdd = document.querySelector('.add-movie');
$personalBtnAdd.addEventListener('click', showModal);

function createFavoriteMovie(name, trailerLink, imageUrl, review) {

    const movie = {};
    movie.name = name;
    movie.link = trailerLink;
    movie.image = imageUrl;
    movie.review = review;
    return movie;
}

function showMovieOnPage(movie) {

    let div1 = document.createElement('div');
    let divMedia = document.createElement('div');
    let imgMedia = document.createElement('img');

    div1.classList.add('movies-list__movie');
    divMedia.classList.add('movie__media');
    imgMedia.classList.add('movie__media__poster');

    imgMedia.src = movie.image;
    imgMedia.alt = movie.name;
    divMedia.appendChild(imgMedia);
    div1.appendChild(divMedia);

    document.querySelector('.movies__container').appendChild(div1);

}

function addMovie(e) {
    e.preventDefault();
    let $movieName = document.querySelector('input[name="name"]').value
    let $movieTrailerLink = document.querySelector('input[name="link"]').value
    let $movieImageUrl = document.querySelector('input[name="imagem"]').value
    let $movieReview = document.querySelector('input[name="review"]').value;

    let inputs = Array.from(document.querySelectorAll('input[type="text"]'));
    let errMsg = 'Preencha todos os campos!!';


    if (inputs.every(el => el.value != '')) {
        if(!$movieImageUrl.endsWith('.jpg') && !$movieImageUrl.endsWith('.png') && !$movieImageUrl.endsWith('.jfif') && !$movieImageUrl.endsWith('.gif')){
            throwError('link da imagem é inválida');
        }
        if($movieTrailerLink.substr(0,12) != 'https://www.' && $movieTrailerLink.substr(0,16) != 'https://youtu.be' && $movieTrailerLink.substr(0,32) != 'https://www.youtube.com/watch?v='){
            throwError('link do trailer é inválido');
        }
        if ($movieReview.substr(0, 12) != 'https://www.') {
            throwError('link do review é inválido');
        }
    }
    // let obj = createFavoriteMovie($movieName, $movieTrailerLink, $movieImageUrl, $movieReview);
    // console.log(obj);
    // showMovieOnPage(obj);
    // resetClear();

}

function resetClear() {
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="link"]').value = '';
    document.querySelector('input[name="imagem"]').value = ''
    document.querySelector('input[name="review"]').value = '';
    document.querySelector('.modal-container').classList.remove('display--flex');
    document.querySelector('.modal-container').classList.add('display--none');

}

function showModal() {
    document.querySelector('.modal-container').classList.remove('display--none');
    document.querySelector('.modal-container').classList.add('display--flex');
}

function throwError (msg){
    document.querySelector('#msg-error').innerHTML = msg;
}