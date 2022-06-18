const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true;
    },
    numTasks: Number,
    numReqs: Number
}, {timestamps: true});

const Project = mongoose.model('Project', projectSchema); //this is the name the db will search for

module.exports = Project;