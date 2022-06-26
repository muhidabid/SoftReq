const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspace-controller");
// const Workspace = require("../models/workspace-model");

router.get("/getWorkspaces", workspaceController.getAllWorkspaces);
router.post("/addWorkspace", workspaceController.addWorkspace);


// router.post("/", assessmentController.addAssessment);
// router.get("/:id", assessmentController.getAssessmentbyID);
// router.put("/:id", assessmentController.updateAssessment);
// router.delete("/:id", assessmentController.deleteAssessment);

module.exports = router;
