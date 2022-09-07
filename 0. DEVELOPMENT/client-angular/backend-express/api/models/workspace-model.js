const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
    // _id: {type: Schema.Types.ObjectId},
    name: {type: String},
    description: {type: String},
    P_IDs: {
      type: [Schema.Types.ObjectId],
      ref: 'Projects'
    },
    // createdOn: {
    //   type: Date,
    //   default: Date.now()
    // }
  });

module.exports = mongoose.model('workspaceModel', workspaceSchema, 'Workspaces');


