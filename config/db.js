const { MongoClient, ObjectId } = require('mongodb');

let dbConnection;

const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    dbConnection = client.db('deenDaryDB'); 
    console.log('✅ MongoDB Connected with Native Driver');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const getDb = () => dbConnection;

module.exports = { connectDB, getDb , ObjectId};