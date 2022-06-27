const Project = require("../models/project-model");

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

exports.getAllProjects = getAllProjects;
exports.addProject = addProject;
