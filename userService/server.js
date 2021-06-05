const express = require('express');
const connectDB = require('./config/dbConnect');
const userRouter = require('./routes/userRouter');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(fileUpload());

app.use('/user', userRouter);

connectDB();
const PORT = process.env.PORT || 5001;

app.listen(PORT, err =>
  err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);
