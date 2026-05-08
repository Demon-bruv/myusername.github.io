// Target the project card
const card = document.getElementById('main-project');

// Listen for mouse movement over the card
card.addEventListener('mousemove', (e) => {
    // Get the dimensions and position of the card
    const rect = card.getBoundingClientRect();
    
    // Calculate the X and Y coordinates of the mouse relative to the card itself
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update the CSS variables dynamically
    // This tells the radial-gradient in the CSS exactly where to center its glow
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
});