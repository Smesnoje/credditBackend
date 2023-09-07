const express = require('express');
const mongoose = require('mongoose')
const { createNewUser } = require('./controllers/userController')

const App = express();

App.use(express.json())

App.get("/", (req,res,next)=>{
    res.send('milivoje naredjuje')
})

App.post("/signup", createNewUser)

App.listen(3001);

const Main = async ()=>{
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.2oxxltl.mongodb.net/?retryWrites=true&w=majority')
}
Main().catch((err)=>{
    console.log(err);
})

