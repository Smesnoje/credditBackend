const express = require('express');
const mongoose = require('mongoose')
const { createNewUser } = require('./controllers/userController')

const app = express();

app.use(express.json())

app.get("/", (req,res,next)=>{
    res.send('milivoje naredjuje')
})

app.post("/signup", createNewUser)


const Main = async ()=>{
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.2oxxltl.mongodb.net/?retryWrites=true&w=majority')
}
Main().then(() => {
    app.listen(3001);
}).catch((err)=>{
    console.log(err);
})