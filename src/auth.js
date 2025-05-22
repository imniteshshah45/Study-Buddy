// Gmail OAuth Configuration
const CLIENT_ID = '1053758483857-ijsvfi35lklhevfseums1ij0qo6923oa.apps.googleusercontent.com';
const REDIRECT_URI = window.location.origin + '/auth-callback.html';

// Initialize Google OAuth
function initGoogleAuth() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: CLIENT_ID,
            scope: 'email profile',
            ux_mode: 'popup',
            prompt: 'select_account'
        }).then(() => {
            console.log('Google Auth initialized successfully');
        }).catch(error => {
            console.error('Error initializing Google Auth:', error);
            showError('Failed to initialize Google Sign-In. Please try again later.');
        });
    });
}

// Handle Gmail Sign In
async function handleGmailSignIn() {
    try {
        const auth2 = gapi.auth2.getAuthInstance();
        if (!auth2) {
            throw new Error('Google Auth not initialized');
        }

        const googleUser = await auth2.signIn({
            prompt: 'select_account'
        });
        
        const profile = googleUser.getBasicProfile();
        const idToken = googleUser.getAuthResponse().id_token;
        
        // Store user data
        const userData = {
            email: profile.getEmail(),
            name: profile.getName(),
            picture: profile.getImageUrl(),
            idToken: idToken,
            isLoggedIn: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to dashboard
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Gmail sign in error:', error);
        if (error.error === 'popup_closed_by_user') {
            showError('Sign-in popup was closed. Please try again.');
        } else if (error.error === 'access_denied') {
            showError('Access was denied. Please try again.');
        } else {
            showError('Failed to sign in with Gmail. Please try again.');
        }
    }
}

// Handle Gmail Sign Out
function handleGmailSignOut() {
    try {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2) {
            auth2.signOut().then(() => {
                localStorage.removeItem('userData');
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            }).catch(error => {
                console.error('Error signing out:', error);
                showError('Failed to sign out. Please try again.');
            });
        }
    } catch (error) {
        console.error('Error during sign out:', error);
        showError('Failed to sign out. Please try again.');
    }
}

// Show error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}

// Check if user is logged in
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return { isLoggedIn, userData };
} 