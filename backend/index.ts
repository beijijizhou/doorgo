
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;
import bodyParser from 'body-parser';
import cors from 'cors';
import { reviewRoutes } from './src/review/review.routes';
import { connectDB } from './src/connect/mongodb';
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }))


app.use('/review', reviewRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});