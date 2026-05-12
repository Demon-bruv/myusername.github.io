// THE CLICK TOGGLE LOGIC
const nameButton = document.getElementById('myNameToggle');

nameButton.addEventListener('click', () => {
    // Toggles the dark mode on and off
    document.body.classList.toggle('focus-mode');

    window.scrollTo({ top: 0, behavior: 'smooth' });
});


//THE SCROLL LOGIC
const wheel = document.getElementById('spinWheel');

window.addEventListener('scroll', () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = window.scrollY / scrollableHeight;
    const rotationDegrees = scrolledPercentage * 360;
    
    // Spins the wheel as you scroll down
    wheel.style.transform = `rotate(${rotationDegrees}deg)`;
});
