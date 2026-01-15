const express = require('express');
const { getQuiz, singleQuiz, addQuiz, updateQuiz, deleteQuiz } = require('../controllers/quiz.controller');
const router = express.Router();

router.get("/" , getQuiz);
router.get("/:id" , singleQuiz);
router.post("/" , addQuiz);
router.patch("/:id", updateQuiz);
router.delete("/id", deleteQuiz);

module.exports = router;
