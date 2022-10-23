const mongoose = require('mongoose');
const Project = require("../models/project-model");
const List = require("../models/list-model")


// const getAllListsOfProject = async (req, res, next) => {
//   console.log("getAllListsOfProject called in list controller");
//   const { projName } = req.body;
//   let lists;
//   try {
//     // find all with provided projectRef
//     lists = await Project.find({projectRef: projName});
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({ message: "No lists to display :(" });
//   }
//   return res.status(200).json({ lists });
// };


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
        projectRef: projRef,
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

exports.addList = addList;
