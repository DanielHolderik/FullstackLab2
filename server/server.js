require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());
const bodyParser = require('body-parser');

//connect to DB
const{CONNECTION_URL} = process.env;
mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('connected to DB \n');
    console.log('conncted to: ', CONNECTION_URL);
}).catch((err) =>{
    console.error("connection to DB failed!", err);
});









server.get('/', (req, res) => {
  res.send("server is running");
});

server.listen(prompt, () => {
  console.log(`Server is running on port ${prompt}`);
});