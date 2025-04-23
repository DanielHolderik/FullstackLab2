require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
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
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});