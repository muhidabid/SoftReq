const mongoose = require('mongoose');
const Project = require("../models/project-model");
const Workspace = require("../models/workspace-model");
const List = require("../models/list-model")

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
    ).populate('listsRef');

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
    const session = await mongoose.startSession();
    session.startTransaction();

    // 1. save a new project to db
    const projectSaveResult = await Project.create([
      {
        name: name,
        description: description,
        workspaceRef: mongoose.Types.ObjectId(workspaceRef),
      }
    ],{ session });


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
        { session: session }
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
        description: "#009885",
        position: 0,
        projectRef: projectSaveResult[0]._id,
      }
    ],{ session });

    console.log("List save result: ");
    console.log(listSaveResult);
    // console.log(listSaveResult[0]._id);

    // 4. Add reference of that List to this Project
    try{
      await Project.findByIdAndUpdate(
        projectSaveResult[0]._id,
        {"$push": {"listsRef": listSaveResult[0]._id}},
        {session: session}
      );
    }
    catch (err) {
      console.log("Error adding List to Project: ");
      console.log(err);
    }

    await session.commitTransaction();
    session.endSession();
  }
  // catch and log error
  catch (err) {
    console.log("Error adding the project");
    console.log(err);
    return res.status(404).json({ message: "Unable to Add workspace" });
  }
  console.log("Project added successfully!");
  return res.status(200);
};

// export the functions
exports.getAllProjects = getAllProjects;
exports.addProject = addProject;
exports.getProjectByName = getProjectByName;
exports.getBoard = getBoard;
