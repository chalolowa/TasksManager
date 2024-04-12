import { ic, StableBTreeMap } from 'azle';
import express from 'express';
import http from 'http';
import { uuid } from 'uuidv4';
import cors from 'cors';

interface Task {
    id: string,
    title: string,
    description: string,
    status: 'pending' | 'in-progress' | 'complete',
    createdAt: Date,
    updatedAt: Date | null
}

const TasksStorage = StableBTreeMap<string, Task>(0);

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(TasksStorage.values());
});

app.get('/tasks/:id', (req, res) => {
    const TaskId = req.params.id;
    const retrieved = TasksStorage.get(TaskId);
    res.json(retrieved).status(200);
});

app.post('/tasks/new', (req, res) => {
    const newTask: Task = {id: uuid(), createdAt: getCurrentDate(), ...req.body};
    TasksStorage.insert(newTask.id, newTask);
    res.json(newTask).status(201);
});

app.put('/tasks/:id', (req, res) => {
    const TaskId = req.params.id;
    const RetrievedTaskId = TasksStorage.get(TaskId);
    if ("None" in RetrievedTaskId) {
        res.status(400).send('There is no task with the provided id ${TaskId}!!! The task does not exist')
    } else {
        const task = RetrievedTaskId.Some;
        const updatedTask = {...task, ...req.body, updatedAt: getCurrentDate()};
        TasksStorage.insert(task?.id, updatedTask);
        res.json(updatedTask);
    }
});

app.delete('/tasks/:id', (req, res) => {
    const TaskId = req.params.id;
    const RetrievedTaskId = TasksStorage.get(TaskId);
    if ("None" in RetrievedTaskId) {
        res.status(400).send('There is no task with the provided id ${TaskId}!!! The task does not exist')
    } else {
        TasksStorage.remove(TaskId);
    }
});

const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Server running successfully');
})

function getCurrentDate() {
    const timestamp = new Number(ic.time());
    return new Date(timestamp.valueOf() / 1000_000);
 }
