import React from 'react'
import { useState } from 'react'


const WorkoutDetails = ({workout,settrigger}) => {

  const deleteworkout = async () =>{
    // delete workout from database
    const id=workout._id;
    try {
      const response = await fetch(`http://localhost:3000/api/workouts/${id}`, {
        method: 'DELETE'
      });

      const json = await response.json();

      if (response.ok) {
        console.log('Workout deleted:', json);
        // Toggle trigger to refresh workout list
        settrigger(prev => !prev);
      } else {
        console.log('Error deleting workout:', json);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load:</strong> {workout.load}</p>
        <p><strong>reps:</strong> {workout.reps}</p>
        <button onClick={deleteworkout}>X</button>
    </div>
  )
}

export default WorkoutDetails
