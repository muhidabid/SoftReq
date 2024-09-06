const Workspace = require("../models/workspace-model");
const Project = require("../models/project-model")

const getAllWorkspaces = async (req, res, next) => {
  let workspaces;
  try {
    console.log("Finding workspaces...");
    workspaces = await Workspace.find({}).populate('projectsRef');
    console.log("Workspaces found!");
    // workspaces = await Workspace.find({});
    console.log('Workspaces found (express):');
    console.log(workspaces);

  } catch (err) {
    console.log(err + 'Workspaces not found');
    return res.status(404).json({ message: "No Workspace to display" });
  }
  return res.status(200).json({ workspaces });
};

////////////////////////////////////////////////////////////////////

const addWorkspace = async (req, res, next) => {
  const { name, description } = req.body;
  let workspace;
  try {
    Workspace.init(); // document gets generated (to generate _id)

    workspace = new Workspace({
      name: name,
      description: description,
    });
    await workspace.save();
    // await Workspace.updateOne({name: name}, workspace, {upsert: true});
  } catch (err) {
    console.log("Error adding the workspace");
    console.log(err);
    return res.status(404).json({ message: "Unable to Add workspace" });
  }
  console.log("Workspace added successfully!" + JSON.stringify(workspace));
  return res.status(200).json({ workspace });
};

//////////////////////////////////////////////////////////////////////////

const addProjectReference = async (req, res, next) => {
  const { projectID, workspaceID } = req.body;

  try {
    Workspace.findByIdAndUpdate(workspaceID,
      {
        "$push": {"projectsRef": projectID}
      }
    );
  } catch (err) {
    console.log("Error adding the project reference to workspace" + JSON.stringify(err, undefined, 2));
  }

  return res.status(200);

}

exports.getAllWorkspaces = getAllWorkspaces;
exports.addWorkspace = addWorkspace;
exports.addProjectReference = addProjectReference;
