
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendReview } = require('./review'); // Adjust path if necessary

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }))

app.get("/", (req, res) => {
  res.send('Hello, World!');
});

app.post('/sendReview', sendReview);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
