// --- Setup Canvas and Context ---
const canvas = document.getElementById('loveCanvas');
const ctx = canvas.getContext('2d');

// --- Configuration Variables ---
let yesSizeFactor = 1.0; 
let yesButton = {};
let noButton = {};

// --- Drawing Functions ---

// Helper function to draw a rounded rectangle (for the buttons)
function roundRect(x, y, w, h, radius, fill, stroke) {
    if (typeof stroke === 'undefined') { stroke = true; }
    if (typeof radius === 'undefined') { radius = 5; }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        const defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (let side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + w - radius.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius.tr);
    ctx.lineTo(x + w, y + h - radius.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius.br, y + h);
    ctx.lineTo(x + radius.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) { ctx.fill(); }
    if (stroke) { ctx.stroke(); }
}

// Main function to draw the entire scene
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw the Question Text
    ctx.fillStyle = '#e91e63'; 
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("My Dearest, Do You Love Me?", canvas.width / 2, 50);

    // --- YES Button (Grows in size) ---
    const baseWidth = 100;
    const baseHeight = 40;
    const currentYesWidth = baseWidth * yesSizeFactor;
    const currentYesHeight = baseHeight * yesSizeFactor;

    yesButton.x = canvas.width / 2 - 20 - currentYesWidth;
    yesButton.y = 150 - (currentYesHeight - baseHeight) / 2;
    yesButton.width = currentYesWidth;
    yesButton.height = currentYesHeight;

    ctx.fillStyle = '#4CAF50'; 
    roundRect(yesButton.x, yesButton.y, yesButton.width, yesButton.height, 10, true, false);

    ctx.fillStyle = 'white';
    ctx.font = `${20 * yesSizeFactor}px Arial`; 
    ctx.fillText("Yes", yesButton.x + yesButton.width / 2, yesButton.y + yesButton.height / 2 + (5 * yesSizeFactor));


    // --- NO Button (Stays the same size) ---
    noButton.x = canvas.width / 2 + 20;
    noButton.y = 150;
    noButton.width = baseWidth;
    noButton.height = baseHeight;

    ctx.fillStyle = '#f44336'; 
    roundRect(noButton.x, noButton.y, noButton.width, noButton.height, 10, true, false);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText("No", noButton.x + noButton.width / 2, noButton.y + noButton.height / 2 + 5);
}

drawScene();


// --- Interaction Logic ---
function isClicked(x, y, button) {
    return x >= button.x && x <= button.x + button.width &&
           y >= button.y && y <= button.y + button.height;
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // 1. Check if the NO button was clicked
    if (isClicked(mouseX, mouseY, noButton)) {
        yesSizeFactor += 0.5; 
        drawScene();
    // 2. Check if the YES button was clicked
    } else if (isClicked(mouseX, mouseY, yesButton)) {
        // End of the prank
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#4CAF50'; 
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("I KNEW IT! LOVE YOU TOO! 🥰", canvas.width / 2, canvas.height / 2);
    }
});
