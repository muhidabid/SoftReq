const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String},
  description: {type: String},
  workspaceRef: {
    type: String,
    index: true,
    ref: 'Workspaces'
  },
  // workspaceID: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Workspaces'
  // },
  // createdOn: {
  //   type: Date,
  //   default: Date.now()
  // }
});

module.exports = mongoose.model('projectModel', projectSchema, 'Projects');


