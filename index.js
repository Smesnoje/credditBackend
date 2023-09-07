const express = require('express');

const App = express();

App.use(express.json())


App.get("/", (req,res,next)=>{
    res.send('asd')
})



App.listen(3001);