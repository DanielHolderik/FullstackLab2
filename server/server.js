require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const Employe = require('./database/employes.js');
const Project = require('./database/project.js');
const ProjectAssigment = require('./database/projectassigment.js');
const open = require('open').default;

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

//GET APIs all
server.get('/api/employes', async (req, res) => {
try{
  const allEmployes = await Employe.find();
  res.status(200).json(allEmployes);
}
catch (err){
  res.status(500).json({message: "error retrieving employes (GET)" + err.message});
}
});

server.get('/api/projects', async (req, res) => {
  try{
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
  }
  catch (err){
    res.status(500).json({message: "error retrieving projects (GET)" + err.message});
  }
});

server.get('/api/projectassigments', async (req, res) => {
  try{
    const allProjectsAssigments = await Project.find();
    res.status(200).json(allProjectsAssigments);
  }
  catch (err){
    res.status(500).json({message: "error retrieving Projects Assigments (GET)" + err.message});
  }
});







server.get('/', (req, res) => {
  res.send("server is running");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});