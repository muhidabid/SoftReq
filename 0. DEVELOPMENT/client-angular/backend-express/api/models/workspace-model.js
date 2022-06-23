const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  name: {type: String},
  description: {type: String},
  projects: [{type: String}],
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

// module.exports = mongoose.model('Assessment', assessmentSchema);
module.exports = mongoose.model('workspaceModel', workspaceSchema);


