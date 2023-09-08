const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const threadRoutes = require('./routes/threadRoutes')

const app = express();

app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/thread", threadRoutes)

const main = async ()=>{
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.2oxxltl.mongodb.net/?retryWrites=true&w=majority')
}
main().then(() => {
    app.listen(3001, () => {
        console.log("Listening on port 3001")
    });
}).catch((err)=>{
    console.log(err);
})