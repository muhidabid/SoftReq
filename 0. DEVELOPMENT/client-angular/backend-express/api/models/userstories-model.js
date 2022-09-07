const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userstoriesSchema = new Schema({
  req: {type: String},
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

// module.exports = mongoose.model('Assessment', assessmentSchema);
module.exports = mongoose.model('userstoriesModel', userstoriesSchema);
