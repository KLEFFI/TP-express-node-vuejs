const { body } = require('express-validator');
// TODO:
// const Role = require('../../utils/userRoles.utils');


exports.createUserSchema = [
    body('username')
        .exists()
        .withMessage('username is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 3 chars long'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('Password must contain at least 6 characters')
];

exports.validateLogin = [
    body('username')
        .exists()
        .withMessage('Username is required')
        .notEmpty()
        .withMessage('Username must be filled'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];
