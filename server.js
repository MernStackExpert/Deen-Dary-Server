const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { connectDB } = require('./config/db')

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

const usersRoute = require("./routes/users.route")
const quizRoute = require("./routes/quiz.route")


connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})

app.use('/users' , usersRoute)
app.use('/quiz' , quizRoute)

app.get('/', (req, res) => {
  res.status(200).send('Alhamdulillah! Ramadan Project Backend is Running Successfully.');
});
