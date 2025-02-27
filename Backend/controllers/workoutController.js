const Workout =require('../models/workout')
const mongoose = require('mongoose')
//get all workouts
const getworkouts = async (req,res) =>{
    try{
        const workouts = await Workout.find({}).sort({createdAt : -1})
        res.status(201).json(result);
    }
    catch(err) {
        res.status(400).json(err);
    }
}


// get a single workout
const getsingleworkout = async (req,res) =>{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.json({error: "no such id"});
    }
    try{
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({error: "error in getting workout"});
    }
}


//create new workout
const createWorkout = async (req,res) =>{
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
    try{
        const workout = await Workout.create({title: title, reps: reps, load: load})
        res.status(201).json(workout);
    }
    catch(err){
        res.status(401).json({msg: "error creating workout"})
    }
}


//delete a workout
const deleteworkout = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }
    try {
        const workout = await Workout.findByIdAndDelete(id); 
        if(!workout){
            return res.status(404).json({error: "No such workout"});
        }   
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({error: "Error deleting workout"});
    }
}


//update a query
const  updateworkout = async (req,res) =>{
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.json({eror : "No such workout"});
    }
    try{
        const workout= await Workout.findByIdAndUpdate(id, req.body, { new: true })
        if(!workout){
            return res.status(404).json({error: "No such workout"});
        }
        res.status(200).json(workout);
    }
    catch(err){
        res.status(401).json({error: "Error updating workout"});
    }
}


module.exports = {createWorkout, getworkouts, getsingleworkout, deleteworkout, updateworkout}