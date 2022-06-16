const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASSWORD
    }
});

// Load Form model
const Form = require('../models/Form');

exports.saveform = (req, res) => {
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
            res.status(200).json({ msg: 'Form added successfully'});
          });
    })
    .catch(err => res.status(400).json({ error: 'Unable to add this form' }));
};


exports.getforms = (req, res) => {
    Form.find()
    .then(forms => res.json(forms))
    .catch(err => res.status(404).json({ noformsfound: 'No Forms found' }));
};