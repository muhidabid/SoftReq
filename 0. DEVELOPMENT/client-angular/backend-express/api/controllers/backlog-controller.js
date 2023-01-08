const mongoose = require('mongoose');
const Project = require("../models/project-model");
const List = require("../models/list-model")
const Card = require("../models/card-model");
const Backlog = require("../models/backlog-model");

const addBacklog = async (req, res, next) => {
  const { projRef } = req.body;

  console.log("Project to which Backlog is adding: ", projRef);

  let backlog;
  try {
    // 1. save a new backlog to db
    const backlogSaveResult = await Backlog.create([
      {
        projectRef: mongoose.Types.ObjectId(projRef),
      }
    ]);

    backlog = backlogSaveResult[0];

    // 2. add its reference to the project it is added to
    try{
      console.log("Finding project and adding backlog ref...");
      await Project.findByIdAndUpdate(
        mongoose.Types.ObjectId(projRef),
        {"$push": {"backlogRef": backlogSaveResult[0]._id}},
      );
      console.log("added backlogRef...?");
    }
    catch (err) {
      console.log("Error adding backlogRef to Project: ");
      console.log(err);
    }
  }
  // catch and log error
  catch (err) {
    console.log("Error adding the Backlog");
    console.log(err);
    return res.status(404).json({ message: "Unable to Add Backlog" });
  }
  console.log("Backlog added successfully!");
  return res.status(200).json({ backlog });
};

//-------------------------------------------------------------------------

const deleteBacklog = async (req, res, next) => {
  const { backlogRef } = req.body;

  console.log("backlogRef of Project being deleted: ", backlogRef);

  let deletedBacklog;
  try {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // 1. delete backlog from db
    let deletedBacklog;
    try{
      console.log("Finding backlog to delete...");
      deletedBacklog = await Backlog.findByIdAndDelete(
        mongoose.Types.ObjectId(backlogRef),
      );
      console.log("deleted backlog...?");
    }
    catch (err) {
      console.log("Error deleting backlog from Backlogs: ");
      console.log(err);
    }

    // 2. delete its reference from the project it was added to
    try{
      console.log("Finding project and deleting backlogRef...");
      await Project.findByIdAndUpdate(
        mongoose.Types.ObjectId(deletedBacklog.projectRef),
        {"$pull": {"backlogRef": mongoose.Types.ObjectId(deletedBacklog._id)}},
      );
      console.log("deleted backlogRef...?");
    }
    catch (err) {
      console.log("Error deleting backlogRef from Project: ");
      console.log(err);
    }

    // 3. delete all cards in that backlog
    try{
      console.log("Finding cards and deleting them...");
      await Card.deleteMany(
        {"backlogRef": mongoose.Types.ObjectId(deletedBacklog._id)},
      );
      console.log("deleted backlogRef...?");
    }
    catch (err){
      console.log("Error deleting cards of that backlog: ");
      console.log(err);
    }
  }
  // catch and log error
  catch (err) {
    console.log("Error deleting the Backlog");
    console.log(err);
    return res.status(404).json({ message: "Unable to Delete Backlog" });
  }
  console.log("Backlog deleted successfully!");
  return res.status(200).json({ deletedBacklog });
};

///////////////////////////////////////////////////////////////////////////////////

const updateBacklog = async (req, res, next) => {
  const { backlog } = req.body;

  try {
    // 1. Update backlog
    await Backlog.findByIdAndUpdate(
      mongoose.Types.ObjectId(backlog._id),
      backlog,
      { new: true, upsert: true }
    )

  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No backlog to display :(" });
  }
  return res.status(200).json({ backlog });
};


exports.addBacklog = addBacklog;
exports.deleteBacklog = deleteBacklog;
exports.updateBacklog = updateBacklog;
