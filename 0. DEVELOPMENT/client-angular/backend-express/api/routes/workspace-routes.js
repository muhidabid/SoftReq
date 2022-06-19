const express = require("express");
const router = express.Router();
const Assessment = require("../models/workspace-model");
const assessmentController = require("../controllers/workspace-controller");

router.get("/", assessmentController.getAllWorkspaces);
// router.post("/", assessmentController.addAssessment);
// router.get("/:id", assessmentController.getAssessmentbyID);
// router.put("/:id", assessmentController.updateAssessment);
// router.delete("/:id", assessmentController.deleteAssessment);
module.exports = router;
