const { getDb } = require("../config/db");

const connectDB = async () => {
  const db = await getDb();
  return db.collection("quiz");
};

// const getQuiz = async (params) => {
//   try {
//     const quizCollection = await connectDB();

//   } catch (error) {}
// };

const addQuiz = async (req, res) => {
  try {
    const quizCollection = await connectDB();

    const quiz = {
      ...req.body,
      language: "bn",
      timeLimit: 30,
      points: 1,
      createdAt: new Date(),
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
