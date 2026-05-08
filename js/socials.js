const cards = Array.from(document.querySelectorAll('.card'));
let topIndex = 0; // Tracks which card is currently in front

// 1. Core Logic: Stacks the cards visually behind each other
function updateDeck() {
    cards.forEach((card, i) => {
        // Calculate where this card is relative to the top card
        let offset = i - topIndex;
        if (offset < 0) {
            offset += cards.length; // Wraps around the array for the closed loop
        }

        // Apply physical depth
        card.style.zIndex = cards.length - offset;
        card.style.transform = `scale(${1 - offset * 0.05}) translateY(${offset * 20}px)`;
        
        // Fade out cards that are too far back
        card.style.opacity = offset > 2 ? 0 : 1 - (offset * 0.1);
        
        // Only allow clicking on the front card
        card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
    });
}

// 2. Action: Next (Right)
function nextCard() {
    const currentCard = cards[topIndex];
    // Animate the front card flying off to the right
    currentCard.style.transform = `translateX(150%) rotate(20deg)`;
    currentCard.style.opacity = 0;

    setTimeout(() => {
        topIndex = (topIndex + 1) % cards.length; // Shift index forward
        updateDeck(); // Re-stack the deck
    }, 300);
}

// 3. Action: Previous (Left)
function prevCard() {
    // Find the very bottom card in the stack
    topIndex = (topIndex - 1 + cards.length) % cards.length; 
    const newTopCard = cards[topIndex];

    // Teleport it off-screen to the left instantly
    newTopCard.style.transition = 'none';
    newTopCard.style.transform = `translateX(-150%) rotate(-20deg)`;
    newTopCard.style.opacity = 0;
    newTopCard.style.zIndex = cards.length + 1; // Force it to the top layer

    // Force the browser to register the teleport before we animate it back in
    void newTopCard.offsetWidth;

    // Animate it flying in from the left to become the new front card
    newTopCard.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
    updateDeck();
}


// --- EVENT LISTENERS ---

// A. Button Clicks
document.getElementById('btn-right').addEventListener('click', nextCard);
document.getElementById('btn-left').addEventListener('click', prevCard);

// B. Keyboard Arrows
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
});

// C. Touch / Swipe Logic (For Mobile/Trackpads)
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
        nextCard(); // Swiped Right
    } else if (swipeDistance < -50) {
        prevCard(); // Swiped Left
    }
}

// Initialize the deck immediately when the page loads
updateDeck();