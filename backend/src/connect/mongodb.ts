import mongoose, { ConnectOptions } from 'mongoose';

export const DB_URL = 'mongodb://localhost:27017/doorfront'; // Your MongoDB connection string

// Set up a function to connect to MongoDB and export the connection
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      // No need to specify useNewUrlParser or useUnifiedTopology in recent versions
    } as ConnectOptions); // Cast to ConnectOptions if required by TypeScript
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if there's a connection error
  }
};

export { connectDB, mongoose };
