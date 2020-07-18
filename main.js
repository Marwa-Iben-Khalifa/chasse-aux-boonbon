let tab=[["bonbon1", 150], ["bonbon2", 100], ["bonbon3", 150], ["bonbon4", 100], ["bonbon5", 150], ["bonbon6", 200], ["bonbon7", 150], ["bonbon8", 100], ["bonbon9", 150], ["lait",20], ["viande", 15], ["bomb2", -250], ["bomb1", -250], ["gift", 1000]];
let score=0;
let tabScore=[];
const $startGame= document.querySelector('button');
function rand(from, to) {
  // TODO: Iteration 1
  const length = to - from;
  return Math.trunc(Math.random()*length + from);
}
const $score = document.querySelector('#score span');
function updateScore(num){
  $score.innerText= num
}
const $bar= document.querySelector('#game');
let i = 1;
function draw(){
  const caseTab=rand(tab.length, 0);
  const friandise=tab[caseTab];
  const $div = document.createElement('div')
  $div.className = `bonbon ${friandise[0]}`
  console.log(friandise[0]);
  $div.style.left = `${rand(290, window.innerWidth - 400)}px`
    // inject it into body
  $bar.appendChild($div);
    
    // bind click event
  $div.onclick = function () {
    $bar.removeChild($div);
    let nbr= friandise[1];
    console.log(nbr);
    score += nbr;
    if (score<0){
      score= 0;}
    updateScore(score)
  }
}
function erase(){
    clearInterval(int);
    console.log(`score finale= ${score}`);
    tabScore.push(score);
    console.log(tabScore)
}
let j;
let int;
function anim(interval, j){
    int= setInterval(function () {
        i++;
        if (i > 60){
            erase()
        }
        else {
            for (j=0; j< i/10 ; j++){
                draw()
            }
        }
    }, interval)
}
// const status= document.querySelector('#start-game').innerHTML;

$startGame.onclick= function(){ 
    // console.log($status);
    score=0;
    j=0;
    i=1;
    anim(1000-(j*10))
}