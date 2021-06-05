const express = require('express');
const connectDB = require('./config/dbConnect');
const experienceRouter = require('./routes/experienceRouter');

const app = express();
app.use(express.json({limit: '50mb'}));

app.use(express.json());
app.use('/experience', experienceRouter);

connectDB();
const PORT = process.env.PORT || 5002;

app.listen(PORT, err =>
  err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);
