const { body } = require('express-validator');

exports.createTaskSchema = [
    body('title')
        .exists()
        .withMessage('title is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    body('description')
        .exists()
        .withMessage('description is required')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('description must contain at least 6 characters')
];

exports.updateTaskSchema = [
    body('title')
        .exists()
        .withMessage('title is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    body('description')
        .exists()
        .withMessage('description is required')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('description must contain at least 6 characters'),
    body('status')
        .exists()
        .isAlphanumeric()
];
