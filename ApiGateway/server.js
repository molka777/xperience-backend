const express = require('express')
const { default: axios } = require('axios');
const app = express()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

const userServiceProxy = 'http://localhost:5001/user'

app.post('/register', (req, res) => {
  try{
  axios.post(userServiceProxy+"/register",req.body).then((response)=>{
    res.send(response.data)  })}
    catch(error){
    res.status(500).json({errors: error});
    }

})
app.post('/login', (req, res) => {
  try{
  axios.post(userServiceProxy+"/login",req.body).then((response)=>{
    res.send(response.data)  })}
    catch(error){
    res.status(500).json({errors: error});
    }

})
app.put('/profile/:id', (req, res) => {
  try{
  axios.put(userServiceProxy+"/profile/"+req.params.id,req.body).then((response)=>{
    res.send(response.data)  })}
    catch(error){
    res.status(500).json({errors: error});
    }

})
app.get('/users', (req, res) => {
  axios.get(userServiceProxy+"/users").then((response)=>{
    res.send(response.data)
  })
})
app.get('/user/:id', (req, res) => {
  try{
  axios.get(userServiceProxy+"/user/"+req.params.id).then((response)=>{
    res.send(response.data)  })}
    catch(error){
    res.status(500).json({errors: error});
    }

})
app.delete('/delete/:id', (req, res) => {
  try{
  axios.delete(userServiceProxy+"/delete/"+req.params.id).then((response)=>{
    res.send(response.data)  })}
    catch(error){
    res.status(500).json({errors: error});
    }

})
app.get('/preferences', (req, res) => {
  try{
  axios.get(userServiceProxy+"/preferences/").then((response)=>{
    res.send(response.data)  })}
    catch(error){
    res.status(500).json({errors: error});
    }

})

const PORT = process.env.PORT || 5005;

app.listen(PORT, err =>
  err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);