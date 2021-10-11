const cards = document.querySelectorAll('.card'),
      counter = document.querySelector('.moves'),
      stars = document.querySelector('.stars')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves= 0 ,countCorrectCards=0

function flipCard() {
    if(lockBoard)return
    if(this === firstCard)return;
    this.classList.toggle('flip');
 
    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        moveCounter()
        return;
    }
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch()
        moveCounter()
    
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

// function conuntMatch(){
//     if(checkForMatch())
//     countCorrectCards ++;
// }
//console.log(conuntMatch())
function disableCards(){
    firstCard.removeEventListener('click', firstCard)
    secondCard.removeEventListener('click', firstCard)
    resetBoard()
}

function unflipCards(){
    lockBoard =true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500)
}
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //console.log(moves)
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// function congratulations(){
//     if()
// }
(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos
    })
})();
cards.forEach(element => {
    element.addEventListener('click', flipCard)
})