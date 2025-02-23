const express=require('express');
const  {createWorkout, getworkouts, getsingleworkout, deleteworkout, updateworkout} = require('../controllers/workoutController')
const router = express.Router()


//get all workout
router.get('/', getworkouts)


//get a single workout
router.get('/:id', getsingleworkout)


//Post a new workout
router.post('/', createWorkout)


//delete a workout
router.delete('/:id' ,deleteworkout)

//edit a workout
router.patch('/:id', updateworkout)

module.exports = router