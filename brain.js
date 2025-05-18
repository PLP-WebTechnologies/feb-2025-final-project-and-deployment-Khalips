function showPartInfo(part) {
    const infoDiv = document.getElementById('part-info');
    let infoText = '';
    
    switch(part) {
        case 'cerebrum':
            infoText = '<h4>Cerebrum</h4><p>The cerebrum is the largest part of your brain. It controls thinking, remembering, and feeling!</p>';
            break;
        case 'cerebellum':
            infoText = '<h4>Cerebellum</h4><p>The cerebellum helps with balance and coordination. It makes sure you can ride a bike without falling!</p>';
            break;
        case 'brainstem':
            infoText = '<h4>Brainstem</h4><p>The brainstem connects to your spinal cord. It controls automatic things like breathing and heartbeat!</p>';
            break;
    }
    
    infoDiv.innerHTML = infoText;
}

// Your existing function
function showPartInfo(part) {
    const infoDiv = document.getElementById('part-info');
    let infoText = '';
    
    switch(part) {
        case 'occipital-lobe':
            infoText = '<h4>Occipital Lobe</h4><p>The occipital lobe, is responsible for processing visual information such as color, shape, motion, and object recognition!</p>';
            break;
        case 'cerebellum':
            infoText = '<h4>Cerebellum</h4><p>The cerebellum helps with balance and coordination. It makes sure you can ride a bike without falling!</p>';
            break;
        case 'brainstem':
            infoText = '<h4>Brainstem</h4><p>The brainstem connects to your spinal cord. It controls automatic things like breathing and heartbeat!</p>';
            break;
        case 'frontal-lobe':
            infoText = '<h4>frontal-lobe</h4><p>The frontal lobe, located at the front of the brain, controls thinking, decision-making, emotions, and voluntary movement.</p>';
            break;
    }
    
    infoDiv.innerHTML = infoText;
    infoDiv.style.opacity = '1';
}

function hidePartInfo() {
    const infoDiv = document.getElementById('part-info');
    infoDiv.style.opacity = '0';
}