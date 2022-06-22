import { Request, Response } from 'express';
import { iTask } from '../models/task.model';

let tasks: Array<iTask> = [
    { id: 1, title: 'La vida', responsible: 'Juan', isCompleted: false },
];

export const getAllController = (req: Request, resp: Response) => {
    req;
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(tasks));
};

export const getController = (req: Request, resp: Response) => {
    resp.setHeader('Content-type', 'application/json');
    const result = tasks.find((task) => task.id === +req.params.id);
    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
};

export const postController = (req: Request, resp: Response) => {
    const newTask = { ...req.body, id: tasks[tasks.length - 1].id + 1 };
    tasks.push(newTask);
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(JSON.stringify(newTask));
};

export const patchController = (req: Request, resp: Response) => {
    let newTask;
    tasks = tasks.map((task) => {
        if (task.id === +req.params.id) {
            newTask = { ...task, ...req.body };
            return newTask;
        } else {
            return task;
        }
    });
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(newTask));
};

export const deleteController = (req: Request, resp: Response) => {
    const prevLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== +req.params.id);
    resp.status(prevLength === tasks.length ? 404 : 202);
    resp.end(JSON.stringify({}));
};
