const express = require('express');
const workoutroutes=require('./routes/workouts')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const userroutes = require('./routes/users')
//express app
const app=express();

app.use(cors(
    {
        origin: '*'
    }
));
//connecting databse and listening to port
mongoose.connect(process.env.dbURI)
    .then((res) =>{
    app.listen(process.env.PORT, () =>{
        console.log(`listing on port ${process.env.PORT}`)
        console.log("Conncected to MongoDB");
    });
}).catch((err) =>{
    console.log(err);
})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) =>{
    console.log(req.path, req.method);
    next();
})


//routes
app.use('/api/workouts', workoutroutes);
app.use('/api/user' ,userroutes)

