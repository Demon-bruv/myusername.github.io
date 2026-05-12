const cards = Array.from(document.querySelectorAll('.card'));
let topIndex = 0; 
function updateDeck() {
    cards.forEach((card, i) => {
        let offset = i - topIndex;
        if (offset < 0) {
            offset += cards.length; 
        }

        card.style.zIndex = cards.length - offset;
        card.style.transform = `scale(${1 - offset * 0.05}) translateY(${offset * 20}px)`;
        card.style.opacity = offset > 2 ? 0 : 1 - (offset * 0.1);
        card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
    });
}
function nextCard() {
    const currentCard = cards[topIndex];
    currentCard.style.transform = `translateX(150%) rotate(20deg)`;
    currentCard.style.opacity = 0;

    setTimeout(() => {
        topIndex = (topIndex + 1) % cards.length; 
        updateDeck(); 
    }, 300);
}
function prevCard() {
    topIndex = (topIndex - 1 + cards.length) % cards.length; 
    const newTopCard = cards[topIndex];

    newTopCard.style.transition = 'none';
    newTopCard.style.transform = `translateX(-150%) rotate(-20deg)`;
    newTopCard.style.opacity = 0;
    newTopCard.style.zIndex = cards.length + 1; 

    void newTopCard.offsetWidth;

    newTopCard.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
    updateDeck();
}

document.getElementById('btn-right').addEventListener('click', nextCard);
document.getElementById('btn-left').addEventListener('click', prevCard);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > 50) {
        nextCard(); 
    } else if (swipeDistance < -50) {
        prevCard(); 
    }
}
updateDeck();
