const Workspace = require("../models/workspace-model");
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');

const getWorkspaces = async  (req, res, next) => {
  let workspaces;
  try {
    await Workspace.find({}, function(err, result){
      if (err) {
        res.status(400).send("Error fetching workspace list");
      } else {
        res.json(result);
        console.log('Found:');
        console.log(result);
      }
    });
  } catch (err) {
    console.log(err + 'Error');
  }
};

////////////////////////////////////////////////////////////////////

const addWorkspace = async (req, res, next) => {
  // create new workspace object from request body
  const { name, description } = req.body;
  let workspace;
  try {
    workspace = new Workspace({
      name,
      description,
      // projects,
      // createdOn
    });
    // save to specified collection of DB specified in workspacemodel
    await workspace.save();
  } catch (err) {
    // catch and display error
    console.log("Error adding the workspace" + JSON.stringify(err, undefined, 2));
  }
  if (!workspace) {
    // if workspace not created then
    return res.status(404).json({ message: "Unable to Add workspace" });
  }
  // workspace created!
  console.log("Workspace added successfully!" + JSON.stringify(workspace));
  return res.status(200).json({ workspace });
};

////////////////////////////////////////////////////////////////////////////////
const addProjectRefToWorkspace = async (req, res, next) => {
  // get project ID from request body
  const { w_id, p_id } = req.body;
  try {
    // save to specified collection of DB specified in workspacemodel
    // await workspace.save();
    Workspace.findById(w_id, function(err, workspace) {
      if (err) return res.send(err);
      workspace.projects.push(mongoose.Types.ObjectId(p_id));
      workspace.save(function(err) {
        if (err) return res.send(err);
        res.json({ status : 'done updating workspaces' });
      });
    });

  } catch (err) {
    // catch and display error
    console.log("Error adding the Project reference" + JSON.stringify(err, undefined, 2));
  }
  // if (!workspace) {
  //   // if workspace not created then
  //   return res.status(404).json({ message: "Unable to Add Project reference" });
  // }
  // workspace created!
  // console.log("Project reference added successfully!" + JSON.stringify(workspace));
  // return res.status(200).json({ workspace });
}


exports.getWorkspaces = getWorkspaces;
exports.addWorkspace = addWorkspace;
exports.addProjectRefToWorkspace = addProjectRefToWorkspace;
