const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
any = Schema.any;

const cardSchema = new Schema({
  id: {type: Number},
  requirement: {type: String},
  version: {type: Number},
  comments: {
    type: [{
      id: {type: Number},
      text: {type: String},
    }],
  },
  listRef: {
    type: ObjectId,
    index: true,
    ref: 'Lists'
  },
  position: {type: Number},

  attributes: {type: [any]},
  notes: {type: String},
  priority: {type: Number},

  qualityConcerns: {type: [any]},
  ambiguityConcerns: {type: [any]},
});

module.exports = mongoose.model('Cards', cardSchema, 'Cards');
