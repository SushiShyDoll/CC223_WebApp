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
    const task = req.body.task;
    tasks.push(task);
    res.json({ message: 'Task added!' });
});

app.delete('/api/tasks/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
