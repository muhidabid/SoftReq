const mongoose = require('mongoose');
const Project = require("../models/project-model");
const List = require("../models/list-model")


const getAllListsOfProject = async (req, res, next) => {
  console.log("getAllListsOfProject called in list controller");
  const { projName } = req.body;
  let lists;
  try {
    // find all with provided projectRef
    lists = await Project.find({projectRef: projName});
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No lists to display :(" });
  }
  return res.status(200).json({ lists });
};

exports.getAllListsOfProject = getAllListsOfProject;

// const addList = async (req, res, next) => {
//   const { title, projectRef } = req.body;

//   console.log("Workspace to which it's adding: ", workspaceRef);

//   let project;
//   try {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     // 1. save a new project to db
//     const projectSaveResult = await Project.create([
//       {
//         name: name,
//         description: description,
//         workspaceRef: workspaceRef,
//       }
//     ],{ session });

//     // project = new Project({
//     //   name: name,
//     //   description: description,
//     //   workspaceRef: workspaceRef,
//     // });

//     // const projectSaveResult = await Project.updateOne({name: name}, project, {upsert: true});

//     // 2. add its reference to the workspace it is added to
//     try{
//       await Workspace.findOneAndUpdate(
//         {'name': workspaceRef},
//         {"$push": {"projectsRef": name}},
//         {session: session}
//       );
//     }
//     catch (err) {
//       console.log("Error adding projectREF to Workspace: ");
//       console.log(err);
//     }

//     // 3. add a sample List item of this project to the List collection
//     const firstListName = "Example List";

//     const listSaveResult = await List.create([
//       {
//         id: 0,
//         title: firstListName,
//         description: "#009885",
//         position: 0,
//         projectRef: name,
//       }
//     ],{ session });

//     // 4. Add reference of that List to this Project
//     try{
//       await Project.findOneAndUpdate(
//         {'name': name},
//         {"$push": {"lists": 0}},
//         {session: session}
//       );
//     }
//     catch (err) {
//       console.log("Error adding List to Project: ");
//       console.log(err);
//     }

//     await session.commitTransaction();
//     session.endSession();
//   }
//   // catch and log error
//   catch (err) {
//     console.log("Error adding the project");
//     console.log(err);
//     return res.status(404).json({ message: "Unable to Add workspace" });
//   }
//   console.log("Project added successfully!");
//   return res.status(200);
// };
