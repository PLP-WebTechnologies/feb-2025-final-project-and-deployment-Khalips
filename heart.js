document.getElementById('beat-btn').addEventListener('click', function() {
    const heart = document.getElementById('heart-animation');
    heart.classList.add('beat');
    
    // Remove the class after animation completes to allow restarting
    setTimeout(() => {
        heart.classList.remove('beat');
    }, 1000);
    
    // Play heartbeat sound if available
    // new Audio('sounds/heartbeat.mp3').play();
});