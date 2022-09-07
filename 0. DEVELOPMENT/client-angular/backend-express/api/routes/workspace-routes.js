const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspace-controller");

router.get("/getWorkspaces", workspaceController.getWorkspaces);
router.post("/addWorkspace", workspaceController.addWorkspace);
router.post("/addProjectRefToWorkspace", workspaceController.addProjectRefToWorkspace);

// router.post("/", assessmentController.addAssessment);
// router.get("/:id", assessmentController.getAssessmentbyID);
// router.put("/:id", assessmentController.updateAssessment);
// router.delete("/:id", assessmentController.deleteAssessment);

module.exports = router;
