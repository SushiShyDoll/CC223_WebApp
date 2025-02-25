document.getElementById('addButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const task = taskInput.value.trim();
    const deadline = deadlineInput.value;

    console.log('Task:', task); // Debugging line
    console.log('Deadline:', deadline); // Debugging line

    if (task && deadline) { // Ensure both task and deadline have values
        fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, deadline })
        })
        .then(response => response.json())
        .then(() => {
            taskInput.value = '';
            deadlineInput.value = '';
            loadTasks();
        })
        .catch(error => console.error('Error adding task:', error));
    } else {
        console.error('Task or deadline is missing');
    }
}

function loadTasks() {
    fetch('http://localhost:3000/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                const taskText = `${task.task} (Deadline: ${task.deadline})`;
                li.textContent = taskText;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('deleteButton');
                deleteButton.addEventListener('click', () => deleteTask(index));

                const completedButton = document.createElement('button');
                completedButton.textContent = task.completed ? 'Mark as Incomplete' : 'Mark as Completed';
                completedButton.classList.add('completedButton');
                completedButton.addEventListener('click', () => toggleCompleted(index, !task.completed));

                li.appendChild(deleteButton);
                li.appendChild(completedButton);
                taskList.appendChild(li);

                if (task.completed) {
                    li.classList.add('completed');
                } else {
                    const deadlineDate = new Date(task.deadline);
                    const currentDate = new Date();
                    if (deadlineDate < currentDate) {
                        li.classList.add('past-due');
                    }
                }
            });
        })
        .catch(error => console.error('Error loading tasks:', error));
}

function deleteTask(index) {
    fetch(`http://localhost:3000/api/tasks/${index}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        loadTasks();
    })
    .catch(error => console.error('Error deleting task:', error));
}

function toggleCompleted(index, completed) {
    fetch(`http://localhost:3000/api/tasks/${index}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed }) // Ensure completed is sent in the request body
    })
    .then(response => response.json())
    .then(() => {
        loadTasks();
    })
    .catch(error => console.error('Error updating task:', error));
}

document.addEventListener('DOMContentLoaded', loadTasks);
