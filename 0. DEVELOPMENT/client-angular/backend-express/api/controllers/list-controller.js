const mongoose = require('mongoose');
const Project = require("../models/project-model");
const List = require("../models/list-model")

const addList = async (req, res, next) => {
  const { title, position, projRef } = req.body;

  console.log("Project to which List is adding: ", projRef);

  let list;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // 1. save a new list to db
    const listSaveResult = await List.create([
      {
        id: 0,
        title: title,
        color: '#009886',
        position: position,
        projectRef: mongoose.Types.ObjectId(projRef),
      }
    ],{ session });

    list = listSaveResult[0];

    // 2. add its reference to the project it is added to
    try{
      console.log("Finding project and adding list ref...");
      await Project.findByIdAndUpdate(
        mongoose.Types.ObjectId(projRef),
        {"$push": {"listsRef": listSaveResult[0]._id}},
        { session: session }
      );
      console.log("added listtRef...?");
    }
    catch (err) {
      console.log("Error adding listRef to Project: ");
      console.log(err);
    }

    await session.commitTransaction();
    session.endSession();
  }
  // catch and log error
  catch (err) {
    console.log("Error adding the List");
    console.log(err);
    return res.status(404).json({ message: "Unable to Add List" });
  }
  console.log("List added successfully!");
  return res.status(200).json({ list });
};

const deleteList = async (req, res, next) => {
  const { listRef } = req.body;

  console.log("listRef of List being deleted: ", listRef);

  let deletedList;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // 1. delete list from db
    let deletedList;
    try{
      console.log("Finding list to delete...");
      deletedList = await List.findByIdAndDelete(
        mongoose.Types.ObjectId(listRef),
        { session: session }
      );
      console.log("deleted list...?");
    }
    catch (err) {
      console.log("Error deleting list from Lists: ");
      console.log(err);
    }

    // 2. delete its reference from the project it was added to
    try{
      console.log("Finding project and deleting list ref...");
      await Project.findByIdAndUpdate(
        mongoose.Types.ObjectId(deletedList.projectRef),
        {"$pull": {"listsRef": mongoose.Types.ObjectId(deletedList._id)}},
        { session: session }
      );
      console.log("deleted listtRef...?");
    }
    catch (err) {
      console.log("Error deleting listRef to Project: ");
      console.log(err);
    }

    await session.commitTransaction();
    session.endSession();
  }
  // catch and log error
  catch (err) {
    console.log("Error deleting the List");
    console.log(err);
    return res.status(404).json({ message: "Unable to Delete List" });
  }
  console.log("List deleted successfully!");
  return res.status(200).json({ deletedList });
};

exports.addList = addList;
exports.deleteList = deleteList;
