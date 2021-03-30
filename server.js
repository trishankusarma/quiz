const express = require("express");
const app = express();

const McqRouter = require('./routes/Mcq');
const FillUpRouter = require('./routes/FillUp');

require('dotenv').config();
require('./db/db');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/mcqs',McqRouter);
app.use('/fill_up',FillUpRouter);

const PORT = process.env.PORT;

app.listen(PORT , ()=>console.log(`Server running on port ${PORT}`));