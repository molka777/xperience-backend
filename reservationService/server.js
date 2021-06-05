const express = require('express');
const connectDB = require('./config/dbConnect');
const reservationRouter = require('./routes/reservationRouter');

const app = express();
app.use(express.json({limit: '50mb'}));

app.use(express.json());
app.use('/reservation', reservationRouter);

connectDB();
const PORT = process.env.PORT || 5003;

app.listen(PORT, err =>
  err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);
