const express = require("express");
const router = express.Router();

const mainController = require("../controllers/main");

router.post("/login", mainController.login);

module.exports = router;