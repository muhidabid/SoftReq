const express = require("express");
const router = express.Router();
const Workspace = require("../models/workspace-model");
const workspaceController = require("../controllers/workspace-controller");

router.get("/", workspaceController.getAllWorkspaces);

router.post("/", workspaceController.addWorkspace)


// router.post("/", assessmentController.addAssessment);
// router.get("/:id", assessmentController.getAssessmentbyID);
// router.put("/:id", assessmentController.updateAssessment);
// router.delete("/:id", assessmentController.deleteAssessment);

module.exports = router;
