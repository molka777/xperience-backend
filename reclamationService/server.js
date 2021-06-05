const express = require('express');
const connectDB = require('./config/dbConnect');
const reclamationRouter = require('./routes/reclamationRouter');

const app = express();
app.use(express.json({limit: '50mb'}));

app.use(express.json());
app.use('/reclamation', reclamationRouter);

connectDB();
const PORT = process.env.PORT || 5004;

app.listen(PORT, err =>
  err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);
