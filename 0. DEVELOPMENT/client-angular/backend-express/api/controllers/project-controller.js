// const connectWithMongoDB = require("../../config/db")
const mongoose = require('mongoose');
const Project = require("../models/project-model");
const Workspace = require("../models/workspace-model");

const conn = require("../../config/db");


// const client = require('mongoose');
// const session = client.startSession();
// const projectCollection = conn.Collection("Projects");
// const workspaceCollection = conn.Collection("Workspaces");

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

const addProject = async (req, res, next) => {
  const { name, description, workspaceRef } = req.body;

  console.log("Workspace to which it's adding: ", workspaceRef);

  let project;
  try {
    // create a new project
    // project = new Project({
    //   name,
    //   description,
    //   workspaceRef,
    // });

    // save to the collection
    // await project.save();

    // const session = await mongoose.connection.startSession();
    const session = await mongoose.startSession();
    session.startTransaction();

    // const projectSaveResult = await projectCollection.save(project).session(session);
    // await workspaceCollection.findByIdAndUpdate(workspaceRef, {$push: {projectsRef: projectSaveResult.name}}).session(session);
    const projectSaveResult = await Project.create([
      {
        name,
        description,
        workspaceRef,
      }
    ],{ session });

    try{
      await Workspace.findOneAndUpdate(
        {'name': workspaceRef},
        {"$push": {"projectsRef": name}},
        {session: session}
      );
    }
    catch (err) {
      console.log("Error adding projectREF to Workspace: ");
      console.log(err);
    }
    // await session.withTransaction(async () => {
    //   // const projectSaveResult = await projectCollection.save(project, {session});
    //   // const workspaceUpdateResult = workspaceCollection.findByIdAndUpdate({workspaceID}, {$push: {projectIDs: projectSaveResult._id}}, {session});

    //   // const projectSaveResult = await projectCollection.save(project, {session: session});
    //   // await workspaceCollection.findByIdAndUpdate(workspaceID, {$push: {projectIDs: projectSaveResult._id}}, {session: session});

    //   const projectSaveResult = await projectCollection.save(project).session(session);
    //   await workspaceCollection.findByIdAndUpdate(workspaceID, {$push: {projectIDs: projectSaveResult._id}}).session(session);
    // });

    await session.commitTransaction();
    session.endSession();
  }
  // catch and log error
  catch (err) {
    // console.log("Error adding the project" + JSON.stringify(err, undefined, 2));
    console.log("Error adding the project");
    console.log(err);
    return res.status(404).json({ message: "Unable to Add workspace" });
  }
  // // Check if inserted
  // if (Object.entries(projects).length === 0) {
  //   return res.status(404).json({ message: "Unable to Add workspace" });
  // }
  // log confirmation message on console
  console.log("Project added successfully!");
  // return created object
  // return res.status(200).json({ project });
  return res.status(200);
};

// export the functions
exports.getAllProjects = getAllProjects;
exports.addProject = addProject;
