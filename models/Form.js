// models/Form.js

const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Form = mongoose.model('form', FormSchema);