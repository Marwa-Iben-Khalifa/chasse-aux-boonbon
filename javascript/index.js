let tab=[["bonbon1", 150], ["bonbon2", 100], ["bonbon3", 150], ["bonbon4", 100], ["bonbon5", 150], ["bonbon6", 200], ["bonbon7", 150], ["bonbon8", 100], ["bonbon9", 150], ["lait",20], ["viande", 15], ["bomb2", -250], ["bomb1", -250], ["gift", 1000]];
let score=0;
let tabScore=[];
var mainSong = new Audio("./sons/son1.mp3");
var biip = new Audio("./sons/biip.mp3");
var biip1= new Audio("./sons/biip1.mp3");
mainSong.loop = true;
mainSong.volume = 0.1;
biip.volume= 1;
biip1.volume=1;
let $section1 = document.getElementById('acceuil');
let $section2 = document.getElementById('jeux');
let $resultat= document.querySelector('#resultat');

//  get the DOM elements to play and stop sound

let $sound= document.getElementById("sound");

//  creation d'un chronometre

const chronometer = new Chronometer();

// get the DOM elements that will serve us to display the time:

let $secDec = document.getElementById('secDec');
let $secUni = document.getElementById('secUni');
let $milDec = document.getElementById('milDec');
let $milUni = document.getElementById('milUni');

//  afficher le chrono
function printTime() {
  printMilliseconds();
  printSeconds()
}

//  afficher les secondes
function printSeconds() {
  let second = chronometer.twoDigitsNumber(chronometer.getSeconds());
  $secDec.innerHTML = second[0];
  $secUni.innerHTML = second[1]

}

// afficher les milliscondes
function printMilliseconds() {
  let milSec = chronometer.twoDigitsNumber(chronometer.getMilliSecend());
  $milDec.innerHTML = milSec[0];
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
let j=0;
let int;

//   affichages des mes élements dans ma div et 
//    les faire disparaitre en cliquant dessus:
function draw(){
  const caseTab=rand(tab.length, 0);
  const friandise=tab[caseTab];
  const $div = document.createElement('div')
  $div.className = `bonbon ${friandise[0]}`
  console.log(friandise[0]);
  $div.style.left = `${rand(250, window.innerWidth - 260)}px`
    // inject it into body
  $bar.appendChild($div);
    
    // bind click event
  $div.onclick = function () {
    if(j< 60){
      if( friandise[0]=== "bomb1" || friandise[0]=== "bomb2"){
        biip.play()
      }else {
        biip1.play()
      }
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
  chronometer.stopClick();
  j=0;
  tabScore.push(score);
  afficheResult(score)
}

//   gerer l'affichage des éléments à fure et à mesures
//   que le temps avance et ça arrête quand ça arrive 
//     à 60 secondes:
function anim(){
  int= setInterval(function () {
    if (j === 59 ){
      erase();
      mainSong.pause();
      $startGame.innerText = "Start Game";
      $startGame.className= 'start';
    }
    else {
      j++;
      for (let i=0; i< j/5 ; i++){
          draw()
      }
    }
  }, 1000)
}

//  gerer le clic sur le bouton et le bascule 
//  d'un div à un autre grace au style.display:
$startGame.addEventListener("click", () => {
  if(getComputedStyle($section1).display != "none"){
    $section1.style.display="none";
    $section2.style.display="block";
    $startGame.innerText="Start Game";
  }else if(getComputedStyle($section2).display === "block" && $startGame.innerText==="Start Game"){        
    $resultat.style.display= "none"; 
    mainSong.load();
    mainSong.play();
    $startGame.innerText= "Stop Game";
    $startGame.className= 'stop';
    score=0;
    updateScore(score);
    chronometer.startClick(printTime);
    anim()
  }else {
    mainSong.pause();
    erase();
    $startGame.innerText = "Start Game";
    $startGame.className= 'start';
    } 
} )

// sound On sound Off

$sound.addEventListener("click", () => {
  if (mainSong.play){
    mainSong.pause();
    console.log(`de On à OFF ${$sound.classList}`);
    $sound.className.remove("soundOn");
    $sound.className.add("soundOff");
    console.log(`de On à OFF ${$sound.classList}`); 
  }
  else {
    mainSong.play();
    console.log(`de Off à On ${$sound.classList}`);
    $sound.className.remove("soundOff");
    $sound.className.add("soundOn");
    console.log(`de Off à On ${$sound.classList}`); 
}})