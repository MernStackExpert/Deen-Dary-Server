const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('Alhamdulillah! Ramadan Project Backend is Running Successfully.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
  console.log(`👉 Visit: http://localhost:${PORT}`);
});

