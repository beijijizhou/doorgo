import express, { Application, Request, Response } from 'express';
const app: Application = express();
const PORT = process.env.PORT || 8000;
import bodyParser from 'body-parser';
import cors from 'cors';
import { reviewRoutes } from './src/review/review.routes';
import { connectDB } from './src/connect/mongodb';
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/review', reviewRoutes);
connectDB();
const backendDomain = "https://doorgo.onrender.com"
// const corsOptions = {
//   origin: [local, frontenDomain,backendDomain], // Multiple allowed origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   allowedHeaders: ['Content-Type', 'Authorization'],// Adjust methods as needed
// };


app.get("/", (req: Request, res: Response) => { res.send("welcome"); });



app.listen(PORT, () => {
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`Server is running in production on ${backendDomain} on port ${PORT}`);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});