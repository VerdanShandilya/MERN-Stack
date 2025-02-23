import React from 'react'
import { useEffect, useState } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import Form from '../components/Form'
import ReactPaginate from 'react-paginate'

const Home = () => {
  const [workouts,setworkouts] = useState([]);
  const [trigger,settrigger] = useState(false);
  const [pagenumber, setPagenumber] = useState(0);

  useEffect(() =>{
    const fetchworkouts = async () =>{
      const response = await fetch('http://localhost:3000/api/workouts')
      const json = await response.json()

      if(response.ok){
        setworkouts(json);
        console.log(json);
      }
    } 
    fetchworkouts();
  },[trigger])

  const workoutperpage = 3;
  const pagecount=workouts && Math.ceil(workouts.length/workoutperpage);
  const workoutvisited = pagenumber * workoutperpage;

  const changePage = ({selected}) =>{
    setPagenumber(selected);
  }

  return (
    <div className='home'>
      <div className='form'>
        <Form settrigger={settrigger}/>
      </div>
      <div className='workouts'>
      {workouts && workouts.slice(pagenumber, workoutvisited+workoutperpage)
      .map((workout) =>(
        <WorkoutDetails key={workout._id} workout={workout} settrigger={settrigger} />
      ))}
      </div>
      {workouts && (
        <ReactPaginate
        previouslabel={'previous'}
        nextLabel={'Next'}
        pageCount={pagecount}
        onPageChange={changePage}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
        />

      )}
    </div>
  )
}

export default Home