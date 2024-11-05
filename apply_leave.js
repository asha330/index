// apply_leave.js

// Check if sessionStorage has user data
if (!sessionStorage.getItem('username')) {
    window.location.href = 'login.html';  // Redirect to login if no session
}

// Get the stored user data from sessionStorage
const username = sessionStorage.getItem('username');
document.getElementById('personal-details-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const employeeId = document.getElementById('employee-id').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const branch = document.getElementById('branch').value;

    // Validate employee ID
    if (employeeId >= 5000) {
        alert('Employee ID must be less than 5000.');
        return;
    }

    // Save user data and move to the next page (leave application)
    sessionStorage.setItem('employeeId', employeeId);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('phone', phone);
    sessionStorage.setItem('dob', dob);
    sessionStorage.setItem('branch', branch);

    window.location.href = 'leave_application.html';  // Redirect to the next page
});
