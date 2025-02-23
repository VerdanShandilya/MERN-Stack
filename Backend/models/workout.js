const mongoose = require('mongoose');
const Schema=mongoose.Schema

const WorkoutSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load:{
        type: Number,
        required: true
    }

}, {timestamps: true}) // adds a time stamp for when the new query will be added


const Workout = mongoose.model('Workout' , WorkoutSchema)
module.exports = Workout;