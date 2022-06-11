// routes/api/forms.js

const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "26c1dfc14adcb0",
      pass: "2fb5ec3460b33d"
    }
});

// Load Form model
const Form = require('../../models/Form');

// @route GET api/forms/test
// @description tests forms route
// @access Public
router.get('/test', (req, res) => res.send('form route testing!'));

// @route GET api/forms
// @description Get all forms
// @access Public
router.get('/', (req, res) => {
  Form.find()
    .then(forms => res.json(forms))
    .catch(err => res.status(404).json({ noformsfound: 'No Forms found' }));
});

// @route GET api/forms
// @description add/save form
// @access Public
router.post('/', (req, res) => {
    console.log('ttt');
  Form.create(req.body)
    .then(form => {
        const mailOptions = {
            from: '"Example Team" <from@example.com>',
            to: 'user1@example.com, user2@example.com',
            subject: 'Contact Details',
            text: 'Hey there, please find the contact details below ',
            html: `<b>Hey there! </b><br> A New Contact is Added. Plase find the details below:<br /><br> First Name : ${form.first_name}<br /><br> Last Name : ${form.last_name}<br /><br> Email : ${form.email}<br /> <br> Message : ${form.message}<br />`,
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.json({ msg: 'Form added successfully' });
          });
    })
    .catch(err => res.status(400).json({ error: 'Unable to add this form' }));
});

module.exports = router;