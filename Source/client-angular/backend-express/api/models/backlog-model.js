const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const listSchema = new Schema({
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

module.exports = mongoose.model('Backlogs', listSchema, 'Backlogs');
