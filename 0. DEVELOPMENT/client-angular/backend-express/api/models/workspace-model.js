const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workspaceSchema = new Schema({
  name: {type: String},
  description: {type: String},
  projects: [{type: String}],
});

module.exports = mongoose.model('Assessment', assessmentSchema);


