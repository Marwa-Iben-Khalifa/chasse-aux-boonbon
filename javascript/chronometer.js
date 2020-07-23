
class Chronometer {
  constructor() {
    this.currentTime = 0;
    this.intervalId = 0;
  }
  startClick(callback) {
    this.intervalId = setInterval(() => {
      this.currentTime++;
      callback();
    }, 10)
    //Hint 2: In case you get an error while invoking the callback, try to wrap it in the if statement.
  }
  getMilliSecend(){
    return this.currentTime%100
  }
  getSeconds() {
    // ... your code goes here
    return Math.floor(this.currentTime / 100)
  }
  twoDigitsNumber(time) {
    if(time >=10){
      return `${time}`
    }else {
      return `0${time}`
    }

  }

  stopClick() {

    clearInterval(this.intervalId);
  }
  resetClick() {
    this.currentTime = 0
    secDec.innerHTML=0
    secUni.innerHTML=0
    milDec.innerHTML=0
    milUni.innerHTML=0
  }
}

// get the DOM elements that will serve us to display the time:



// function printTime() {
//   printMilliseconds();
//   printSeconds()
// }


// function printSeconds() {
//   let second = chronometer.twoDigitsNumber(chronometer.getSeconds());
//   secDec.innerHTML = second[0]
//   secUni.innerHTML = second[1]
//   // return `${this.secDec}${this.secUni}`

// }

// // ==> BONUS
// function printMilliseconds() {
//   // ... your code goes here
//   let milSec = chronometer.twoDigitsNumber(chronometer.getMilliSecend());
//   milDec.innerHTML = milSec[0]
//   milUni.innerHTML = milSec[1]
// }

// function setStopBtn() {
//   // ... your code goes here
//   btnLeft.innerHTML = 'STOP';
//   btnLeft.className = 'btn stop';
// }

// function setStartBtn() {
//   // ... your code goes here
//   btnLeft.innerText = "START";
//   btnLeft.className = 'btn start';
// }

// function setResetBtn() {
//   // ... your code goes here
//   btnRight.innerText = "RESET";
//   btnRight.className = 'btn reset';
// }

// // Start/Stop Button
// btnLeft.addEventListener('click', () => {
//   if (btnLeft.className === 'btn start') {
//     chronometer.startClick(printTime);
//     setStopBtn()
//   } else {
//     chronometer.stopClick();
//     setStartBtn()
//   }

// });


// // Reset/Split Button
// btnRight.addEventListener('click', () => {
//   chronometer.resetClick();
//   secDec.innerHTML=0
//   secUni.innerHTML=0
//   milDec.innerHTML=0
//   milUni.innerHTML=0
// });