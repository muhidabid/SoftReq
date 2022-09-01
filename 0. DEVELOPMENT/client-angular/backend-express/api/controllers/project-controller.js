const Project = require("../models/project-model");
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');
// const { addProjectRefToWorkspace } = require("./workspace-controller")
var workspaceController = require("./workspace-controller");

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
  const { WID, name, description } = req.body;
  let project;
  // var _WID = mongoose.Types.ObjectId(WID);
  var _WID = mongoose.Types.ObjectId(WID);
  var _id =  new mongoose.Types.ObjectId();
  try {
    project = new Project({
      _id,
      _WID,
      name,
      description,
    });
    console.log('Displaying project: '+project);
    // await project.save((err, p) => {
    //   res.json(p._id);
    // });
    await project.save();

    // add reference to workspace
    // workspaceController.addProjectRefToWorkspace(_WID, _id);
    // this.workspaceService.addProject(this.data._WID, response._id).subscribe((response: any)=>{
    //   console.log(response);
    // });

  } catch (err) {
    console.log("Error adding the project" + JSON.stringify(err, undefined, 2));
    return "Error adding the project" + JSON.stringify(err, undefined, 2);
  }
  if (!project) {
    return res.status(404).json({ message: "Unable to Add prroject" });
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
