const Project = require("../models/project-model");
var ObjectId = require('mongoose').Types.ObjectId;

const getAllProjects = async (req, res, next) => {
  let projects;
  try {
    projects = await Project.find({});
  } catch (err) {
    console.log(err + "aosd");
  }
  if (!projects) {
    return res.status(404).json({ message: "No Projects to display" });
  }
  return res.status(200).json({ projects });
};

////////////////////////////////////////////////////////////////////

const addProject = async (req, res, next) => {
  const { name, description } = req.body;
  let project;
  try {
    project = new Project({
      name,
      description,
    });
    await project.save();
  } catch (err) {
    console.log(
      "Error adding the project" + JSON.stringify(err, undefined, 2)
    );
  }
  if (!project) {
    return res.status(404).json({ message: "Unable to Add workspace" });
  }
  console.log("Project added successfully!" + JSON.stringify(project));
  return res.status(200).json({ project });
};
///////////////////////////////////////////////////////////////////////
const getProjectById = async (req, res, next) => {
  // let project;
  // // get project ID from request body
  // const p_id = req.params.id;
  // console.log('Got PID: ', p_id);
  // try {
  //   project = await Project.findById({ _id: ObjectId(req.params.id)}, function(err, result){
  //     if (err) {
  //       res.status(400).send("Error fetching workspace list");
  //     } else {
  //       res.json(result);
  //       console.log('Found:');
  //       console.log(result);
  //     }
  //   });
  // } catch (err) {
  //   console.log(err + "Error!");
  // }
  // return res.status(200).json({ project });


  let project;
  // get project ID from request body
  const p_id = req.params.id;
  console.log('Got PID: ', p_id);
  try {
    project = await Project.findById({ _id: ObjectId(req.params.id)});
  } catch (err) {
    console.log(err + "Error!");
  }
  if (!project) {
    return res.status(404).json({ message: "No Project to display" });
  }
  return res.status(200).json({ project });

  // try {
  //   await Project.findById(p_id, function(err, result){
  //     if (err) {
  //       res.status(400).send("Error fetching workspace list");
  //     } else {
  //       res.json(result);
  //       console.log('Found:');
  //       console.log(result);
  //     }
  //   });
  // } catch (err) {
  //   console.log(err + 'Error');
  // }
  // return res.status(200).json({ project });
};

exports.getAllProjects = getAllProjects;
exports.addProject = addProject;
exports.getProjectById = getProjectById;
