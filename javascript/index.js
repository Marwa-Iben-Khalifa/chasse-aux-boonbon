let tab=[["bonbon1", 150], ["bonbon2", 100], ["bonbon3", 150], ["bonbon4", 100], ["bonbon5", 150], ["bonbon6", 200], ["bonbon7", 150], ["bonbon8", 100], ["bonbon9", 150], ["lait",20], ["viande", 15], ["bomb2", -250], ["bomb1", -250], ["gift", 1000]];
let score=0;
let tabScore=[];
var mainSong = new Audio("../sons/son1.mp3");
mainSong.loop = true;
mainSong.volume = 0.1;
let $section1 = document.getElementById('acceuil');
let $section2 = document.getElementById('jeux');
let $resultat= document.querySelector('#resultat');
//  creation d'un chronometre

const chronometer = new Chronometer()
// get the DOM elements that will serve us to display the time:

let $secDec = document.getElementById('secDec');
let $secUni = document.getElementById('secUni');
let $milDec = document.getElementById('milDec');
let $milUni = document.getElementById('milUni');

function printTime() {
  printMilliseconds();
  printSeconds()
}


function printSeconds() {
  let second = chronometer.twoDigitsNumber(chronometer.getSeconds());
  $secDec.innerHTML = second[0]
  $secUni.innerHTML = second[1]
  // return `${this.$secDec}${this.secUni}`

}

// ==> BONUS
function printMilliseconds() {
  // ... your code goes here
  let milSec = chronometer.twoDigitsNumber(chronometer.getMilliSecend());
  $milDec.innerHTML = milSec[0]
  $milUni.innerHTML = milSec[1]
}

const $startGame= document.querySelector('button');

//   Tri de tableau contenant les scores
//      de plus grand au plus petit:
function tri(tabScore){
  return tabScore.sort(function(a ,b ){
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  })
}

//   Afficher le rang du joueur:
function afficheResult(score){
  tri(tabScore);
  let rang= tabScore.indexOf(score);
  const r= $resultat.querySelector("span");
  r.innerText= `${rang+1}`;
  $resultat.style.display= "block";

}

//  selection un nombre aleatoirement:
function rand(from, to) {
  const length = to - from;
  return Math.trunc(Math.random()*length + from);
}
const $score = document.querySelector('#score span');

//  Mise à jours de la valeur du score dans la page:
function updateScore(num){
  $score.innerText= num
}
const $bar= document.querySelector('#game');
let i = 1;

//   affichages des mes élements dans ma div et 
//    les faire disparaitre en cliquant dessus:
function draw(){
  const caseTab=rand(tab.length, 0);
  const friandise=tab[caseTab];
  const $div = document.createElement('div')
  $div.className = `bonbon ${friandise[0]}`
  console.log(friandise[0]);
  $div.style.left = `${rand(120, window.innerWidth - 190)}px`
    // inject it into body
  $bar.appendChild($div);
    
    // bind click event
  $div.onclick = function () {
    if(i< 60){
      $bar.removeChild($div);
      let nbr= friandise[1];
      score += nbr;
      if (score<0){
        score= 0;}
      updateScore(score);
    }
  }

}

//   arrêter le jeux et afficher les resultats
//    soit en cliquant sur stop game ou après 
//            1mn d'exécution
function erase(){
  clearInterval(int);
  console.log(`score finale= ${score}`);
  tabScore.push(score);
  console.log(tabScore);
  afficheResult(score)
}
let j;
let int;

//   gerer l'affichage des éléments à fure et à mesures
//   que le temps avance et ça arrête quand ça arrive 
//     à 60 secondes:
function anim(interval, j){
  int= setInterval(function () {
    let j= chronometer.getSeconds();
    if (j === 60 ){
      console.log(` nombre des secondes :${chronometer.getSeconds}`)
      chronometer.stopClick();
      erase();
      mainSong.pause();
      $startGame.innerText = "Start Game";
      $startGame.className= 'start';
      chronometer.resetClick();
    }
    else {
      for (let i=0; i< j/5 ; i++){
          draw()
      }
    }
  }, interval)
}

//  gerer le clic sur le bouton et le bascule 
//  d'un div à un autre grace au style.display:
$startGame.addEventListener("click", () => {
  if(getComputedStyle($section1).display != "none"){
    $section1.style.display="none";
    $section2.style.display="block";
    $startGame.innerText="Start Game";
    console.log($startGame.innerText)
  }else if(getComputedStyle($section2).display === "block" && $startGame.innerText==="Start Game"){        
    $resultat.style.display= "none"; 
    mainSong.load();
    mainSong.play();
    $startGame.innerText= "Stop Game";
    $startGame.className= 'stop';
    score=0;
    updateScore(score);
    chronometer.startClick(printTime);
    anim(1000, j)
  }else {
    chronometer.stopClick();
    chronometer.resetClick();
    mainSong.pause();
    erase();
    $startGame.innerText = "Start Game";
    $startGame.className= 'start';
    } 
} )