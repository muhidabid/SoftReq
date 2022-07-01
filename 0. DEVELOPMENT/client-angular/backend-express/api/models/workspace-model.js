const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspaceSchema = new Schema(
  {
    name: {type: String},
    description: {type: String},
    // projects: {
    //   type: [Schema.Types.ObjectId],
    //   ref: 'Projects'
    // },
    // createdOn: {
    //   type: Date,
    //   default: Date.now()
    // }
  });

module.exports = mongoose.model('workspaceModel', workspaceSchema, 'Workspaces');


