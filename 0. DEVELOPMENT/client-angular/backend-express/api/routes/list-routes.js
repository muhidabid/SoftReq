const express = require("express");
const router = express.Router();
const listController = require("../controllers/list-controller");

router.post("/getAllListsOfProject", listController.getAllListsOfProject);

module.exports = router;
