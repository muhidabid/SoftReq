const mongoose = require('mongoose');
const Project = require("../models/project-model");
const Workspace = require("../models/workspace-model");
const List = require("../models/list-model")
const Card = require("../models/card-model")
const Backlog = require("../models/backlog-model");

const getAllProjects = async (req, res, next) => {
  let projects;
  try {
    projects = await Project.find({});
  } catch (err) {
    console.log(err + "Projects not found");
  }
  if (Object.entries(projects).length === 0) {
    return res.status(404).json({ message: "No Projects to display" });
  }
  return res.status(200).json({ projects });
};

////////////////////////////////////////////////////////////////////

const getProjectByName = async (req, res, next) => {
  // console.log("getProjectByName called in proj controller");
  const { name } = req.body;
  // console.log("Req body: ");
  // console.log(req.body);
  let project;
  try {
    project = await Project.findOne({name: name});
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No Project to display :(" });
  }
  return res.status(200).json({ project });
};

////////////////////////////////////////////////////////////////////

const getBoard = async (req, res, next) => {
  const { projId } = req.body;
  let board;
  try {
    board = await Project.findById(
      mongoose.Types.ObjectId(projId)
    )
    .populate('listsRef')
    .populate({
      path: 'listsRef',
      populate: {
        path: 'cardsRef',
        model: Card,
        populate: {
          path: 'crossReferences',
          model: Card,
        },
      }
    })
    .populate('backlogRef')
    .populate({
      path: 'backlogRef',
      populate: {
        path: 'cardsRef',
        model: Card,
      }
    })

    // .exec(function (err, results) {
    //   console.log("Error in getting Board: ");
    //   console.log(err);
    //   console.log("Results in getting Board: ");
    //   console.log(results);
    // });

    // .populate('listsRef').populate({
    //   path: 'listsRef',
    //   populate: {
    //     path: 'cardsRef',
    //     model: Card
    //   }
    // });

  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No Board to display :(" });
  }
  return res.status(200).json({ board });
};

////////////////////////////////////////////////////////////////////

// const getBacklog = async (req, res, next) => {
//   const { projId } = req.body;
//   let backlog;
//   try {
//     backlog = await Project.findById(
//       mongoose.Types.ObjectId(projId)
//     )
//     .populate('listsRef')
//     .populate({
//       path: 'listsRef',
//       populate: {
//         path: 'cardsRef',
//         model: Card,
//         populate: {
//           path: 'crossReferences',
//           model: Card,
//         },
//       }
//     })
//     // .populate('backlogRef')

//     // .exec(function (err, results) {
//     //   console.log("Error in getting Board: ");
//     //   console.log(err);
//     //   console.log("Results in getting Board: ");
//     //   console.log(results);
//     // });

//     // .populate('listsRef').populate({
//     //   path: 'listsRef',
//     //   populate: {
//     //     path: 'cardsRef',
//     //     model: Card
//     //   }
//     // });

//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({ message: "No Board to display :(" });
//   }
//   return res.status(200).json({ board });
// };

////////////////////////////////////////////////////////////////////

const editProject = async (req, res, next) => {
  const { name, description, projRef } = req.body;

  console.log("Project to which it's adding: ", projRef);

  let projectUpdateResult;
  try {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // 1. save a new project to db
    projectUpdateResult = await Project.findByIdAndUpdate(
      mongoose.Types.ObjectId(projRef),
      { name: name, description: description },
      { new: true, upsert: true }
    )
    console.log("Project update result: ");
    console.log(projectUpdateResult);
  }
  // catch and log error
  catch (err) {
    console.log("Error updating the project");
    console.log(err);
    return res.status(404).json({ message: "Unable to update Project" });
  }
  console.log("Project updated successfully!");
  return res.status(200).json({ projectUpdateResult });
};

////////////////////////////////////////////////////////////////////

const updateBoard = async (req, res, next) => {
  const { board } = req.body; // board is an array of lists
  try {
    // 1. Update all lists
    for(i=0; i < board.length; i++){
      await List.findByIdAndUpdate(
        mongoose.Types.ObjectId(board[i]._id),
        board[i],
        { new: true, upsert: true }
      )
    }

  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "No Board to display :(" });
  }
  return res.status(200).json({ board });
};

////////////////////////////////////////////////////////////////////

