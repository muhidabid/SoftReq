const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String},
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('projectModel', projectSchema, 'Projects');


