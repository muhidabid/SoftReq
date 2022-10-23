const express = require("express");
const router = express.Router();
const listController = require("../controllers/list-controller");

router.post("/addList", listController.addList);

module.exports = router;
