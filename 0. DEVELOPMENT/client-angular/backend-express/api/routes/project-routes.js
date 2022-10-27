const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");

router.get("/getProjects", projectController.getAllProjects);
router.post("/getProjectByName", projectController.getProjectByName);
router.post("/addProject", projectController.addProject);
router.post("/getBoard", projectController.getBoard);
router.post("/updateBoard", projectController.updateBoard);
router.post("/editProject", projectController.editProject);
router.post("/deleteProj", projectController.deleteProj);

module.exports = router;
