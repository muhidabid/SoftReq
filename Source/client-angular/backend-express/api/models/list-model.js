const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const listSchema = new Schema({
  id: {type: Number},
  title: {type: String},
  color: {type: String},
  position: {type: Number},
  projectRef: {
    type: ObjectId,
    index: true,
    ref: 'Projects'
  },
  cardsRef: {
    type: [ObjectId],
    index: true,
    ref: 'Cards'
  },
});

module.exports = mongoose.model('Lists', listSchema, 'Lists');
