//#region variaveis
const $btnResp = document.querySelector(".question__btn");
$btnResp.addEventListener("click", showStats);
const $btnRestart = document.querySelector(".restart");
$btnRestart.addEventListener("click", restartGame);

const $btnTip = document.querySelector(".question__btn-tip");
$btnTip.addEventListener("click", pushHelp);

const $btnTry = document.querySelector(".question__btn-restart");
$btnTry.addEventListener("click", reloadGame);

const $questionBlock = document.querySelector(".question");
const $qResp = document.querySelector(".question__resp");
$qResp.addEventListener("keydown", verifyEnter);

const $pokedex = document.querySelector(".pokedex");
const $modal = document.querySelector(".modal");
const $media = document.querySelector(".media");
const $result = document.querySelector(".result__info");
const $name = document.querySelector(".info__name");
const $number = document.querySelector(".info__number");
const $sprite = document.querySelector(".media__sprite");
const $type = document.querySelector("#type");
const $height = document.querySelector("#height");
const $weight = document.querySelector("#weight");
const $movesList = document.querySelector(".moves");
let $span = $questionBlock.querySelector("span");
//#endregion

let pokemon;

function loadPoke() {
  showPokemon();

  respFocus();
}

function pushHelp() {
  let qtd = pokemon.name.length;
  let nameF = pokemon.name.substr(qtd / 2);
  let nameR = pokemon.name;

  for (l of nameF) {
    nameR = nameR.replaceAll(l, "*");
  }
  $qResp.value = nameR;
}

async function showPokemon() {
  pokemon = await getPokemon(gerarUrl());
  console.log(pokemon.name);
  $sprite.src = pokemon.image;
  $name.textContent = pokemon.name;
  $number.textContent = "No. " + pokemon.number;
  pokemon.types.forEach((element, index, arr) => {
    if (index === arr.length - 1) {
      $type.textContent += element;
    } else {
      $type.textContent += element + ", ";
    }
  });

  $height.textContent = (pokemon.height / 10).toFixed(1) + " m";
  $weight.textContent = (pokemon.weight / 10).toFixed(1) + " kgs";

  pokemon.moves.forEach((element, index, arr) => {
    if (index === arr.length - 1) {
      $movesList.textContent += element;
    } else {
      $movesList.textContent += element + ", ";
    }
  });
}

function showStats() {
  if ($qResp.value.toLowerCase() == pokemon.name) {
    $span.innerHTML = "Acertouu !!!";
    $span.style.color = "green";
    setTimeout(() => {
      $modal.classList.toggle("modal--inactive");
      $media.classList.toggle("media--active");
      $result.classList.toggle("result__info--active");
      $pokedex.classList.toggle("pokedex--active");
      $btnRestart.classList.add("restart--active");
    }, 1000);
  } else {
    $questionBlock.classList.add("question--error");
    $span.innerHTML = "Errado, tente de novo!!!";
    $span.style.color = "red";
    setTimeout(() => {
      $questionBlock.classList.remove("question--error");
    }, 800);
    respFocus();
  }
}

function clearFields() {
  $btnRestart.classList.remove("restart--active");
  $type.textContent = "";
  $height.textContent = "";
  $weight.textContent = "";
  $movesList.textContent = "";
  $qResp.value = "";
}

function restartGame() {
  $media.classList.toggle("media--active");
  $result.classList.toggle("result__info--active");
  $pokedex.classList.toggle("pokedex--active");

  clearFields();
  loadPoke();
  $modal.classList.toggle("modal--inactive");
  $span.innerHTML = "";
  respFocus();
}

function reloadGame() {
  pokemon = getPokemon(gerarUrl());
  clearFields();
  loadPoke();
  $span.innerHTML = "";
  respFocus();
}

function respFocus() {
  setTimeout(() => {
    $qResp.focus();
  }, 0);
}

function verifyEnter(event) {
  if (event.key == "Enter") {
    showStats();
  }
}