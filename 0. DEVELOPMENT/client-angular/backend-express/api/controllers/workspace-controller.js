const Workspace = require("../models/workspace-model");

const getAllWorkspaces = async (req, res, next) => {
  let workspaces;
  try {
    workpspaces = await Workspace.find({});
  } catch (err) {
    console.log(err + 'aosd');
  }
  if (!workpspaces) {
    return res.status(404).json({ message: "No Workspace to display" });
  }
  return res.status(200).json({ workspaces });
};

////////////////////////////////////////////////////////////////////

const addWorkspace = async (req, res, next) => {
  // const { name, description, projects, createdOn } = req.body;
  const { name, description } = req.body;
  let workspace;
  try {
    workspace = new Workspace({
      name,
      description,
      // projects,
      // createdOn
    });
    await workspace.save();
  } catch (err) {
    console.log("Error adding the workspace" + JSON.stringify(err, undefined, 2));
  }
  if (!workspace) {
    return res.status(404).json({ message: "Unable to Add workspace" });
  }
  console.log("Workspace added successfully!" + JSON.stringify(workspace));
  return res.status(200).json({ workspace });
};

exports.getAllWorkspaces = getAllWorkspaces;
exports.addWorkspace = addWorkspace;
