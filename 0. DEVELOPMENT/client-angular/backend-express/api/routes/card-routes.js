const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card-controller");

router.post("/addCard", cardController.addCard);
router.post("/deleteCard", cardController.deleteCard);
router.post("/updateCard", cardController.updateCard);

module.exports = router;
