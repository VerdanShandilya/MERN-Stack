import { Link } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <div className="container">
            <Link t0='/'>
                <h1>Workout Buddy</h1>
            </Link>
        </div>
    </nav>
  )
}


export default Navbar