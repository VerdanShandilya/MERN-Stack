import React, { useState } from 'react'

const Form = ({settrigger}) => {
    const [workoutname, setworkoutname] = useState("");
    const [workoutreps, setworkoutreps] = useState(0);
    const [workoutload, setworkoutload] = useState(0);
    const [error, seterror] = useState("");
    const [emptyfields, setemptyfields] = useState([]);

    const submit = async (e) => {
        e.preventDefault();
        const response = {title: workoutname, reps: workoutreps, load: workoutload};
        
        try {
            const data = await fetch('http://localhost:3000/api/workouts', {
                method: 'POST',
                body: JSON.stringify(response),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // console.log(data);
            const json = await data.json();
            // console.log(json);

            if (!data.ok) {
                seterror(json.error);
                console.log(json);
                setemptyfields(json.emptyfields || []);
            }
            
            if (data.ok) {
                console.log(json);
                setworkoutname("");
                setworkoutload(0);
                setworkoutreps(0);
                seterror("");
                setemptyfields([]);
                settrigger(prev => !prev);
            }
        } catch (err) {
            seterror('Failed to create workout');
        }
    }

    return (
        <form className='create' onSubmit={submit}>
            <h3>Add a New Workout</h3>
            
            <label>Workout Title: </label>
            <input 
                type='text'
                onChange={(e) => setworkoutname(e.target.value)}
                value={workoutname}
                className={emptyfields.includes('title') ? 'error' : ''}
            />
            
            <label>Workout reps: </label>
            <input 
                type="number"
                onChange={(e) => setworkoutreps(e.target.value)}
                value={workoutreps}
                className={emptyfields.includes('reps') ? 'error' : ''}
            />
            
            <label>Workout Load: </label>
            <input 
                type='number'
                onChange={(e) => setworkoutload(e.target.value)}
                value={workoutload}
                className={emptyfields.includes('load') ? 'error' : ''}
            />
            
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Form