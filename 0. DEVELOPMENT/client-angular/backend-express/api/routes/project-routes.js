const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");

router.get("/getProjects", projectController.getAllProjects);
router.post("/addProject", projectController.addProject);

module.exports = router;
