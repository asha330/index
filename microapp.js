import { registerUser, loginUser, isUserLoggedIn, getAllUsers } from './microuser.js';

let posts = [];
let currentUser = null;

document.getElementById('loginButton').addEventListener('click', () => {
    const username = document.getElementById('username').value;

    // Check if the user is logging in or registering
    if (username) {
        if (!isUserLoggedIn(username)) {
            // Register the user
            if (registerUser(username)) {
                currentUser = username;
                proceedAfterLogin();
            }
        } else {
            // Log the user in if already registered
            if (loginUser(username)) {
                currentUser = username;
                proceedAfterLogin();
            }
        }
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    currentUser = null;
    document.getElementById('user-area').style.display = 'block';
    document.querySelector('.post-container').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('posts').innerHTML = '';
});

function proceedAfterLogin() {
    document.getElementById('user-area').style.display = 'none';
    document.querySelector('.post-container').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'inline';
    document.getElementById('username').value = '';
    renderPosts();
}

// Rest of the code for posts and comments remains the same...

