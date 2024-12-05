
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;
import bodyParser from 'body-parser';
import cors from 'cors';
import { reviewRoutes } from './src/review/review.routes';
import { connectDB } from './src/connect/mongodb';
app.use(express.json());
app.use(bodyParser.json());
const local = 'http://localhost:3000'
const frontenDomain = 'https://doorgo.vercel.app'
const backendDomain = "https://doorgo.onrender.com"
const corsOptions = {
  origin: [local, frontenDomain,backendDomain], // Multiple allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],// Adjust methods as needed
};
app.use(cors(corsOptions));


app.use('/review', reviewRoutes);

connectDB();
app.listen(PORT, () => {
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`Server is running in production on ${backendDomain} on port ${PORT}`);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});