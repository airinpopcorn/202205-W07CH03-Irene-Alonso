import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';
import {
    deleteController,
    getAllController,
    getController,
    patchController,
    postController,
} from './task.controller';

describe('Given a function', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: {},
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
    });

    describe('When we call getAllController', () => {
        test('Then the resp.end should be called', async () => {
            TaskModel.prototype.findAll = jest.fn();
            await getAllController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
        });
    });

    describe('When we call getController', () => {
        test('Then the resp.end should be called', async () => {
            let mockResult = {
                id: 2,
                title: 'test',
                responsible: 'testResponsible',
                isCompleted: false,
            };
            TaskModel.prototype.find = jest
                .fn()
                .mockResolvedValue(mockResult.id);
            await getController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
        });
    });
    describe('When we call getController with a wrong id', () => {
        test('Then the resp.end should be called with a 404', async () => {
            TaskModel.prototype.find = jest.fn().mockResolvedValue(null);
            await getController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
    describe('When we call postController', () => {
        test('Then the resp.end should be called', async () => {
            TaskModel.prototype.create = jest.fn();
            await postController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
        });
    });
    describe('When we call patchController', () => {
        test('Then the resp.end should be called', async () => {
            TaskModel.prototype.update = jest.fn();
            await patchController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
        });
    });
    describe('When we call deleteController', () => {
        test('Then the resp.end should be called', async () => {
            TaskModel.prototype.delete = jest.fn().mockResolvedValue({});
            await deleteController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
});
