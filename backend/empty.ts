
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;
import bodyParser from 'body-parser';
import cors from 'cors';
import { sendReview } from './src/review/review.controller';
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }))

// app.get("/", (req, res) => {
//   res.send('Hello, World!');
// });

app.post('/sendReview', sendReview);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});