const addProject = async (req, res, next) => {
  const { name, description, workspaceRef } = req.body;

  console.log("Workspace to which it's adding: ", workspaceRef);

  let project;
  try {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // 1. save a new project to db
    const projectSaveResult = await Project.create([
      {
        name: name,
        description: description,
        workspaceRef: mongoose.Types.ObjectId(workspaceRef),
        // backlogRef: mongoose.Types.ObjectId(""),
      }
    ]);//,{ session });


    console.log("Project save result: ");
    console.log(projectSaveResult);

    // project = new Project({
    //   name: name,
    //   description: description,
    //   workspaceRef: workspaceRef,
    // });

    // const projectSaveResult = await Project.updateOne({name: name}, project, {upsert: true});

    // 2. add its reference to the workspace it is added to
    try{
      console.log("Finding workspace and adding project ref...");
      // console.log("projectSaveResult[0]._id = ");
      // console.log(projectSaveResult[0]._id);
      await Workspace.findByIdAndUpdate(
        mongoose.Types.ObjectId(workspaceRef),
        {"$push": {"projectsRef": projectSaveResult[0]._id}},
        // { session: session }
      );
      console.log("added projectRef...?");
    }
    catch (err) {
      console.log("Error adding projectREF to Workspace: ");
      console.log(err);
    }

    // 3. add a sample List item of this project to the List collection
    const firstListName = "Example List";

    const listSaveResult = await List.create([
      {
        id: 0,
        title: firstListName,
        color: "#009886",
        position: 0,
        projectRef: projectSaveResult[0]._id,
      }
    ]);//,{ session });

    console.log("List save result: ");
    console.log(listSaveResult);
    // console.log(listSaveResult[0]._id);

    // 4. Add reference of that List to this Project
    try{
      await Project.findByIdAndUpdate(
        projectSaveResult[0]._id,
        {"$push": {"listsRef": listSaveResult[0]._id}},
        // {session: session}
      );
    }
    catch (err) {
      console.log("Error adding List to Project: ");
      console.log(err);
    }

    // 5. Add a new empty Backlog to this Project
    let backlog;
    try {
      // 1. save a new backlog to db
      const backlogSaveResult = await Backlog.create([
        {
          projectRef: mongoose.Types.ObjectId(projectSaveResult[0]._id),
        }
      ]);

      backlog = backlogSaveResult[0];

      // 2. add its reference to the project it is added to
      try{
        console.log("Finding project and adding backlog ref...");
        await Project.findByIdAndUpdate(
          mongoose.Types.ObjectId(projectSaveResult[0]._id),
          {"backlogRef": backlogSaveResult[0]._id},
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


    // await session.commitTransaction();
    // session.endSession();
  }
  // catch and log error
  catch (err) {
    console.log("Error adding the project");
    console.log(err);
    return res.status(404).json({ message: "Unable to Add Project" });
  }
  console.log("Project added successfully!");
  return res.status(200);
};

////////////////////////////////////////////////////////////////////

const deleteProj = async (req, res, next) => {
  const { projRef } = req.body;

  console.log("projRef of Project being deleted: ", projRef);

  let deletedProj;
  let Lists;
  let deletedLists;
  let deletedCards;
  try{
    // 1. delete project

    deletedProj = await Project.findByIdAndDelete(
      mongoose.Types.ObjectId(projRef),
    );

    // 2. delete all lists referencing project

    // Find all first to use to delete cards
    Lists = await List.find(
      {projectRef: projRef}
    );

    // now delete
    deletedLists = await List.deleteMany(
      {projectRef: projRef}
    );

    // 3. delete all cards in those lists

    for(i = 0; i < Lists.length; i++){
      await Card.deleteMany(
        {listRef: Lists[i]._id}
      );
    }

    // 4. delete the project's backlog
    console.log("backlogRef of Project being deleted: ", deletedProj.backlogRef);

    let deletedBacklog;
    try {
      // const session = await mongoose.startSession();
      // session.startTransaction();

      // 1. delete backlog from db
      let deletedBacklog;
      try{
        console.log("Finding backlog to delete...");
        deletedBacklog = await Backlog.findByIdAndDelete(
          // mongoose.Types.ObjectId(deletedProj.backlogRef),
          deletedProj.backlogRef,
        );
        console.log("deleted backlog...?");
      }
      catch (err) {
        console.log("Error deleting backlog from Backlogs: ");
        console.log(err);
      }

      // 2. delete all cards in that backlog
      try{
        console.log("Finding cards and deleting them...");
        await Card.deleteMany(
          {"backlogRef": deletedBacklog._id},
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
  }
  catch(err){
    console.log("Error deleting projRef to Project: ");
    console.log(err);
  }
}

////////////////////////////////////////////////////////////////////

// export the functions
exports.getAllProjects = getAllProjects;
exports.addProject = addProject;
exports.getProjectByName = getProjectByName;
exports.getBoard = getBoard;
exports.updateBoard = updateBoard;
exports.editProject = editProject;
exports.deleteProj = deleteProj;
