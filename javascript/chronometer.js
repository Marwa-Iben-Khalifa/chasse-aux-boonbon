
class Chronometer {
  constructor() {
    this.currentTime = 6000;
    this.intervalId = 0;
  }
  startClick(callback) {
    this.intervalId = setInterval(() => {
      this.currentTime-=10;
      callback();
    }, 100)
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
    this.currentTime = 6000;
    secDec.innerHTML=6;
    secUni.innerHTML=0;
    milDec.innerHTML=0;
    milUni.innerHTML=0
  }
  reset(){
    this.currentTime=6000
  }
}