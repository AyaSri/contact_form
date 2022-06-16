const { check, validationResult } = require('express-validator');

exports.validateFormRequest = [
    check('first_name')
    .notEmpty()
    .withMessage('firstName is required'),
    check('last_name')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('message')
    .notEmpty()
    .withMessage('Message is required'),
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}