// login.js

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission for custom processing

    // Get values from the input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Store user details in sessionStorage (simulating a simple login session)
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);  // Optional: Storing password

    // Redirect the user to the apply_leave page
    window.location.href = 'apply_leave.html';  // Redirect to the Apply Leave page
});
