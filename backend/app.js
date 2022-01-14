const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const postsRouter = require('./controllers/posts');

const app = express();

console.log(`connecting to mongoDB ${process.env.MONGODB_URI}`)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MONGODB')
  })
  .catch((error) => {
    console.log('error connecting to MONGODB', error)
  })

app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);

module.exports = app;