const cards = document.querySelectorAll('.card')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard)return
    if(this === firstCard)return;
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        // console.log(hasFlippedCard,firstCard);
        return;
    }
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch()
    
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

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

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos
    })
})();
cards.forEach(element => {
    element.addEventListener('click', flipCard)
})