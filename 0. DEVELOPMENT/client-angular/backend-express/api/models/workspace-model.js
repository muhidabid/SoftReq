const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const workspaceSchema = new Schema({
    // _id: {type: Schema.Types.ObjectId},
    name: {type: String},
    description: {type: String},
    projectsRef: {
      type: [ObjectId],
      index: true,
      ref: 'Projects'
    },
  });

module.exports = mongoose.model('Workspaces', workspaceSchema, 'Workspaces');
// module.exports = mongoose.model('Workspaces', workspaceSchema);


