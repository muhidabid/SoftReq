const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspaceSchema = new Schema(
  {
    _id: {type: Schema.Types.ObjectId},
    name: {type:String},
    description: {type:String},
    projects: [{ type: Schema.Types.ObjectId, ref:'Projects'}]
      // name: {type:String},
      // description: {type:String}
    // ]//,
    // createdOn: {
    //   type: Date,
    //   default: Date.now()
    // }
  });

module.exports = mongoose.model('workspaceModel', workspaceSchema, 'Workspaces');


