const Project = require("../models/project-model");
// const Workspace = require("../models/workspace-model");
// const client = require('mongoose');
// const session = client.startSession();
// const projectCollection = client.Collection("Projects");
// const workspaceCollection = client.Collection("Workspaces");

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
  const { name, description } = req.body;

  let project;
  try {
    // create a new project
    project = new Project({
      name,
      description,
    });

    // save to the collection
    await project.save();
    // const transactionResults = (await session).withTransaction(async () => {
    //   // save project to Projects collection
    //   const projectSaveResult = await projectCollection.save(project, {session});
    //   const workspaceUpdateResult = workspaceCollection.updateOne({_id: 1}, {$push: {projects: projectSaveResult._id}});
    // })
  }
  // catch and log error
  catch (err) {
    console.log(
      "Error adding the project" + JSON.stringify(err, undefined, 2)
    );
  }
  // Check if inserted
  if (Object.entries(projects).length === 0) {
    return res.status(404).json({ message: "Unable to Add workspace" });
  }
  // log confirmation message on console
  console.log("Project added successfully!" + JSON.stringify(project));
  // return created object
  return res.status(200).json({ project });
};

// export the functions
exports.getAllProjects = getAllProjects;
exports.addProject = addProject;
