const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { task, deadline } = req.body;
    console.log('Received Task:', task); // Debugging line
    console.log('Received Deadline:', deadline); // Debugging line
    if (!task || !deadline) {
        return res.status(400).json({ message: 'Task and deadline are required.' });
    }
    tasks.push({ task, deadline, completed: false });
    res.json({ message: 'Task added!' });
});

app.patch('/api/tasks/:index', (req, res) => {
    const index = req.params.index;
    const { completed } = req.body;
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Invalid task status.' });
    }
    tasks[index].completed = completed;
    res.json({ message: 'Task updated!' });
});

app.delete('/api/tasks/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
