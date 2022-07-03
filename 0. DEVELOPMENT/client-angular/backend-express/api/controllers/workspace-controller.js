const Workspace = require("../models/workspace-model");

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
const addProject = async (req, res, next) => {
  // get project ID from request body
  const { p_id } = req.body;
  let workspace;
  try {
    workspace = new Workspace({
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
}


exports.getWorkspaces = getWorkspaces;
exports.addWorkspace = addWorkspace;
exports.addProject = addProject;
