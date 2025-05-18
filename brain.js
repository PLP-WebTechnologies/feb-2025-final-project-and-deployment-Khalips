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

function hidePartInfo() {
    // Optional: Keep the last info shown or clear it
    // document.getElementById('part-info').innerHTML = '';
}