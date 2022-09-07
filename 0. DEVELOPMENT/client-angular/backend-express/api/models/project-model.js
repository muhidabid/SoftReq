const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  _id: {type: Schema.Types.ObjectId},
  _WID: {type: Schema.Types.ObjectId, ref:'Workspaces'},
  name: {type: String},
  description: {type: String},
  W_ID: {
    type: Schema.Types.ObjectId,
    ref: 'Workspaces'
  },
  // createdOn: {
  //   type: Date,
  //   default: Date.now()
  // }
});

module.exports = mongoose.model('projectModel', projectSchema, 'Projects');


