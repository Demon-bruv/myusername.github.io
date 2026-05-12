const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const colors = {
    bg: '#000000',
    yellow: '#FFFF00', 
    blue: '#2121DE',  
    red: '#FF0000',   
    cyan: '#00FFFF'
};

const pixelSize = 25;
let frame = 0;

let craneArmX = 100;
let craneDirection = 1;
let workerX = 300;
let workerDirection = 1;

function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    // Draw a subtle border to make it look like separate blocks
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function drawScene() {
    // Clear screen
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gridW = Math.floor(canvas.width / pixelSize);
    const gridH = Math.floor(canvas.height / pixelSize);

    for (let x = 0; x < gridW; x++) {
        drawPixel(x, gridH - 1, colors.blue);
        drawPixel(x, gridH - 2, colors.blue);
    }
  
    for(let y = gridH - 5; y < gridH - 2; y++){
        drawPixel(gridW - 4, y, colors.blue);
        drawPixel(gridW - 5, y, colors.blue);
    }

    const craneBaseX = 4;
    for (let y = 5; y < gridH - 2; y++) {
        drawPixel(craneBaseX, y, colors.yellow);
        drawPixel(craneBaseX + 1, y, colors.yellow);
    }
    drawPixel(craneBaseX - 1, 10, colors.cyan);
    drawPixel(craneBaseX - 1, 11, colors.yellow);

    craneArmX += 0.05 * craneDirection;
    if (craneArmX > 15 || craneArmX < 5) craneDirection *= -1;
    
    for (let x = craneBaseX - 2; x < craneBaseX + Math.floor(craneArmX); x++) {
        drawPixel(x, 5, colors.yellow);
    }

    const cableX = craneBaseX + Math.floor(craneArmX) - 1;
    const cableLength = 8 + Math.sin(frame * 0.02) * 4; 
    
    for (let y = 6; y < 6 + cableLength; y++) {
        drawPixel(cableX, y, '#555555'); 
    }
    drawPixel(cableX, Math.floor(6 + cableLength), colors.blue);

    workerX += 0.08 * workerDirection;
    if (workerX > gridW - 8 || workerX < 10) workerDirection *= -1;
    
    const wX = Math.floor(workerX);
    const wY = gridH - 4;
    
    drawPixel(wX, wY, colors.red);
    drawPixel(wX, wY + 1, colors.red);
    drawPixel(wX, wY - 1, colors.yellow);

    frame++;
    requestAnimationFrame(drawScene);
}
drawScene();
