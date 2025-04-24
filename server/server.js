require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const Employe = require('./database/employes,js');
const Project = require('./database/project.js');
const ProjectAssigment = require('./database/projectassigment.js');
const open = require('open').default;

const server = express();
server.use(cors());
server.use(express.json());


//connect to DB
const{CONNECTION_URL} = process.env;
console.log('→ DB URL:', CONNECTION_URL) //debug
mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true}) 
.then(() =>{
    console.log('connected to DB \n');
    console.log('conncted to: ', CONNECTION_URL);
}).catch((err) =>{
    console.error("connection to DB failed!", err);
});
mongoose.connection //debug
  .on('connecting', () => console.log('Mongoose connecting…'))
  .on('connected',  () => console.log('Mongoose connected.'))
  .on('open',       () => console.log('Mongoose connection open.'))
  .on('error',      err => console.error('Mongoose error:', err))
  .on('disconnected',() => console.log('Mongoose disconnected.'));


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
    const allProjectsAssigments = await ProjectAssigment.find();
    res.status(200).json(allProjectsAssigments);
  }
  catch (err){
    res.status(500).json({message: "error retrieving Projects Assigments (GET)" + err.message});
  }
});

//POST APIs
server.post('/api/employes', async (req, res) => {
console.log("POST /api/employes callled", req.body); //debug

//check for uniqueness 
try{
  const existingEmploye = await Employe.findOne({employeId: req.body.employeId});
  if (existingEmploye){
    return res.status(400).json({message: "error: id already exists"});
  }

  const newEmploye = new Employe({
    employeId: req.body.employeId,
    name: req.body.name,
    email: req.body.email,
    hashedPass: req.body.hashedPass
  });
  await newEmploye.save();
  res.status(201).json(newEmploye);
  console.log("new employe created: ", newEmploye); //debug
}
catch (err){
  res.status(500).json({message: "error creating new employe (POST)" + err.message});
}
});

server.post('/api/projects', async (req, res) => {
  console.log("POST /api/projects callled"); //debug

  //check for uniqueness
  try{
    const existingProject = await Project.findOne({projectId: req.body.projectId});
    if (existingProject){
      return res.status(400).json({message: "error: projectid already exists"});
    }
    const newProject = new Project({
      projectId: req.body.projectId,
      name: req.body.name,
      description: req.body.description
    });
    await newProject.save();
    res.status(201).json(newProject);
    console.log("new project created: ", newProject); //debug
  }
    catch (err){
      res.status(500).json({message: "error creating new project (POST)" + err.message});
    } 
});

server.post('/api/projectassigments', async (req, res) => {
  console.log("POST /api/projectassigments callled"); //debug

  //check if emplyee and project exist
  try{
    const existingEmploye = await Employe.findOne({employeId: req.body.employeId});
    const existingProject = await Project.findOne({projectId: req.body.projectId});
    const exist = existingEmploye && existingProject;

    if (!exist){
      return res.status(400).json({message: "error: employee or project doesnot exist"});
    }

    const newProjectAssigment = new ProjectAssigment({
      employeId: req.body.employeId,
      projectId: req.body.projectId,
      startDate: req.body.startDate
    })
    await newProjectAssigment.save();
    res.status(201).json(newProjectAssigment);
    console.log("new project assigment created: ", newProjectAssigment); //debug
  } 
  catch (err){
    res.status(500).json({message: "error creating new project assigment (POST)" + err.message});
    
  }
});




server.get('/', (req, res) => {
  res.send("server is running");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});