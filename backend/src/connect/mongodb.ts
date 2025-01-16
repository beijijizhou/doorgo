import mongoose, { ConnectOptions } from 'mongoose';
require('dotenv').config(); // Ensure this is at the top 
const LOCAL_DB_URL = "mongodb://localhost:27017/doorgo"
export const DB_URL =
  process.env.NODE_ENV === 'production' 
    ? process.env.REMOTE_DB_URL
    : LOCAL_DB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL!, {
      // No need to specify useNewUrlParser or useUnifiedTopology in recent versions
    } as ConnectOptions); // Cast to ConnectOptions if required by TypeScript
    console.log('Successfully connected to MongoDB', DB_URL);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if there's a connection error
  }
};

export { connectDB, mongoose };
