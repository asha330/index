// Sample task data
let tasks = [
    {name: 'Update Website', description: 'Revise homepage design', assignedTo: 'Alice', dueDate: '2024-11-15', status: 'Pending'},
    {name: 'Develop API', description: 'Create authentication API', assignedTo: 'Bob', dueDate: '2024-11-20', status: 'In Progress'},
    {name: 'Write Documentation', description: 'Complete user manual', assignedTo: 'Carol', dueDate: '2024-11-10', status: 'Completed'}
];

// Function to display tasks
function displayTasks() {
    const tableBody = document.querySelector('#taskTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.assignedTo}</td>
            <td>${task.dueDate}</td>
            <td class="status" onclick="changeStatus(${index})">${task.status}</td>
            <td>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to add a task
function addTask() {
    const newTask = {
        name: prompt('Enter task name:'),
        description: prompt('Enter task description:'),
        assignedTo: prompt('Enter assignee:'),
        dueDate: prompt('Enter due date:'),
        status: 'Pending'
    };
    tasks.push(newTask);
    displayTasks();
}

// Function to change task status
function changeStatus(index) {
    const task = tasks[index];
    const statusOptions = ['Pending', 'In Progress', 'Completed'];
    const newStatus = prompt('Change Status:', task.status);
    if (statusOptions.includes(newStatus)) {
        task.status = newStatus;
        displayTasks();
    }
}

// Function to edit task
function editTask(index) {
    const task = tasks[index];
    const newDescription = prompt('Edit Description:', task.description);
    if (newDescription) {
        task.description = newDescription;
        displayTasks();
    }
}

// Function to delete task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        displayTasks();
    }
}

// Initialize the dashboard
displayTasks();
