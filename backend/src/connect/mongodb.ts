import mongoose, { ConnectOptions } from 'mongoose';

const uri = 'mongodb://localhost:27017/doorfront'; // Your MongoDB connection string

// Set up a function to connect to MongoDB and export the connection
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      // No need to specify useNewUrlParser or useUnifiedTopology in recent versions
    } as ConnectOptions); // Cast to ConnectOptions if required by TypeScript
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if there's a connection error
  }
};

export { connectDB, mongoose };
