// leave_application.js

// Define the available leave days
const casualLeaveDays = 10;  // Casual Leave
const medicalLeaveDays = 5;  // Medical Leave

// Store the available leave days in sessionStorage (could be dynamically calculated or fetched from a backend)
sessionStorage.setItem('casualLeaveDays', casualLeaveDays);
sessionStorage.setItem('medicalLeaveDays', medicalLeaveDays);

// Select the relevant DOM elements
const leaveTypeSelect = document.getElementById('leave-type');
const leaveBalanceDiv = document.getElementById('leave-balance');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const submitBtn = document.getElementById('submit-btn');

// Event listener to show leave balance based on leave type selection
leaveTypeSelect.addEventListener('change', function() {
    const leaveType = leaveTypeSelect.value;
    
    let availableLeaveDays = 0;
    
    if (leaveType === 'casual') {
        availableLeaveDays = sessionStorage.getItem('casualLeaveDays');
    } else if (leaveType === 'medical') {
        availableLeaveDays = sessionStorage.getItem('medicalLeaveDays');
    }

    // Display available leave days
    if (availableLeaveDays > 0) {
        leaveBalanceDiv.innerHTML = `<p>Available ${leaveType.charAt(0).toUpperCase() + leaveType.slice(1)} Days: ${availableLeaveDays} days</p>`;
    } else {
        leaveBalanceDiv.innerHTML = '';
    }

    // Enable the submit button only if the user has selected a leave type
    submitBtn.disabled = leaveType === '';
});

// Event listener to calculate leave duration and validate the request
startDateInput.addEventListener('change', validateLeaveRequest);
endDateInput.addEventListener('change', validateLeaveRequest);

function validateLeaveRequest() {
    const leaveType = leaveTypeSelect.value;
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    // Calculate the number of days requested (excluding weekends)
    if (startDate && endDate && startDate <= endDate) {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)) + 1; // +1 because start day counts

        // Check if the leave request exceeds the available leave days
        let availableLeaveDays = 0;
        if (leaveType === 'casual') {
            availableLeaveDays = sessionStorage.getItem('casualLeaveDays');
        } else if (leaveType === 'medical') {
            availableLeaveDays = sessionStorage.getItem('medicalLeaveDays');
        }

        // Enable or disable the submit button based on leave availability
        if (diffDays <= availableLeaveDays) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
            alert(`You can only request up to ${availableLeaveDays} days of ${leaveType} leave.`);
        }
    } else {
        submitBtn.disabled = true;
    }
}

// Form submission handling
document.getElementById('leave-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Assuming all the fields are validated by now
    alert('Leave request submitted successfully!');
    window.location.href = 'thank_you.html';  // Redirect to thank you page after submission
});
