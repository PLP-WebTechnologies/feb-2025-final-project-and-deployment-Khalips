// Shared functions can go here
console.log("BioMedBuddy is ready to explore!");

// Add this to main.js
document.addEventListener('DOMContentLoaded', function() {
    // Protect all navigation links
    document.querySelectorAll('.nav-btn, footer a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!firebase.auth().currentUser) {
                e.preventDefault();
                window.location.href = `auth.html?redirect=${encodeURIComponent(this.getAttribute('href'))}`;
            }
        });
    });
});