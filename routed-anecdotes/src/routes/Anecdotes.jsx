/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
const Anecdotes = ({ list }) => {
  
    
    return ( 
        <div className='containerList'>
        <h4>Anecdotes</h4>
        <ul className='list-group ulAnecdotes'>
          { list.map(anecdote => {
            return <li key={anecdote.id} className='list-group-item list-group-item-primary' id='colorList'>
                <Link className='links' to={`/anecdotes/${anecdote.id}`}>
                    {anecdote.title}
                </Link>
            </li>
            })
          }
        </ul>
      </div>
    )
}

export default Anecdotes