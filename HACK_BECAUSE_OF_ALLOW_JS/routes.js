import express from 'express';
import { ic } from 'azle';
import { uuid } from 'uuidv4';
import { TasksStorage } from './model';
const route = express.Router();
route.get('/', (req, res) => {
    try {
        res.json(TasksStorage.values());
    }
    catch (error) {
        console.log('Failed to get all tasks. See error: ${error}');
    }
});
route.get('/tasks/:id', (req, res) => {
    try {
        const TaskId = req.params.id;
        const retrieved = TasksStorage.get(TaskId);
        res.json(retrieved).status(200);
    }
    catch (error) {
        console.log('Failed to get task!! See error:' + error);
    }
});
route.post('/tasks/new', (req, res) => {
    try {
        const newTask = { id: uuid(), createdAt: getCurrentDate(), ...req.body };
        TasksStorage.insert(newTask.id, newTask);
        res.json(newTask).status(201);
    }
    catch (error) {
        console.log('Failed to create new task! See error: ' + error);
    }
});
route.put('/tasks/:id', (req, res) => {
    try {
        const TaskId = req.params.id;
        const RetrievedTaskId = TasksStorage.get(TaskId);
        if ("None" in RetrievedTaskId) {
            res.status(400).send('There is no task with the provided id ${TaskId}!!! The task does not exist');
        }
        else {
            const task = RetrievedTaskId.Some;
            const updatedTask = { ...task, ...req.body, updatedAt: getCurrentDate() };
            TasksStorage.insert(task?.id, updatedTask);
            res.json(updatedTask);
        }
    }
    catch (error) {
        console.log('Failed to update task! See error: ' + error);
    }
});
route.delete('/tasks/:id', (req, res) => {
    try {
        const TaskId = req.params.id;
        const RetrievedTaskId = TasksStorage.get(TaskId);
        if ("None" in RetrievedTaskId) {
            res.status(400).send('There is no task with the provided id ${TaskId}!!! The task does not exist');
        }
        else {
            TasksStorage.remove(TaskId);
        }
    }
    catch (error) {
        console.log('Failed to delete task! Please try again!!');
        console.log(error);
    }
});
export default route;
function getCurrentDate() {
    const timestamp = new Number(ic.time());
    return new Date(timestamp.valueOf() / 1000000);
}
