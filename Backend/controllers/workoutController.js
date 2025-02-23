const Workout =require('../models/workout')
const mongoose = require('mongoose')
//get all workouts
const getworkouts = (req,res) =>{
    const workouts = Workout.find({}).sort({createdAt : -1})
    .then((result) =>{
        res.json(result);
    })
    .catch((err) =>{
        console.log("err");
    })
}


// get a single workout
const getsingleworkout = (req,res) =>{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.json({error: "no such id"});
    }
    const workout = Workout.findById(id)
    .then((result) =>{
        res.json(result)
    })
    .catch((err) =>{
        console.log("error");
    })
}


//create new workout
const createWorkout = (req,res) =>{
    const {title,reps,load} = req.body;
    let emptyfields=[];
    if (!title) {
        emptyfields.push('title');
    }
    if (!reps) {
        emptyfields.push('reps');
    }
    if (!load) {
        emptyfields.push('load');
    }
    if (emptyfields.length > 0) {
        return res.status(400).json({
            error: 'Please fill in all fields',
            emptyfields
        });
    }
    const workout = new Workout({
        title: title,
        reps:reps,
        load:load
    });
    workout.save()
    .then((result) =>{
        res.status(200).json(result)
    })
    .catch((err) =>{
        res.json({msg: "error creating workout"})
    })
}


//delete a workout
const deleteworkout = (req,res) =>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.json({eror : "No such workout"});
    }
    Workout.findByIdAndDelete(id)
    .then((result) =>{
        res.json(result);
    })
    .catch((err) =>{
        console.log("error");
    })
}


//update a query
const  updateworkout = (req,res) =>{
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.json({eror : "No such workout"});
    }
    Workout.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) =>{
        res.json(result);
    })
    .catch((err) =>{
        console.log("error");
    })
}


module.exports = {createWorkout, getworkouts, getsingleworkout, deleteworkout, updateworkout}