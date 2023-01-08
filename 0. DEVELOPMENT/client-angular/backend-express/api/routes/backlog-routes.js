const express = require("express");
const router = express.Router();
const backlogController = require("../controllers/backlog-controller");

router.post("/addBacklog", backlogController.addBacklog);
router.post("/deleteBacklog", backlogController.deleteBacklog);

module.exports = router;
