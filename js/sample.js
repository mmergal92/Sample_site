// const startAnimation = (event) => { 
//     event.preventDefault():
//     let frames = $(".dope");
//     let frameCount = frames.length;
//     let i = 0;
//     const setInterval = (){
//         if (frames = [i % frameCount]) {
//             style.display = "none";
//         } 
//         else (frames = frames[++i % frameCount]) {
//             style.display = "block"
//         }
//   }, 300);
// };
// function startAnimation() { 
//     var frames = document.getElementsByClassName("dope").children;
//     var frameCount = frames.length;
//     var i = 0;
//     setInterval(function() {
//         frames[i % frameCount].style.display = "none";
//         frames[++i % frameCount].style.display = "block";
//         document.getElementsByClassName("dope").style.left = i + "px";
// }, 300);
// }
// const check = (event) => {
//     event.preventDefault();

//     const text = document.getElementsByClassName(".animation")
//     const strText = text.textContent;

//     console.log(strText)
// }

const Animate = function (txtElement, words, wait = 1000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}
//Type Method
Animate.prototype.type = function () {
    // console.log("Hello")
    //Current index of word
    const current = this.wordIndex % this.words.length;
    //Cet full text of word
    const fullTxt = this.words[current]
    // console.log(fullTxt)
    //Check if Deleting
    if(this.isDeleting){
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    }else {
        //Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
    //Initial Type Speed
    let typeSpeed = 300; 
    if (this.isDeleting) {
        typeSpeed /= 2;
    }
    //If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        //pause word at completion
        typeSpeed = this.wait;
        //set delete to true
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
}
// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);
//Init App
function init () {
    const txtElement = document.querySelector('.shit')
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new Animate(txtElement, words, wait);
}