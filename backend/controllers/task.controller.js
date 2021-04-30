const TaskModel = require('../models/task.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



class TaskController {
    getAllTasks = async (req, res, next) => {
        let taskList = await TaskModel.find({user_id: req.currentUser.id});

        res.send(taskList);
    };

    getTaskById = async (req, res, next) => {
        const task = await TaskModel.findOne({ id: req.params.id, user_id: req.currentUser.id });
        if (!user) {
            throw new HttpException(404, 'Task not found');
        }
        res.send(task);
    };

    createTask = async (req, res, next) => {
        this.checkValidation(req);

        const result = await TaskModel.create({user_id: req.currentUser.id, title: req.body.title, description: req.body.description});

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Task was created!');
    };

    updateTask = async (req, res, next) => {
        this.checkValidation(req);

       
        const result = await TaskModel.update( {title: req.body.title, description: req.body.description, status: req.body.status}, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Task not found' :
            affectedRows && changedRows ? 'Task updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteTask = async (req, res, next) => {
        const result = await TaskModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Task not found');
        }
        res.send('User has been deleted');
    };


    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    checkAuthorized = (req, task) => {
        if (req.currentUser.id != task.user_id) {
            throw new HttpException(401, 'Unauthorized');
        }
    }
}

module.exports = new TaskController;
