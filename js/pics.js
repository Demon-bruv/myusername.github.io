const pic = document.getElementById('bouncing-pic');
const overlay = document.getElementById('punchline-screen');

// Starting coordinates (randomized so it doesn't always start in the same spot)
let x = Math.random() * (window.innerWidth - 300);
let y = Math.random() * (window.innerHeight - 350);

// The speed of the bounce (increase these numbers to make it harder to catch!)
let dx = 4; 
let dy = 4; 

let isBouncing = true;

function animate() {
    if (!isBouncing) return; // Immediately stop running math if clicked

    const rect = pic.getBoundingClientRect();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    // Hit the right or left wall
    if (x + rect.width >= winWidth || x <= 0) {
        dx = -dx; // Reverse X direction
        // Safety check to stop it from getting stuck in the wall if window resizes
        x = x <= 0 ? 0 : winWidth - rect.width; 
    }
    
    // Hit the floor or ceiling
    if (y + rect.height >= winHeight || y <= 0) {
        dy = -dy; // Reverse Y direction
        // Safety check to stop it from getting stuck
        y = y <= 0 ? 0 : winHeight - rect.height; 
    }

    // Apply the speed to the coordinates
    x += dx;
    y += dy;

    // Move the image
    pic.style.left = `${x}px`;
    pic.style.top = `${y}px`;

    // Loop the animation
    requestAnimationFrame(animate);
}

// THE TRAP: When they finally click it
pic.addEventListener('click', () => {
    isBouncing = false; // Freeze the image in place
    overlay.classList.add('active'); // Fade in the "ONE PHOTO IS ENOUGH" screen
});

// Start the animation as soon as the image loads
pic.onload = () => {
    requestAnimationFrame(animate);
};

// Fallback in case the image loads instantly from cache
if(pic.complete) {
    requestAnimationFrame(animate);
}