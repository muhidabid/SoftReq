const express = require("express");
const router = express.Router();
const listController = require("../controllers/list-controller");

router.post("/addList", listController.addList);
router.post("/deleteList", listController.deleteList);
router.post("/updateListColor", listController.updateListColor);

module.exports = router;
