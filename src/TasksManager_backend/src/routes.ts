import express from 'express';
import { ic } from 'azle';
import { v4 as uuid } from 'uuid';
import { Task, TasksStorage } from './model';

const route = express.Router();

route.get('/', async (req, res, next) => {
    try {
        const tasks = await TasksStorage.values();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

route.get('/tasks/:id', async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const task = await TasksStorage.get(taskId);
        if (!task) {
            res.status(404).send(`Task with id ${taskId} not found`);
            return;
        }
        res.json(task).status(200);
    } catch (error) {
        next(error);
    }
});

route.post('/tasks/new', async (req, res, next) => {
    try {
        const newTask: Task = { id: uuid(), createdAt: getCurrentDate(), ...req.body };
        await TasksStorage.insert(newTask.id, newTask);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

route.put('/tasks/:id', async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const task = await TasksStorage.get(taskId);
        if (!task) {
            res.status(404).send(`Task with id ${taskId} not found`);
            return;
        }
        const updatedTask = { ...task, ...req.body, updatedAt: getCurrentDate() };
        await TasksStorage.insert(taskId, updatedTask);
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
});

route.delete('/tasks/:id', async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const deleted = await TasksStorage.remove(taskId);
        if (!deleted) {
            res.status(404).send(`Task with id ${taskId} not found`);
            return;
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
route.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

export default route;

function getCurrentDate() {
    const timestamp = ic.time();
    return new Date(timestamp / 1000000);
}
