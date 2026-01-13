
const express = require('express');
const { getAllUser, createUser, deleteUser, updateUser, singleUser } = require('../controllers/users.controller');

const router = express.Router();

router.get("/" , getAllUser);
router.get("/:id" , singleUser);
router.post("/" , createUser);
router.patch("/:id", updateUser);
router.delete("/id", deleteUser);

module.exports = router;
