const { getDb, ObjectId } = require("../config/db");

const connectDB = async () => {
  const db = await getDb();
  return db.collection("quiz");
};

const getQuiz = async (req, res) => {
  try {
    const quizCollection = await connectDB();

    const query = {};

    // category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // search
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // total quiz
    const totalQuiz = await quizCollection.countDocuments(query);

    const quizs = await quizCollection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    res.send({
      totalQuiz,
      totalPages: Math.ceil(totalQuiz / limit),
      quizs,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch Quiz", error });
  }
};

const singleQuiz = async (req, res) => {
  try {
    const quizCollection = await connectDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Quiz id" });
    }

    const quiz = await quizCollection.findOne({ _id: new ObjectId(id) });

    if (!quiz) {
      return res.status(404).send({ message: "Quiz Not Found" });
    }

    res.send(quiz);
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch product",
      error,
    });
  }
};

const addQuiz = async (req, res) => {
  try {
    const quizCollection = await connectDB();

    const quiz = {
      ...req.body,
      language: "bn",
      timeLimit: 30,
      points: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await quizCollection.insertOne(quiz);

    res.status(201).send({
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to add quiz",
      error,
    });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quizCollection = await connectDB();
    const id = req.params.id;
    const updateQuiz = {
      ...req.body,
      language: "bn",
      timeLimit: 30,
      points: 1,
      updatedAt: new Date(),
    };

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Quiz id" });
    }

    const result = await quizCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateQuiz }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Quiz NOt Found" });
    }
    res.send({ message: "Quiz updated successfully", result });
  } catch (error) {
    res.status(500).send({ message: "Failed to update Quiz", error });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quizCollection = await connectDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Quiz id" });
    }

    const result = await quizCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Quiz Not Found" });
    }

    res.send({ message: "Quiz deleted successfully", result });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete Quiz", error });
  }
};

module.exports = { getQuiz, addQuiz, singleQuiz, updateQuiz, deleteQuiz };
