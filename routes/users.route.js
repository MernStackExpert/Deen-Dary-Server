
const express = require('express');
const { getAllUser, createUser, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.get("/" , getAllUser);
router.post("/" , createUser);
router.patch("/:id", updateUser);
router.delete("/id", deleteUser);

module.exports = router;
