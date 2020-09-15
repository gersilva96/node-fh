const express = require('express');
const router = express.Router();

const usersController = require("../controllers/users");

const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

router.get("/", authMiddleware, usersController.getUsers);

router.post("/", authMiddleware, adminMiddleware, usersController.addNewUser);

router.put("/:id", authMiddleware, adminMiddleware, usersController.updateUser);

router.delete("/:id", authMiddleware, adminMiddleware, usersController.deleteUser);

module.exports = router;
