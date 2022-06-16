// routes/api/forms.js
const express = require('express');
const router = express.Router();

const { saveform, getforms } = require('../controller/form');
const { validateFormRequest, isRequestValidated } = require('../validators/form');

// @route GET api/forms/test
// @description tests forms route
// @access Public
router.get('/test', (req, res) => res.send('form route testing!'));

// @route GET api/forms
// @description Get all forms
// @access Public
router.get('/', getforms);

// @route GET api/forms
// @description add/save form
// @access Public
router.post('/', validateFormRequest, isRequestValidated, saveform);

module.exports = router;