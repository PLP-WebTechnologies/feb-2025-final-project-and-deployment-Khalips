// auth.js - Authentication Logic
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    document.getElementById('login-tab').addEventListener('click', () => switchTab('login'));
    document.getElementById('signup-tab').addEventListener('click', () => switchTab('signup'));
    document.getElementById('forgot-password').addEventListener('click', () => switchTab('reset'));
    document.getElementById('back-to-login').addEventListener('click', () => switchTab('login'));

    // Form submissions
    document.getElementById('login-btn').addEventListener('click', loginUser);
    document.getElementById('signup-btn').addEventListener('click', registerUser);
    document.getElementById('reset-btn').addEventListener('click', resetPassword);
});

function switchTab(tab) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.add('hidden');
    });
    
    // Show selected form
    document.getElementById(`${tab}-form`).classList.remove('hidden');
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (tab !== 'reset') {
        document.getElementById(`${tab}-tab`).classList.add('active');
    }
}

async function loginUser() {
    const spinner = document.getElementById('loading-spinner');
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        spinner.classList.remove('hidden');
        await auth.signInWithEmailAndPassword(email, password);
        
        showStatus("Login successful! Redirecting...", "success");
        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect') || 'index.html';
            window.location.href = redirect;
        }, 1500);
        
    } catch (error) {
        let friendlyMessage;
        
        switch(error.code) {
            case 'auth/wrong-password':
                friendlyMessage = "Oops! Wrong password. Try again or reset it.";
                break;
            case 'auth/user-not-found':
                friendlyMessage = "No account found with this email. Sign up instead!";
                break;
            case 'auth/invalid-email':
                friendlyMessage = "Please enter a valid email address";
                break;
            case 'auth/too-many-requests':
                friendlyMessage = "Too many attempts. Try again later or reset your password.";
                break;
            default:
                friendlyMessage = "Login failed: " + error.message;
        }
        
        showStatus(friendlyMessage, "error");
    } finally {
        spinner.classList.add('hidden');
    }
}

async function registerUser() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
        showStatus("Passwords don't match!", "error");
        return;
    }

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        showStatus("Account created! Please login.", "success");
        switchTab('login');
    } catch (error) {
        let friendlyMessage;
        
        switch(error.code) {
            case 'auth/email-already-in-use':
                friendlyMessage = "Email already registered. Try logging in.";
                break;
            case 'auth/weak-password':
                friendlyMessage = "Password should be at least 6 characters";
                break;
            case 'auth/invalid-email':
                friendlyMessage = "Please enter a valid email address";
                break;
            default:
                friendlyMessage = "Signup failed: " + error.message;
        }
        
        showStatus(friendlyMessage, "error");
    }
}

async function resetPassword() {
    const email = document.getElementById('reset-email').value;
    
    try {
        await auth.sendPasswordResetEmail(email);
        showStatus("Password reset link sent to your email. Check your spam folder if you don't see it.", "success");
    } catch (error) {
        let friendlyMessage;
        
        switch(error.code) {
            case 'auth/user-not-found':
                friendlyMessage = "No account found with this email.";
                break;
            case 'auth/invalid-email':
                friendlyMessage = "Please enter a valid email address";
                break;
            default:
                friendlyMessage = "Reset failed: " + error.message;
        }
        
        showStatus(friendlyMessage, "error");
    }
}

function showStatus(message, type) {
    const status = document.getElementById('auth-status');
    status.textContent = message;
    status.className = `auth-status ${type}`;
    status.style.fontSize = "0.50rem"; // Smaller font size for error messages
    setTimeout(() => {
        status.textContent = '';
        status.className = 'auth-status';
    }, 5000);
}