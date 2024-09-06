const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const projectSchema = new Schema({
  name: {
    type: String,
    index: true
  },
  description: {type: String},
  workspaceRef: {
    type: ObjectId,
    index: true,
    ref: 'Workspaces'
  },
  backlogRef: {
    type: ObjectId,
    index: true,
    ref: 'Backlogs'
  },
  listsRef: {
    type: [ObjectId],
    index: true,
    ref: 'Lists'
  },
});

module.exports = mongoose.model('Projects', projectSchema, 'Projects');


