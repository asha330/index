// users.js

// Array to store user data
const users = [];

// Function to register a new user
function registerUser(username) {
    // Check if the username already exists
    if (users.find(user => user.username === username)) {
        alert("Username already exists. Please choose a different username.");
        return false; // Registration failed
    }

    // Add new user to the users array
    users.push({ username: username });
    return true; // Registration succeeded
}

// Function to check if a username is valid
function isValidUsername(username) {
    // Username should be alphanumeric and between 3 to 15 characters
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    return usernameRegex.test(username);
}

// Function to login a user
function loginUser(username) {
    if (isValidUsername(username) && users.some(user => user.username === username)) {
        return true; // Login succeeded
    }
    alert("Invalid username. Please try again.");
    return false; // Login failed
}

// Function to check if a user is logged in
function isUserLoggedIn(username) {
    return users.some(user => user.username === username);
}

// Function to remove a user (optional, for cleanup)
function removeUser(username) {
    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users.splice(index, 1);
        return true; // User removed successfully
    }
    return false; // User not found
}

// Function to get all registered users
function getAllUsers() {
    return users.map(user => user.username);
}

// Export functions for external use
export { registerUser, loginUser, isUserLoggedIn, removeUser, getAllUsers };
